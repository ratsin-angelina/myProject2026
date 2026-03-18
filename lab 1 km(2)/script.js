const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

// шкали
const xScale = d3.scaleLinear()
  .domain([-100, 100])
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([-100, 100])
  .range([height, 0]);

// осі
svg.append("g")
  .attr("transform", `translate(0, ${height / 2})`)
  .call(d3.axisBottom(xScale));

svg.append("g")
  .attr("transform", `translate(${width / 2}, 0)`)
  .call(d3.axisLeft(yScale));

// генератор лінії
const line = d3.line()
  .x(d => xScale(d.x))
  .y(d => yScale(d.y));

function generateData(x0, y0, angle, v0, a) {
  const data = [];

  for (let t = 0; t <= 10; t += 0.1) {
    const x = x0 + v0 * Math.cos(angle) * t;
    const y = y0 + v0 * Math.sin(angle) * t + (a * t * t) / 2;

    data.push({ x, y });
  }

  return data;
}

function draw() {
  const x0 = +document.getElementById("x0").value;
  const y0 = +document.getElementById("y0").value;
  const angle = +document.getElementById("angle").value * Math.PI / 180;
  const v0 = +document.getElementById("v0").value;
  const a = +document.getElementById("a").value;
  const color = document.getElementById("color").value;

  const data = generateData(x0, y0, angle, v0, a);

  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", 2)
    .attr("d", line);
}

function clearGraph() {
  svg.selectAll("path").remove();
}