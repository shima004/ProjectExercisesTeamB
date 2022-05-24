package Field

import (
	"bytes"
	"encoding/json"
)

type Point struct {
	One int
	Two int
}

type Field struct {
	Time       int64
	TimeLimit  int64
	FPS        int64
	Ball       Ball
	Paddle_one Paddle
	Paddle_two Paddle
	Size       Point2D
	Point      Point
}

func NewField(timeLimit int64, FPS int64, size Point2D, paddleSize Point2D, paddleVelocity Point2D, ballSize float64, ballVelocity Point2D) Field {
	return Field{
		Time:       0,
		TimeLimit:  timeLimit,
		FPS:        FPS,
		Ball:       NewBall(NewPoint2D(size.X/2, size.Y/2), ballVelocity, ballSize),
		Paddle_one: NewPaddle(NewPoint2D(size.X/2, 30), paddleSize, paddleVelocity),
		Paddle_two: NewPaddle(NewPoint2D(size.X/2, size.Y-30), paddleSize, paddleVelocity),
		Size:       size,
		Point:      Point{One: 0, Two: 0},
	}
}

func (f *Field) Update(input1 Input, input2 Input) {
	f.Paddle_one.Move(input1, f.Size)
	f.Paddle_two.Move(input2, f.Size)
	point := f.Ball.Move(f.Size, f.Paddle_one, f.Paddle_two)
	if point == 1 {
		f.Point.One += 1
	} else if point == 2 {
		f.Point.Two += 1
	}
	f.Time++
}

func (f *Field) String() string {
	b, _ := json.Marshal(f)
	var buf bytes.Buffer
	json.Indent(&buf, b, "", "  ")
	return buf.String()
}
