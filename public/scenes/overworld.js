import { keyboard } from "../keyboard.js";
import { state } from "../main.js";
import { room } from "../room.js";

export function render() {
  // Total enemy count for room:
  const totalEnemies = state.rooms[state.current].tiles
    .flat()
    .filter((tile) => tile.enemy).length;
  return `
     <h1>${state.rooms[state.current].name}</h1>
     <div style="display: flex"> 
         ${state.rooms[state.current].tiles
           .map((row, h) => {
             return `
               <div>
                     ${row
                       .map((tile, w) => {
                         const c =
                           state.position[0] === w && state.position[1] === h
                             ? "blue"
                             : tile.exit
                             ? "#000"
                             : tile.enemy
                             ? "red"
                             : "#ccc";
                         const styles = `background: ${c}; width: 60px; height: 60px`;
                         return `
                         <div style="${styles}"></div>
                     `;
                       })
                       .join("")}
               </div>
             `;
           })
           .join("")}
     </div>
     <p>Floor ${state.current + 1}: ${totalEnemies} enemies left</p>
     <p>Health: ${state.player.health}</p>
  `;
}

export function setup(render) {
  const renderWithCleanup = (s) => {
    cleanup();
    render(s);
  };

  const cleanup = keyboard({
    up: () => {
      if (state.position[0] === 0) {
        return;
      }
      state.position[0]--;
      getScene(renderWithCleanup);
    },
    down: () => {
      if (
        state.position[0] ===
        state.rooms[state.current].tiles[0].length - 1
      ) {
        return;
      }
      state.position[0]++;
      getScene(renderWithCleanup);
    },
    left: () => {
      if (state.position[1] === 0) {
        return;
      }
      state.position[1]--;
      getScene(renderWithCleanup);
    },
    right: () => {
      if (state.position[1] === state.rooms[state.current].tiles.length - 1) {
        return;
      }
      state.position[1]++;
      getScene(renderWithCleanup);
    },
  });
}

function getScene(render) {
  const currentTile =
    state.rooms[state.current].tiles[state.position[1]][state.position[0]];

  // If player on enemy tile, scene combat
  if (currentTile.enemy) {
    return render("combat");
  }

  // If player is on exit and no enemies left, scene next room
  if (
    currentTile.exit &&
    state.rooms[state.current].tiles.flat().filter((tile) => tile.enemy)
      .length === 0
  ) {
    state.rooms.push(room());
    state.current++;
    state.position = [0, 0];
    return render();
  }

  return render();
}
