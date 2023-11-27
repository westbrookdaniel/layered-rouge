export function keyboard({ up, right, down, left }) {
  const keyMap = {
    ArrowUp: up,
    w: up,
    W: up,
    ArrowRight: right,
    d: right,
    D: right,
    ArrowDown: down,
    s: down,
    S: down,
    ArrowLeft: left,
    a: left,
    A: left,
  };

  const keyDown = (e) => {
    if (keyMap[e.key]) {
      throttle(keyMap[e.key]);
    }
  };

  window.addEventListener("keydown", keyDown);

  return () => {
    window.removeEventListener("keydown", keyDown);
  };
}

let lastTime = 0;
function throttle(fn) {
  const now = Date.now();
  if (now - lastTime > 100) {
    fn();
    lastTime = now;
  }
}
