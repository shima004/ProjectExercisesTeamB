ws = new WebSocket("ws://localhost:8080/ws");

ws.onopen = function () {
  console.log("Connected");
};

ws.onmessage = function (evt) {
  console.log("onmessage" + evt.data);
  var data = JSON.parse(evt.data);
  if (data.Event == "update" || data.Event == "start") {
    var field = JSON.parse(data.Mes);
    console.log(field);
    bar1.x = field.Paddle_one.Position.X;
    bar1.y = field.Paddle_one.Position.Y;
    bar1.width = field.Paddle_one.Size.X;
    bar1.height = field.Paddle_one.Size.Y;
    bar2.x = field.Paddle_two.Position.X;
    bar2.y = field.Paddle_two.Position.Y;
    bar2.width = field.Paddle_two.Size.X;
    bar2.height = field.Paddle_two.Size.Y;
    ball.x = field.Ball.Position.X;
    ball.y = field.Ball.Position.Y;
    ball.radius = field.Ball.Radius;
    sendflag = true;
    document.getElementById("time").innerHTML = field.Time + "/ " + 60 * 60 * 1;
    document.getElementById("score").innerHTML = field.Point.One + " : " + field.Point.Two;
    calc_fps();
  }
  if (data.Event == "join") {
    var user = JSON.parse(data.Mes);
    console.log(user);
    var header = document.getElementById("nav-header");
    var vs = document.createElement("h5");
    vs.style.display = "inline-block";
    vs.innerHTML = "VS";
    header.appendChild(vs);
    var user_info = document.createElement("div");
    user_info.className = "navbar-brand info";
    user_info.style.display = "inline-block";
    user_info.innerHTML = user.Name;
    header.appendChild(user_info);
  } else if (data.Event == "win" || data.Event == "lose") {
    updateUserData();
    console.log(data.Event);
  }
};

const superInterval = (cb, interval = 1000, ...args) => {
  try {
    const code = `self.addEventListener('message', msg=>{setInterval(()=>self.postMessage(null), msg.data)})`;
    const w = new Worker(`data:text/javascript;base64,${btoa(code)}`);
    w.onmessage = () => cb(...args);
    w.postMessage(interval);
    return { stop: () => w.terminate() };
  } catch (_) {
    // 実装の問題またはCSPによる拒否などで Worker が使えなければ普通の setInterval を使う
    const id = setInterval(cb, interval, ...args);
    return { stop: () => clearInterval(id) };
  }
};

canvas = document.getElementById("canvas");
// const chart = new Chart(document.getElementById("chart"), {
//   type: "bar",
//   data: {
//     labels: [],
//     datasets: [
//       {
//         label: "FPS",
//         data: [],
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   },
// });
ctx = canvas.getContext("2d");
canvas_width = canvas.width;
canvas_height = canvas.height;
const Hockey = {
  bar_width: 100,
  bar_height: 10,
};
const FPS = 30;
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
    ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
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
    this.dx = Math.random();
    this.dy = Math.random();
  }
  draw() {
    // this.move();
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
  time = 0;
  sendflag = false;
  last = new Date();
  superInterval(draw, 1000 / FPS);
}

function calc_fps() {
  var now = new Date();
  var fps = 1000 / (now - last);
  last = now;
  document.getElementById("fps").innerHTML = fps.toFixed(0) + " fps";
  if (fps < FPS - 5) {
    document.getElementById("fps").style.color = "red";
  } else {
    document.getElementById("fps").style.color = "black";
  }
}

const Input = new InputData(Date.now(), false, false, 0);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bar1.draw();
  bar2.draw();
  ball.draw();
  console.log("draw");
  if (ws.readyState === WebSocket.OPEN) {
    if (sendflag) {
      ws.send(JSON.stringify(Input));
      sendflag = false;
    }
  }
}

function getKeyDown(event) {
  if (event.key === "ArrowLeft" || event.key === "a") {
    Input.key.left = true;
  } else {
    Input.key.right = true;
  }
}

function getKeyUp(event) {
  if (event.key === "ArrowLeft" || event.key === "a") {
    Input.key.left = false;
  } else {
    Input.key.right = false;
  }
}

init();
