import { state } from "../main.js";

const currentEnemy = () =>
  state.rooms[state.current].tiles[state.position[1]][state.position[0]].enemy;

export function render() {
  const enemy = currentEnemy();
  if (!enemy) throw new Error("No enemy found");
  return `
     <h1>Fight (${state.rooms[state.current].name})</h1>
     <p>Floor ${state.current + 1}</p>
     <p>Turn: ${turns + 1}</p>
     <p>Health: ${state.player.health}</p>

     <br />

     <h2>${enemy.name}</h2>
     <p>Health: ${enemy.health}</p>

     <br />

     <p>What do you do?</p>
     <div>
       <button id="attack">Attack</button>
       <button id="defend">Defend</button>
     </div>
  `;
}

export function setup(render) {
  document.getElementById("attack").addEventListener("click", () => {
    turn(render, "attack");
  });

  document.getElementById("defend").addEventListener("click", () => {
    turn(render, "defend");
  });
}

let turns = 0;
function turn(render, action) {
  turns++;
  const enemy = currentEnemy();

  const speedDiff = state.player.speed - enemy.speed;

  const luckChance = state.player.luck / 100;
  const enemyLuckChance = enemy.luck / 100;

  const critChance = Math.random() < luckChance + speedDiff / 100;
  const enemyCritChance = Math.random() < enemyLuckChance - speedDiff / 100;
  const critMultiplier = critChance ? 2 : 1;
  const enemyCritMultiplier = enemyCritChance ? 2 : 1;

  const attack = state.player.attack * critMultiplier + (turns - 1);
  const enemyAttack = enemy.attack * enemyCritMultiplier;
  const damage = attack - (enemy.defense - turns);
  const enemyDamage = enemyAttack - state.player.defense + turns;
  const naturalDefense = turns + Math.floor(turns / 5) * 2;
  const naturalDefenseDamage = enemyDamage - naturalDefense;

  if (action === "attack") {
    enemy.health -= damage * critMultiplier;
    state.player.health -= Math.max(0, enemyDamage);
  }

  if (action === "defend") {
    if (naturalDefenseDamage > 0) {
      state.player.health -= naturalDefenseDamage;
    }
  }

  //  - If defending, take into account defence
  //      - If defence is greater than attack, take no damage
  //    - As turns go on this will always use natural defence

  // Handle loosing
  if (state.player.health <= 0) {
    state.player.health = 0;
    turns = 0;
    render("menu");
  }

  // Handle winning
  if (enemy.health <= 0) {
    enemy.health = 0;
    state.rooms[state.current].tiles[state.position[1]][
      state.position[0]
    ].enemy = null;
    turns = 0;
    render("overworld");
  }

  render();
}
