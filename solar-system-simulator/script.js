const canvas = document.getElementById("solarSystemCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const planets = [
  { name: "Mercury", radius: 40, size: 4, speed: 0.04, angle: 0, color: "#bbb" },
  { name: "Venus", radius: 60, size: 6, speed: 0.03, angle: 0, color: "#e0c080" },
  { name: "Earth", radius: 90, size: 7, speed: 0.02, angle: 0, color: "#4d88ff" },
  { name: "Mars", radius: 120, size: 6, speed: 0.015, angle: 0, color: "#ff5c33" },
  { name: "Jupiter", radius: 160, size: 10, speed: 0.01, angle: 0, color: "#d2b48c" },
  { name: "Saturn", radius: 200, size: 9, speed: 0.008, angle: 0, color: "#f4e2b8" },
  { name: "Uranus", radius: 240, size: 8, speed: 0.006, angle: 0, color: "#aaf0e0" },
  { name: "Neptune", radius: 280, size: 8, speed: 0.005, angle: 0, color: "#4169e1" }
];

function drawSun() {
  ctx.beginPath();
  ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.fill();
}

function drawOrbit(radius) {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = "#333";
  ctx.stroke();
}

function drawPlanet(planet) {
  const x = centerX + planet.radius * Math.cos(planet.angle);
  const y = centerY + planet.radius * Math.sin(planet.angle);

  ctx.beginPath();
  ctx.arc(x, y, planet.size, 0, Math.PI * 2);
  ctx.fillStyle = planet.color;
  ctx.fill();

  planet.angle += planet.speed;
}

function updateLegend() {
  const legendList = document.getElementById("legendList");
  planets.forEach(planet => {
    const li = document.createElement("li");

    const colorBox = document.createElement("div");
    colorBox.className = "color-box";
    colorBox.style.backgroundColor = planet.color;

    const label = document.createTextNode(planet.name);

    li.appendChild(colorBox);
    li.appendChild(label);
    legendList.appendChild(li);
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSun();
  planets.forEach(planet => {
    drawOrbit(planet.radius);
    drawPlanet(planet);
  });
  requestAnimationFrame(animate);
}

updateLegend();
animate();
