package battle

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
	Ball       Ball
	Paddle_one Paddle
	Paddle_two Paddle
	Size       Point2D
	Point      Point
}

func NewField(size Point2D, paddleSize Point2D, ballSize float64) Field {
	return Field{
		Time:       0,
		Ball:       NewBall(NewPoint2D(size.X/2, size.Y/2), NewPoint2D(4, 4), ballSize),
		Paddle_one: NewPaddle(NewPoint2D(size.X/2, 30), paddleSize),
		Paddle_two: NewPaddle(NewPoint2D(size.X/2, size.Y-30), paddleSize),
		Size:       size,
		Point:      Point{One: 0, Two: 0},
	}
}

func (f *Field) Update(input1 Input, input2 Input) {
	f.Paddle_one.Move(input1, f.Size, 5.0)
	f.Paddle_two.Move(input2, f.Size, 5.0)
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
