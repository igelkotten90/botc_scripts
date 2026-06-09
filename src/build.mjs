#!/usr/bin/env node
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { spawnSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  CHARACTERS,
  SCRIPT_META,
  TEAM_ORDER,
  TEAM_LABELS,
} from "./characters.mjs";
import {
  FIRST_NIGHT_ORDER,
  OTHER_NIGHT_ORDER,
  NIGHT_LABELS,
  NIGHT_PHASES,
  resolveNightData,
} from "./night-order.mjs";
import {
  officialIconUrl,
  officialIconLocalPath,
  officialIconJsonPair,
  customIconPath,
  customIconFlipPath,
  customIconJsonPairRaw,
  isGoodTeam,
} from "./icons.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function ensureOfficialIcons() {
  const marker = join(ROOT, "assets/icons/official/virgin_g.png");
  if (existsSync(marker)) return;
  spawnSync("python3", [join(__dirname, "fetch-official-icons.py")], {
    stdio: "inherit",
  });
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function iconSrc(char) {
  if (char.custom) return customIconPath(char.id, char.team);
  const id = char.officialId ?? char.id;
  const local = join(
    ROOT,
    "assets/icons/official",
    `${id}_${isGoodTeam(char.team) ? "g" : "e"}.png`
  );
  if (existsSync(local)) return officialIconLocalPath(id, char.team);
  return officialIconUrl(id, char.team);
}

function iconPairForJson(char) {
  if (char.custom) {
    return customIconJsonPairRaw(char);
  }
  const id = char.officialId ?? char.id;
  const gLocal = join(ROOT, "assets/icons/official", `${id}_g.png`);
  if (existsSync(gLocal)) {
    return officialIconJsonPair(id, char.team);
  }
  const g = officialIconUrl(id, "townsfolk");
  const e = officialIconUrl(id, "minion");
  return isGoodTeam(char.team) ? [g, e] : [e, g];
}

function formatReminder(text) {
  if (!text) return "";
  return escapeHtml(text.replace(/:reminder:/g, "⏺"));
}

function charById(id) {
  return CHARACTERS.find((c) => c.id === id || c.officialId === id);
}

function buildScriptJson() {
  const entries = [
    {
      ...SCRIPT_META,
      firstNight: FIRST_NIGHT_ORDER,
      otherNight: OTHER_NIGHT_ORDER,
    },
  ];

  for (const char of CHARACTERS) {
    if (char.custom) {
      const night = resolveNightData(char);
      entries.push({
        id: char.id,
        name: char.name,
        team: char.team,
        edition: "custom",
        image: iconPairForJson(char),
        ability: char.ability,
        setup: char.setup ?? false,
        firstNight: night.firstNight,
        otherNight: night.otherNight,
        firstNightReminder: night.firstNightReminder,
        otherNightReminder: night.otherNightReminder,
        reminders: [],
        remindersGlobal: [],
      });
    } else {
      entries.push(char.officialId ?? char.id);
    }
  }

  mkdirSync(join(ROOT, "data"), { recursive: true });
  writeFileSync(
    join(ROOT, "data/script.json"),
    JSON.stringify(entries, null, 2)
  );
}

function renderCharacterRow(char) {
  const src = iconSrc(char);
  return `<div class="item">
  <img class="icon" src="${src}" alt="" width="72" height="72" loading="lazy" />
  <div class="name-and-summary">
    <p class="character-name">${escapeHtml(char.name)}</p>
    <p class="character-summary">${escapeHtml(char.ability)}</p>
  </div>
</div>`;
}

function renderNightItem(entry, phase, wakeIndex) {
  if (NIGHT_PHASES[entry]) {
    const phaseData = NIGHT_PHASES[entry];
    const reminder =
      phase === "first"
        ? phaseData.firstNightReminder
        : phaseData.otherNightReminder;
    return `<div class="item special">
  <div class="night-body">
    <p class="night-sheet-char-name">${escapeHtml(phaseData.label)}</p>
    ${reminder ? `<p class="night-sheet-reminder">${formatReminder(reminder)}</p>` : ""}
  </div>
</div>`;
  }

  const char = charById(entry);
  if (!char) return "";

  const night = resolveNightData(char);
  const reminder =
    phase === "first" ? night.firstNightReminder : night.otherNightReminder;

  const src = iconSrc(char);
  return `<div class="item">
  <img class="icon" src="${src}" alt="" width="48" height="48" />
  <div class="night-body">
    <p class="night-sheet-char-name">${escapeHtml(char.name)}</p>
    ${reminder ? `<p class="night-sheet-reminder">${formatReminder(reminder)}</p>` : ""}
  </div>
</div>`;
}

function renderNightPage(title, order, phase) {
  let wakeIndex = 0;
  const items = order
    .map((entry) => {
      const isSpecial = Boolean(NIGHT_PHASES[entry]);
      const item = renderNightItem(
        entry,
        phase,
        isSpecial ? null : ++wakeIndex
      );
      return item;
    })
    .filter(Boolean)
    .join("\n");

  const listClass = phase === "first" ? "first-night" : "other-night";
  return `<section class="night-sheet">
  <h3><span>${escapeHtml(title)}</span></h3>
  <div class="${listClass}">${items}</div>
</section>`;
}

function buildHtml() {
  const sections = TEAM_ORDER.map((team) => {
    const chars = CHARACTERS.filter((c) => c.team === team);
    const rows = chars.map(renderCharacterRow).join("\n");
    const nrows = Math.ceil(chars.length / 2);
    return `<section class="team-section">
<h3><span>${TEAM_LABELS[team]}</span></h3>
<div class="${team}" style="--nitems: ${chars.length}; --nrows: ${nrows}">${rows}</div>
</section>`;
  }).join("\n");

  const authorHtml = SCRIPT_META.author
    ? `<span class="author">${escapeHtml(SCRIPT_META.author)}</span>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(SCRIPT_META.name)} — Blood on the Clocktower Script</title>
  <link rel="stylesheet" href="styles/print.css" />
</head>
<body>
  <div class="noprint">
    <strong>${escapeHtml(SCRIPT_META.name)}</strong>
    <button type="button" onclick="window.print()">Print / Save PDF</button>
    <span>A4 · no margins · backgrounds on</span>
  </div>

  <div id="script">
    <div class="character-sheet">
      <div class="character-sheet-content">
        <div id="title-container">
          <h1>${escapeHtml(SCRIPT_META.name)}${authorHtml ? ` ${authorHtml}` : ""}</h1>
        </div>
        <div class="script-teams">
          ${sections}
        </div>
      </div>
      <div id="footer">
        <div class="print-footer">
          <div class="copyright">© Steven Medway, bloodontheclocktower.com</div>
          <div class="page-one">* Not the first night</div>
        </div>
        <p class="ccc">Unofficial fan content. Community Created Content using materials from Blood on the Clocktower by Steven Medway and The Pandemonium Institute.</p>
      </div>
    </div>

    ${renderNightPage("First Night", FIRST_NIGHT_ORDER, "first")}
    ${renderNightPage("Other Nights", OTHER_NIGHT_ORDER, "other")}
  </div>
</body>
</html>`;

  writeFileSync(join(ROOT, "index.html"), html);
}

ensureOfficialIcons();
buildScriptJson();
buildHtml();
console.log("Built data/script.json and index.html");
