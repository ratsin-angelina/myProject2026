const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// центр координат
const originX = canvas.width / 2;
const originY = canvas.height / 2;

// масштаб
const scale = 5;

function drawAxes() {
  ctx.strokeStyle = "#ccc";

  // сітка
  for (let i = 0; i < canvas.width; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }

  for (let i = 0; i < canvas.height; i += 20) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }

  // осі
  ctx.strokeStyle = "black";

  ctx.beginPath();
  ctx.moveTo(0, originY);
  ctx.lineTo(canvas.width, originY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(originX, 0);
  ctx.lineTo(originX, canvas.height);
  ctx.stroke();
}

function draw() {
  const x0 = parseFloat(document.getElementById("x0").value);
  const y0 = parseFloat(document.getElementById("y0").value);
  const angle = parseFloat(document.getElementById("angle").value) * Math.PI / 180;
  const v0 = parseFloat(document.getElementById("v0").value);
  const a = parseFloat(document.getElementById("a").value);
  const color = document.getElementById("color").value;

  ctx.strokeStyle = color;
  ctx.beginPath();

  let first = true;

  for (let t = 0; t <= 10; t += 0.1) {
    let x = x0 + v0 * Math.cos(angle) * t;
    let y = y0 + v0 * Math.sin(angle) * t + (a * t * t) / 2;

    let canvasX = originX + x * scale;
    let canvasY = originY - y * scale;

    if (first) {
      ctx.moveTo(canvasX, canvasY);
      first = false;
    } else {
      ctx.lineTo(canvasX, canvasY);
    }
  }

  ctx.stroke();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxes();
}

drawAxes();