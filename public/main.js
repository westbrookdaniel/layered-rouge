import { room } from "./room.js";

import * as menu from "./scenes/menu.js";
import * as overworld from "./scenes/overworld.js";
import * as combat from "./scenes/combat.js";

const app = document.getElementById("app");

export const state = {
  scene: "menu",

  player: {
    health: 500,
    maxHealth: 500,
    attack: 10,
    defense: 20,
    speed: 10,
    luck: 10,
  },

  current: 0,
  position: [0, 0],
  rooms: [room()],
};

export const defaultState = structuredClone(state);

function render(scene = state.scene) {
  state.scene = scene;
  const s = getScene(scene);
  app.innerHTML = s.render();
  s.setup(render);
}

const getScene = (scene) => {
  switch (scene) {
    case "overworld":
      return overworld;
    case "combat":
      return combat;
    case "menu":
      return menu;
  }
};

render();
