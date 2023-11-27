const names = [
  "Sewer",
  "Cave",
  "Tunnel",
  "Cavern",
  "Dungeon",
  "Catacomb",
  "Crypt",
  "Mine",
  "Tomb",
  "Burrow",
  "Lair",
  "Den",
  "Hive",
  "Nest",
];

export function room() {
  const w = Math.floor(Math.random() * 4) + 4;
  const h = Math.floor(Math.random() * 4) + 4;

  const tiles = Array.from({ length: w }, () =>
    Array.from({ length: h }, () => tile()),
  );

  // Add exit
  tiles[Math.floor(Math.random() * tiles.length)][tiles[0].length - 1] = {
    exit: true,
  };

  // Player always spawns top left so clear top 2x2 tiles
  tiles[0][0] = { enemy: null };
  tiles[0][1] = { enemy: null };
  tiles[1][0] = { enemy: null };
  tiles[1][1] = { enemy: null };

  return {
    name: names[Math.floor(Math.random() * names.length)],
    tiles,
  };
}

function tile() {
  return {
    enemy: Math.random() > 0.95 ? enemy() : null,
  };
}

const enemies = [
  // Weight, Name, Health, Attack, Defense, Speed, Luck
  [0.4, "Rat", 10, 5, 5, 5, 5],
  [0.5, "Goblin", 20, 10, 10, 10, 10],
  [0.6, "Orc", 30, 15, 15, 15, 15],
  [0.7, "Troll", 40, 20, 20, 20, 20],
  [0.75, "Ogre", 50, 25, 25, 25, 25],
  [0.85, "Giant", 60, 10, 30, 30, 30],
  [0.875, "Dragon", 40, 35, 35, 35, 35],
  [0.9, "Demon", 30, 30, 40, 40, 40],
  [0.95, "Devil", 50, 30, 45, 45, 45],
  [0, "God", 100, 10, 50, 50, 50],
];

function enemy() {
  // If number is smaller than weight then return enemy
  // If not, try next enemy, if none left pick last enemy
  const r = Math.random();
  let i = 0;
  while (r > enemies[i][0]) {
    if (i >= enemies.length - 1) {
      i = enemies.length - 1;
      break;
    }
    i++;
  }
  return {
    name: enemies[i][1],
    health: enemies[i][2],
    maxHealth: enemies[i][2],
    attack: enemies[i][3],
    defense: enemies[i][4],
    speed: enemies[i][5],
    luck: enemies[i][6],
  };
}
