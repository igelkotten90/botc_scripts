/** Official character icon CDN paths (release.botc.app) */
export const OFFICIAL_ICONS = {
  virgin: { edition: "tb", id: "virgin" },
  chef: { edition: "tb", id: "chef" },
  grandmother: { edition: "bmr", id: "grandmother" },
  flowergirl: { edition: "snv", id: "flowergirl" },
  cannibal: { edition: "carousel", id: "cannibal" },
  gossip: { edition: "bmr", id: "gossip" },
  drunk: { edition: "tb", id: "drunk" },
  klutz: { edition: "snv", id: "klutz" },
  scarletwoman: { edition: "tb", id: "scarletwoman" },
  godfather: { edition: "bmr", id: "godfather" },
  fanggu: { edition: "snv", id: "fanggu" },
  lleech: { edition: "carousel", id: "lleech" },
  ojo: { edition: "carousel", id: "ojo" },
  imp: { edition: "tb", id: "imp" },
};

export const CDN_BASE = "https://release.botc.app/resources/characters";

/** Good = Townsfolk & Outsiders (blue). Evil = Minions & Demons (red). */
export function isGoodTeam(team) {
  return team === "townsfolk" || team === "outsider";
}

/** CDN suffix: good teams use _g (blue), evil teams use _e (red). */
export function iconAlignmentForTeam(team) {
  return isGoodTeam(team) ? "g" : "e";
}

export function officialIconUrl(id, team) {
  const meta = OFFICIAL_ICONS[id];
  if (!meta) return null;
  const alignment = iconAlignmentForTeam(team);
  return `${CDN_BASE}/${meta.edition}/${meta.id}_${alignment}.webp`;
}

export function officialIconLocalPath(id, team) {
  const alignment = iconAlignmentForTeam(team);
  return `assets/icons/official/${id}_${alignment}.png`;
}

export function officialIconJsonPair(id, team) {
  const g = `assets/icons/official/${id}_g.png`;
  const e = `assets/icons/official/${id}_e.png`;
  return isGoodTeam(team) ? [g, e] : [e, g];
}

export function customIconPath(id, team) {
  const alignment = iconAlignmentForTeam(team);
  return `assets/icons/custom/${id}_${alignment}.png`;
}

export function customIconFlipPath(id, team) {
  const alignment = iconAlignmentForTeam(team);
  const flip = alignment === "g" ? "e" : "g";
  return `assets/icons/custom/${id}_${flip}.png`;
}
