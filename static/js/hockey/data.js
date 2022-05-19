class FieldData {
  constructor(time, ball, Paddle1, Paddle2, size) {
    this.time = time;
    this.ball = ball;
    this.Paddle1 = Paddle1;
    this.Paddle2 = Paddle2;
    this.size = size;
  }
}

class Point2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class BallData {
  constructor(position, velocity, radius) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
  }
}

class InputData {
  constructor(time, left, right, side) {
    this.time = time;
    this.key = {
      left: left,
      right: right,
    };
    this.side = side;
  }
}

class PaddleData {
  constructor(position, size) {
    this.position = position;
    this.size = size;
  }
}
