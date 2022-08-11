export { createCanvas };

function createCanvas({ canvasWidth, canvasHeight }) {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return ctx;
}
