package battle

type Field struct {
	Time       int64
	Ball       Ball
	Paddle_one Paddle
	Paddle_two Paddle
	Size       Point2D
}

func NewField(size Point2D, paddleSize Point2D, ballSize float64) Field {
	return Field{
		Time:       0,
		Ball:       NewBall(NewPoint2D(size.X/2, size.Y/2), NewPoint2D(0.5, 0.5), ballSize),
		Paddle_one: NewPaddle(NewPoint2D(20, size.Y/2), paddleSize),
		Paddle_two: NewPaddle(NewPoint2D(size.X-20, size.Y/2), paddleSize),
		Size:       size,
	}
}

func (f *Field) Update(input1 Input, input2 Input) {
	f.Paddle_one.Move(input1, f.Size, 5.0)
	f.Paddle_two.Move(input2, f.Size, 5.0)
	f.Ball.Move(f.Size, f.Paddle_one, f.Paddle_two)
}
