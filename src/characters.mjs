/** Full character roster for The Wedding script */
export const SCRIPT_META = {
  id: "_meta",
  name: "The Wedding",
  author: "",
};

export const CHARACTERS = [
  {
    id: "emilybride",
    name: "Emily, The Bride",
    team: "townsfolk",
    ability:
      "Each night, choose a player. You learn if they are a Townsfolk. Either the Bride or the Groom is drunk while both are alive. [+1 Groom]",
    custom: true,
    setup: true,
    firstNight: 52,
    otherNight: 52,
    firstNightReminder:
      "The Bride chooses a player. Show the thumbs-up or thumbs-down. :reminder:",
    otherNightReminder:
      "The Bride chooses a player. Show the thumbs-up or thumbs-down. :reminder:",
  },
  {
    id: "oskargroom",
    name: "Oskar, The Groom",
    team: "townsfolk",
    ability:
      "Each night, choose 2 players. You learn if at least one of them is a Minion. Either the Groom or the Bride is drunk while both are alive. [+1 Bride]",
    custom: true,
    setup: true,
    firstNight: 53,
    otherNight: 53,
    firstNightReminder:
      "The Groom chooses 2 players. Show the thumbs-up or thumbs-down. :reminder:",
    otherNightReminder:
      "The Groom chooses 2 players. Show the thumbs-up or thumbs-down. :reminder:",
  },
  {
    id: "virgin",
    name: "Virgin",
    team: "townsfolk",
    ability:
      "The 1st time you are nominated, if the nominator is a Townsfolk, they are executed immediately.",
    officialId: "virgin",
  },
  {
    id: "priest",
    name: "Priest",
    team: "townsfolk",
    ability:
      "On the 3rd night, you learn 2 Demons, at least 1 of which is in play.",
    custom: true,
    firstNight: 0,
    otherNight: 48,
    otherNightReminder:
      "On the 3rd night only: show 2 Demon character tokens. :reminder:",
  },
  {
    id: "chef",
    name: "Chef",
    team: "townsfolk",
    ability: "You start knowing how many pairs of evil players there are.",
    officialId: "chef",
  },
  {
    id: "grandmother",
    name: "Grandmother",
    team: "townsfolk",
    ability:
      "You start knowing a good player & their character. If the Demon kills them, you die too.",
    officialId: "grandmother",
  },
  {
    id: "bestman",
    name: "Best Man",
    team: "townsfolk",
    ability:
      "Each night, choose 2 players: you learn if they are the same alignment. There is a good player who registers as evil to you.",
    custom: true,
    firstNight: 58,
    otherNight: 58,
    firstNightReminder:
      "The Best Man chooses 2 players. Show the thumbs-up or thumbs-down. :reminder:",
    otherNightReminder:
      "The Best Man chooses 2 players. Show the thumbs-up or thumbs-down. :reminder:",
  },
  {
    id: "maidofhonor",
    name: "Maid of Honor",
    team: "townsfolk",
    ability:
      "You start knowing an in-play Outsider (or that none are in play) and an in-play Minion (or that none are in play).",
    custom: true,
    firstNight: 38,
    otherNight: 0,
    firstNightReminder:
      "Show an Outsider character token, or show zero. Show a Minion character token, or show zero. :reminder:",
    otherNightReminder: "",
  },
  {
    id: "flowergirl",
    name: "Flowergirl",
    team: "townsfolk",
    ability: "Each night*, you learn if a Demon voted today.",
    officialId: "flowergirl",
  },
  {
    id: "photographer",
    name: "Photographer",
    team: "townsfolk",
    ability:
      "On day, publicly choose 5 players. That night, you learn how many were Outsiders.",
    custom: true,
    firstNight: 0,
    otherNight: 62,
    otherNightReminder:
      "If the Photographer chose 5 players today, show the number of Outsiders among them. :reminder:",
  },
  {
    id: "cannibal",
    name: "Cannibal",
    team: "townsfolk",
    ability:
      "You have the ability of the recently killed executee. If they are evil, you are poisoned until a good player dies by execution.",
    officialId: "cannibal",
  },
  {
    id: "toastmaster",
    name: "Toastmaster",
    team: "townsfolk",
    ability:
      "Once per game, publicly give a toast. Neither the Bride nor the Groom can die before tomorrow.",
    custom: true,
    firstNight: 0,
    otherNight: 0,
    firstNightReminder: "",
    otherNightReminder: "",
  },
  {
    id: "gossip",
    name: "Gossip",
    team: "townsfolk",
    ability:
      "Each day, you may make a public statement. Tonight, if it was true, a player dies.",
    officialId: "gossip",
  },
  {
    id: "drunk",
    name: "Drunk",
    team: "outsider",
    ability:
      "You do not know you are the Drunk. You think you are a Townsfolk character, but you are not.",
    officialId: "drunk",
  },
  {
    id: "weirduncle",
    name: "Weird Uncle",
    team: "outsider",
    ability:
      "1 of your Townsfolk neighbors is poisoned. If you are executed, one of your Townsfolk neighbors may die tonight.",
    custom: true,
    setup: true,
    firstNight: 0,
    otherNight: 65,
    firstNightReminder: "",
    otherNightReminder:
      "If the Weird Uncle was executed today, one of their Townsfolk neighbors may die. :reminder:",
  },
  {
    id: "weddingcrasher",
    name: "Wedding Crasher",
    team: "outsider",
    ability:
      "Each night, choose an alive player. If they are a Townsfolk, they are drunk until dusk.",
    custom: true,
    firstNight: 24,
    otherNight: 24,
    firstNightReminder:
      "The Wedding Crasher chooses a player. If they are a Townsfolk, they are drunk. :reminder:",
    otherNightReminder:
      "The Wedding Crasher chooses a player. If they are a Townsfolk, they are drunk. :reminder:",
  },
  {
    id: "klutz",
    name: "Klutz",
    team: "outsider",
    ability:
      "When you learn that you died, publicly choose 1 alive player: if they are evil, your team loses.",
    officialId: "klutz",
  },
  {
    id: "scarletwoman",
    name: "Scarlet Woman",
    team: "minion",
    ability:
      "If there are 5 or more players alive & the Demon dies, you become the Demon.",
    officialId: "scarletwoman",
  },
  {
    id: "maliciousorganist",
    name: "Malicious Organist",
    team: "minion",
    ability:
      "If an Outsider dies at night, you learn a Townsfolk character and player. [+1 Outsider]",
    custom: true,
    setup: true,
    firstNight: 0,
    otherNight: 72,
    otherNightReminder:
      "If an Outsider died tonight, show a Townsfolk character token and point to a player. :reminder:",
  },
  {
    id: "badcaterer",
    name: "Bad Caterer",
    team: "minion",
    ability:
      "Each night, choose a player: they are poisoned until dusk. A chosen Grandmother dies instead, and all players learn that a Bad Caterer is in play.",
    custom: true,
    firstNight: 17,
    otherNight: 17,
    firstNightReminder:
      "The Bad Caterer chooses a player. They are poisoned. :reminder:",
    otherNightReminder:
      "The Bad Caterer chooses a player. They are poisoned. If a Grandmother is chosen, they die instead and all learn a Bad Caterer is in play. :reminder:",
  },
  {
    id: "godfather",
    name: "Godfather",
    team: "minion",
    ability:
      "You start knowing which Outsiders are in play. If 1 died today, choose a player tonight: they die. [-1 or +1 Outsider]",
    officialId: "godfather",
  },
  {
    id: "fanggu",
    name: "Fang Gu",
    team: "demon",
    ability:
      "Each night*, choose a player: they die. The 1st Outsider this kills becomes an evil Fang Gu & you die instead. [+1 Outsider]",
    officialId: "fanggu",
  },
  {
    id: "lleech",
    name: "Lleech",
    team: "demon",
    ability:
      "Each night*, choose a player: they die. You start by choosing a player: they are poisoned. You die if & only if they are dead.",
    officialId: "lleech",
  },
  {
    id: "ojo",
    name: "Ojo",
    team: "demon",
    ability:
      "Each night*, choose a character: they die. If they are not in play, the Storyteller chooses who dies.",
    officialId: "ojo",
  },
  {
    id: "imp",
    name: "Imp",
    team: "demon",
    ability:
      "Each night*, choose a player: they die. If you kill yourself this way, a Minion becomes the Imp.",
    officialId: "imp",
  },
];

export const TEAM_ORDER = ["townsfolk", "outsider", "minion", "demon"];
export const TEAM_LABELS = {
  townsfolk: "Townsfolk",
  outsider: "Outsiders",
  minion: "Minions",
  demon: "Demons",
};
