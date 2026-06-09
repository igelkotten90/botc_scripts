# Agent handoff — The Wedding (Blood on the Clocktower)

This file captures project context so a new agent can continue work without re-reading the full conversation history.

## Project summary

**The Wedding** is a custom Blood on the Clocktower script (25 characters: 11 homebrew + 14 official). The repo generates:

1. **`index.html`** — printable character sheet + First Night + Other Nights ST sheets
2. **`data/script.json`** — BOTC Script Tool–compatible JSON

Design target: match the [official Script Tool](https://script.bloodontheclocktower.com/) print layout (IBM Plex fonts, section headers with rules, 2-column character grid on print, icon + name + ability rows).

**Repository:** https://github.com/igelkotten90/botc_scripts  
**Local path (author machine):** `~/Downloads/the-wedding-botc-script`

---

## Source of truth (edit these, then rebuild)

| File | What it controls |
|------|------------------|
| `src/characters.mjs` | All 25 characters: names, teams, abilities, custom vs official, night wake indices, ST reminder text |
| `src/night-order.mjs` | `FIRST_NIGHT_ORDER`, `OTHER_NIGHT_ORDER`, `NIGHT_LABELS`, official-character night defaults |
| `styles/print.css` | Screen + print layout (A4 character sheet sizing, typography, night sheet styling) |
| `src/build.mjs` | HTML + `script.json` generation logic |

**Do not edit `index.html` or `data/script.json` by hand** — they are generated.

`data/characters.csv` was removed intentionally. There is no CSV import step.

---

## Rebuild commands

```bash
cd ~/Downloads/the-wedding-botc-script   # or clone from GitHub

# After character / night / CSS changes:
node src/build.mjs

# After custom icon source art changes:
node src/generate-icons.mjs   # runs process-icons.py + fetch-official-icons.py
node src/build.mjs
```

**Dependencies:** Node.js (no npm packages), Python 3 + Pillow (`pip3 install Pillow`) for icon processing.

**Print preview:** Open `index.html` → Print / Save PDF. Settings: A4, no margins, backgrounds on, headers/footers off. Expected: 3 pages (character sheet, first night, other nights).

---

## Architecture

```
src/characters.mjs ──┐
src/night-order.mjs ─┼──► src/build.mjs ──► index.html
src/icons.mjs ───────┤                  └──► data/script.json
styles/print.css ────┘

assets/icons/custom/  ◄── src/process-icons.py (from source PNGs)
assets/icons/official/ ◄── src/fetch-official-icons.py (CDN cache, recolored)
```

### `src/build.mjs` behavior

- Imports character roster and night orders from `.mjs` modules
- Auto-fetches official icons on first build if cache missing (`assets/icons/official/virgin_g.png` marker)
- Renders character sheet in team sections (Townsfolk → Outsiders → Minions → Demons)
- **Night sheets:** every ID listed in `FIRST_NIGHT_ORDER` / `OTHER_NIGHT_ORDER` is rendered, even if wake index is 0 — the order arrays are the ST-facing source of truth
- `:reminder:` in reminder strings becomes ⏺ in HTML
- Title has **no author line** (`SCRIPT_META.author` is empty string)

### Custom vs official characters

- **Custom** (`custom: true`): full JSON entry in `script.json` with local icon paths, night data, reminders
- **Official** (`officialId: "..."`): referenced by ID string in `script.json`; night defaults in `OFFICIAL_NIGHT_DEFAULTS` in `night-order.mjs` unless overridden in `characters.mjs`

---

## Character roster (25)

### Townsfolk (13)
| ID | Name | Type |
|----|------|------|
| `emilybride` | Emily, The Bride | custom |
| `oskargroom` | Oskar, The Groom | custom — icon is a **top hat** (woodcut blue style) |
| `virgin` | Virgin | official |
| `priest` | Priest | custom |
| `chef` | Chef | official |
| `grandmother` | Grandmother | official |
| `bestman` | Best Man | custom |
| `maidofhonor` | Maid of Honor | custom — knows in-play Outsider **and** in-play Minion (or none) |
| `flowergirl` | Flowergirl | official |
| `photographer` | Photographer | custom |
| `cannibal` | Cannibal | official |
| `toastmaster` | Toastmaster | custom |
| `gossip` | Gossip | official |

### Outsiders (4)
| ID | Name | Type |
|----|------|------|
| `drunk` | Drunk | official |
| `weirduncle` | Weird Uncle | custom |
| `weddingcrasher` | Wedding Crasher | custom |
| `klutz` | Klutz | official |

### Minions (4)
| ID | Name | Type |
|----|------|------|
| `scarletwoman` | Scarlet Woman | official |
| `maliciousorganist` | Malicious Organist | custom |
| `badcaterer` | Bad Caterer | custom |
| `godfather` | Godfather | official |

### Demons (4)
| ID | Name | Type |
|----|------|------|
| `fanggu` | Fang Gu | official |
| `lleech` | Lleech | official (ID is `lleech`, display name **Lleech**) |
| `ojo` | Ojo | official |
| `imp` | Imp | official |

Full ability text and ST reminders: see `src/characters.mjs`.

---

## Night order (ST sheets)

These arrays in `src/night-order.mjs` define the printed order exactly.

### First Night
Dusk → Minion Info → Demon Info → Wedding Crasher → Lleech → Bad Caterer → Godfather → Maid of Honor → Chef → Emily, The Bride → Oskar, The Groom → Best Man → Grandmother → Dawn

### Other Nights
Dusk → Wedding Crasher → Bad Caterer → Scarlet Woman → Imp → Fang Gu → Ojo → Lleech → Godfather → Gossip → Weird Uncle → Grandmother → Malicious Organist → Priest → Emily, The Bride → Oskar, The Groom → Best Man → Flowergirl → Photographer → Dawn

Special labels (`dusk`, `dawn`, `minioninfo`, `demoninfo`) map via `NIGHT_LABELS`.

---

## Icons

### Color convention
- **Good** (Townsfolk + Outsiders): blue `_g` icons
- **Evil** (Minions + Demons): red `_e` icons
- Each custom role has both `_g` and `_e` PNG (flip variant for script.json)

### Custom icon symbols (homebrew)
| Character | Symbol |
|-----------|--------|
| Emily, The Bride | Bridal bouquet |
| Oskar, The Groom | Top hat |
| Priest | Lit candle |
| Best Man | Open ring box |
| Maid of Honor | Ribbon sash bow |
| Photographer | Vintage camera |
| Toastmaster | Champagne flute |
| Weird Uncle | Spilled wine glass |
| Wedding Crasher | Party hat |
| Malicious Organist | Organ pipes |
| Bad Caterer | Serving cloche with skull |

Style: woodcut/stamped illustration, transparent background, no circular token border.

### Icon pipeline gotcha
`src/process-icons.py` reads **source PNGs** from a hardcoded Cursor project path:
```
/Users/annika.dukek/.cursor/projects/.../assets/{char_id}_g.png
```
If that folder is missing, it falls back to existing files in `assets/icons/custom/`. **Consider fixing** this to use a repo-local `assets/icons/source/` directory for portability.

Regenerate flow: place/replace source `{id}_g.png` → `node src/generate-icons.mjs`.

Official icons are downloaded from `release.botc.app`, normalized, and cached in `assets/icons/official/`.

---

## Print layout decisions

- **No player-count setup table** on the character sheet (removed per user request)
- **No author name** on title
- Character sheet styled like official Script Tool (gray section headers with horizontal rules, `.item` rows)
- **Page 1:** character sheet must fit exactly one A4 page (`210mm × 297mm` box, flex layout with `justify-content: space-between` on team sections, 9.5px print root font, 2-column grid per team)
- **Footer on page 1:** copyright bottom-left, `* Not the first night` bottom-right (print only)
- **Pages 2–3:** First Night and Other Nights sheets (`page-break-before: always`)
- Screen view is a scroll preview; use print preview for accurate layout

Reference implementation studied: [GarethOates/botc-script-tool](https://github.com/GarethOates/botc-script-tool) `styles.scss`.

---

## Common tasks

### Change a character ability
1. Edit entry in `src/characters.mjs`
2. Update `firstNightReminder` / `otherNightReminder` if ST text should change
3. `node src/build.mjs`

### Change night sheet order
1. Edit `FIRST_NIGHT_ORDER` / `OTHER_NIGHT_ORDER` in `src/night-order.mjs` (use character `id` strings)
2. `node src/build.mjs`

### Add a new homebrew character
1. Add full entry to `CHARACTERS` in `src/characters.mjs`
2. Add source PNG, run icon pipeline, add to `TEAMS` in `process-icons.py`
3. Insert into night order arrays if needed
4. `node src/build.mjs`

### Push to GitHub
```bash
git add -A
git commit -m "Describe change"
git push
```
Remote: `git@github.com:igelkotten90/botc_scripts.git`, branch `main`.

---

## Intentionally excluded / open items

- No npm/package.json — plain Node + Python scripts only
- `assets/icons/reference/` contains download references; not used in build output
- Script Tool import may need hosted icon URLs for custom characters (see README)
- `process-icons.py` SOURCE path is machine-specific (see Icons section)
- Grandmother appears on Other Nights sheet per user order but has no other-night ST reminder (name-only row)

---

## Suggested skills for future agents

| Skill | When to use |
|-------|-------------|
| `handoff` | End of session — refresh this file if major context changed |
| `create-rule` | User wants persistent Cursor rules for this repo |
| `write-a-skill` | Add repo-specific build/print workflow skill |
| `split-to-prs` | If repo grows to multiple scripts and needs PR splitting |

---

## Conversation transcript

Full prior chat (design iterations, icon regeneration, layout tuning) is in the Cursor agent transcript if the user still has it. Search keywords: `The Wedding`, `character sheet`, `A4`, `oskargroom`, `maidofhonor`, `night-order`.
