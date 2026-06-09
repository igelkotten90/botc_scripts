/** Night order arrays for _meta and night sheet rendering */

export const FIRST_NIGHT_ORDER = [
  "dusk",
  "minioninfo",
  "demoninfo",
  "weddingcrasher",
  "lleech",
  "badcaterer",
  "godfather",
  "maidofhonor",
  "chef",
  "emilybride",
  "oskargroom",
  "bestman",
  "grandmother",
  "dawn",
];

export const OTHER_NIGHT_ORDER = [
  "dusk",
  "weddingcrasher",
  "badcaterer",
  "scarletwoman",
  "imp",
  "fanggu",
  "ojo",
  "lleech",
  "godfather",
  "gossip",
  "weirduncle",
  "grandmother",
  "maliciousorganist",
  "priest",
  "emilybride",
  "oskargroom",
  "bestman",
  "flowergirl",
  "photographer",
  "dawn",
];

export const NIGHT_PHASES = {
  dusk: {
    label: "Dusk",
    firstNightReminder:
      "Confirm all players have eyes closed. Wait approximately 10 seconds. Each Traveller with a first-night ability acts.",
    otherNightReminder:
      "Confirm all players have eyes closed. Wait approximately 10 seconds. Each Traveller acts.",
  },
  minioninfo: {
    label: "Minion Info",
    firstNightReminder:
      "If there are 7 or more players, wake all Minions: Show the THIS IS THE DEMON token. Point to the Demon. :reminder: Show the THESE ARE YOUR MINIONS token. Point to the other Minions. :reminder:",
    otherNightReminder: "",
  },
  demoninfo: {
    label: "Demon Info",
    firstNightReminder:
      "If there are 7 or more players, wake the Demon: Show the THESE ARE YOUR MINIONS token. Point to all Minions. :reminder: Show the THESE CHARACTERS ARE NOT IN PLAY token. Show 3 not-in-play good character tokens. :reminder:",
    otherNightReminder: "",
  },
  dawn: {
    label: "Dawn",
    firstNightReminder:
      "Wait approximately 10 seconds. Call for eyes open; immediately announce players who died.",
    otherNightReminder:
      "Wait approximately 10 seconds. Call for eyes open; immediately announce which players died, and which players are newly alive.",
  },
};

export const NIGHT_LABELS = Object.fromEntries(
  Object.entries(NIGHT_PHASES).map(([id, phase]) => [id, phase.label])
);

/** Default official night data for characters referenced by ID only */
export const OFFICIAL_NIGHT_DEFAULTS = {
  chef: {
    firstNight: 47,
    otherNight: 0,
    firstNightReminder: "Show the number of pairs of evil players. :reminder:",
    otherNightReminder: "",
  },
  grandmother: {
    firstNight: 39,
    otherNight: 0,
    firstNightReminder:
      "Show a good character token and point to a player. :reminder:",
    otherNightReminder: "",
  },
  virgin: {
    firstNight: 0,
    otherNight: 0,
    firstNightReminder: "",
    otherNightReminder: "",
  },
  flowergirl: {
    firstNight: 0,
    otherNight: 63,
    firstNightReminder: "",
    otherNightReminder:
      "Show the thumbs-up or thumbs-down for whether a Demon voted today. :reminder:",
  },
  cannibal: {
    firstNight: 0,
    otherNight: 0,
    firstNightReminder: "",
    otherNightReminder: "",
  },
  gossip: {
    firstNight: 0,
    otherNight: 64,
    firstNightReminder: "",
    otherNightReminder:
      "If the Gossip made a true public statement today, a player dies. :reminder:",
  },
  drunk: {
    firstNight: 0,
    otherNight: 0,
    firstNightReminder: "",
    otherNightReminder: "",
  },
  klutz: {
    firstNight: 0,
    otherNight: 0,
    firstNightReminder: "",
    otherNightReminder: "",
  },
  scarletwoman: {
    firstNight: 0,
    otherNight: 27,
    firstNightReminder: "",
    otherNightReminder:
      "If the Demon died tonight and 5+ players are alive, the Scarlet Woman becomes the Demon. :reminder:",
  },
  godfather: {
    firstNight: 11,
    otherNight: 14,
    firstNightReminder:
      "Show the Outsider character tokens in play. :reminder:",
    otherNightReminder:
      "If an Outsider died today, the Godfather chooses a player. That player dies. :reminder:",
  },
  fanggu: {
    firstNight: 0,
    otherNight: 30,
    firstNightReminder: "",
    otherNightReminder:
      "The Fang Gu chooses a player. :reminder: If they chose an Outsider (once only): replace the Outsider token with the spare Fang Gu token. The Fang Gu dies. Wake the target. Show the YOU ARE and Fang Gu tokens. :reminder:",
  },
  lleech: {
    firstNight: 9,
    otherNight: 31,
    firstNightReminder:
      "The Lleech chooses a player. They are poisoned. :reminder:",
    otherNightReminder:
      "The Lleech chooses a player. That player dies. :reminder:",
  },
  ojo: {
    firstNight: 0,
    otherNight: 32,
    firstNightReminder: "",
    otherNightReminder:
      "The Ojo chooses a character. That character dies, or the Storyteller chooses who dies. :reminder:",
  },
  imp: {
    firstNight: 0,
    otherNight: 33,
    firstNightReminder: "",
    otherNightReminder:
      "The Imp chooses a player. That player dies. :reminder:",
  },
};

export function resolveNightData(char) {
  if (char.firstNight !== undefined) {
    return {
      firstNight: char.firstNight,
      otherNight: char.otherNight ?? 0,
      firstNightReminder: char.firstNightReminder ?? "",
      otherNightReminder: char.otherNightReminder ?? "",
    };
  }
  const id = char.officialId ?? char.id;
  return OFFICIAL_NIGHT_DEFAULTS[id] ?? {
    firstNight: 0,
    otherNight: 0,
    firstNightReminder: "",
    otherNightReminder: "",
  };
}
