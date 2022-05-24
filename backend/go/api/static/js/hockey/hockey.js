ws = new WebSocket("ws://localhost:8080/ws");

ws.onopen = function () {
  console.log("Connected");
};

ws.onmessage = function (evt) {
  console.log("onmessage" + evt.data);
  var data = JSON.parse(evt.data);
  console.log(data.Event);
  if (data.Event == "start") {
    sendflag = true;
    last = new Date();
    var field = JSON.parse(data.Mes);
    battle_field.init(field);
    battle_field.draw();
    superInterval(send, 1000 / FPS);
  } else if (data.Event == "update") {
    var field = JSON.parse(data.Mes);
    console.log(field);
    battle_field.update(field);
    battle_field.draw();
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
ctx = canvas.getContext("2d");
const FPS = 30;
const Input = new InputData(Date.now(), false, false, 0);
document.addEventListener("keydown", getKeyDown);
document.addEventListener("keyup", getKeyUp);

class Field {
  constructor() {
    this.ball = null;
    this.bar1 = null;
    this.bar2 = null;
    this.time = 0;
  }
  init(field) {
    this.ball = new Ball(field.Ball.Position.X, field.Ball.Position.Y, field.Ball.Radius, "black");
    this.bar1 = new HockeyBar(
      field.Paddle_one.Position.X,
      field.Paddle_one.Position.Y,
      field.Paddle_one.Size.X,
      field.Paddle_one.Size.Y,
      "red"
    );
    this.bar2 = new HockeyBar(
      field.Paddle_two.Position.X,
      field.Paddle_two.Position.Y,
      field.Paddle_two.Size.X,
      field.Paddle_two.Size.Y,
      "blue"
    );
    this.time = field.Time;
  }
  update(field) {
    this.ball.update(field.Ball.Position.X, field.Ball.Position.Y, field.Ball.Radius);
    this.bar1.update(
      field.Paddle_one.Position.X,
      field.Paddle_one.Position.Y,
      field.Paddle_one.Size.X,
      field.Paddle_one.Size.Y
    );
    this.bar2.update(
      field.Paddle_two.Position.X,
      field.Paddle_two.Position.Y,
      field.Paddle_two.Size.X,
      field.Paddle_two.Size.Y
    );
    this.time = field.Time;
  }
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ball.draw();
    this.bar1.draw();
    this.bar2.draw();
  }
}

const battle_field = new Field();

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
  update(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
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
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  update(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
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

function send() {
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
