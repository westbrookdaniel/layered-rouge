import { defaultState, state } from "../main.js";

export function render() {
  return `
     <h1>Menu</h1>
     ${
       state.current > 0
         ? `<p>Congrats, you got to floor ${state.current + 1}!</p>`
         : ""
     }
     <button id="start">Start Game</button>
  `;
}

export function setup(render) {
  document.querySelector("#start").addEventListener("click", () => {
    Object.assign(state, structuredClone(defaultState));
    render("overworld");
  });
}
