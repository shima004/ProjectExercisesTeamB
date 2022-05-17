ws = new WebSocket("ws://localhost:8080/ws");

ws.onopen = function () {
  console.log("Connected");
};

ws.onmessage = function (evt) {
  console.log(evt);
};

// setInterval(function () {
//   ws.send("Hello, Server!");
// }, 1000);

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas_width = canvas.width;
canvas_height = canvas.height;
const Hockey = {
  bar_width: 100,
  bar_height: 10,
};
document.addEventListener("keydown", getKeyDown);
document.addEventListener("keyup", getKeyUp);

class HockeyBar {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.dx = 0;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  move(dx) {
    this.dx = dx;
    if (this.x + dx < 0) {
      this.x = 0;
    } else if (this.x + dx > canvas_width - this.width) {
      this.x = canvas_width - this.width;
    } else {
      this.x += dx;
    }
  }
}

class Ball {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = Math.random() * 5 - 1;
    this.dy = Math.random() * 5 - 1;
  }
  draw() {
    this.move();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  move() {
    if (this.x + this.dx < this.radius) {
      this.x = this.radius;
      this.dx = -this.dx;
    }
    if (this.x + this.dx > canvas_width - this.radius) {
      this.x = canvas_width - this.radius;
      this.dx = -this.dx;
    }
    if (this.y + this.dy < this.radius) {
      this.y = this.radius;
      this.dy = -this.dy;
    }
    if (this.y + this.dy > canvas_height - this.radius) {
      this.y = canvas_height - this.radius;
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  }
  coliision(bar) {
    if (
      this.x + this.radius > bar.x &&
      this.x - this.radius < bar.x + bar.width &&
      this.y + this.radius > bar.y &&
      this.y - this.radius < bar.y + bar.height
    ) {
      this.dy = -this.dy;
      this.dx += bar.dx;
    }
  }
}

function init() {
  console.log("init");
  bar1 = new HockeyBar(
    canvas_width / 2 - Hockey.bar_width / 2,
    Hockey.bar_height,
    Hockey.bar_width,
    Hockey.bar_height,
    "red"
  );
  bar2 = new HockeyBar(
    canvas_width / 2 - Hockey.bar_width / 2,
    canvas_height - Hockey.bar_height,
    Hockey.bar_width,
    Hockey.bar_height,
    "blue"
  );
  ball = new Ball(canvas_width / 2, canvas_height / 2, 10, "black");
  inputkey = "";
  setInterval(draw, 1000 / 60);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (inputkey === "ArrowLeft" || inputkey === "a") {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send("{key: 'left', x: " + bar1.x + "y: " + bar1.y + "}");
    }
    bar1.move(-5);
  } else if (inputkey === "ArrowRight" || inputkey === "d") {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send("{key: 'right', x: " + bar1.x + "y: " + bar1.y + "}");
    }
    bar1.move(5);
  }
  bar1.draw();
  bar2.draw();
  ball.coliision(bar1);
  ball.coliision(bar2);
  ball.draw();
}

function getKeyDown(event) {
  console.log("getKeyDown");
  console.log(event.key);
  inputkey = event.key;
}

function getKeyUp(event) {
  console.log("getKeyUp");
  console.log(event.key);
  inputkey = "";
}

init();
