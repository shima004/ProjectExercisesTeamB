uri = "";
if (document.location.protocol == "http:") {
  uri += "ws://";
} else {
  uri += "wss://";
}
uri += document.location.host;
uri += "/ws";

ws = new WebSocket(uri);

side = -1;

ws.onopen = function () {
  console.log("Connected");
};

ws.onmessage = async function (evt) {
  var data = JSON.parse(evt.data);
  console.log(data.Event);
  if (data.Event == "side") {
    console.log(data);
    var s = JSON.parse(data.Mes);
    side = s.Side;
    if (side == 0) {
      document.getElementById("container").style.backgroundColor = "blue";
    } else if (side == 1) {
      document.getElementById("container").style.backgroundColor = "red";
    }
  }
  if (data.Event == "start") {
    sendflag = true;
    last = new Date();
    var field = JSON.parse(data.Mes);
    battle_field.init(field);
    battle_field.draw();
    document.getElementById("info").style.display = "block";
    FPS = field.FPS;
    canvas.width = parseInt(field.Size.X);
    canvas.height = parseInt(field.Size.Y);
    superInterval(send, 1000 / FPS);
  } else if (data.Event == "update") {
    var field = JSON.parse(data.Mes);
    console.log(field);
    battle_field.update(field);
    battle_field.draw();
    sendflag = true;
    document.getElementById("time").innerHTML = field.Time + "/ " + field.TimeLimit;
    if (side == 0) {
      document.getElementById("score").innerHTML = "You: " + field.Point.One + " : Opponent" + field.Point.Two;
    } else {
      document.getElementById("score").innerHTML = "You: " + field.Point.Two + " : Opponent" + field.Point.One;
    }
    calc_fps();
  } else if (data.Event == "join") {
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
    var result = JSON.parse(data.Mes);
    var user = await getUser();
    document.getElementById("util-button").style.display = "block";
    if (user == undefined) {
      return;
    }
    if (data.Event == "win") {
      ctx.font = "148px Arial";
      var text = "WIN";
      var text_width = ctx.measureText(text).width;
      ctx.fillStyle = "red";
      ctx.fillText(text, canvas.width / 2 - text_width / 2, canvas.height / 2);
    } else {
      ctx.font = "148px Arial";
      var text = "LOSE";
      var text_width = ctx.measureText(text).width;
      ctx.fillStyle = "blue";
      ctx.fillText(text, canvas.width / 2 - text_width / 2, canvas.height / 2);
    }
    addCoinAnimation(user.name, user.coin, user.coin + parseInt(result.bet));
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
      field.Paddle_one.Size.Y,
      field.Paddle_one.Velocity.X
    );
    this.bar2.update(
      field.Paddle_two.Position.X,
      field.Paddle_two.Position.Y,
      field.Paddle_two.Size.X,
      field.Paddle_two.Size.Y,
      field.Paddle_two.Velocity.X
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
    if (this.dx != 0) {
      ctx.beginPath();
      if (this.dx > 0) {
        console.log("right");
        ctx.arrow(
          this.x + this.width / 2,
          this.y,
          this.x + this.width / 2 + this.dx * 3,
          this.y,
          [0, 3, -10, 3, -10, 5]
        );
      }
      if (this.dx < 0) {
        console.log("left");
        ctx.arrow(
          this.x - this.width / 2,
          this.y,
          this.x - this.width / 2 + this.dx * 3,
          this.y,
          [0, 3, -10, 3, -10, 5]
        );
      }
      ctx.fill();
    }
  }
  update(x, y, w, h, dx) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.dx = dx;
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
