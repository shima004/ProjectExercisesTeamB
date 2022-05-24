package battle

type Ball struct {
	Position Point2D
	Velocity Point2D
	Radius   float64
}

func NewBall(position Point2D, velocity Point2D, radius float64) Ball {
	return Ball{position, velocity, radius}
}

func (b *Ball) Move(fieldSize Point2D, paddle1 Paddle, paddle2 Paddle) {
	futurePosition := Point2D{
		X: b.Position.X + b.Velocity.X,
		Y: b.Position.Y + b.Velocity.Y,
	}
	if futurePosition.X+b.Radius > fieldSize.X {
		b.Velocity.X *= -1
	}
	if futurePosition.X-b.Radius < 0 {
		b.Velocity.X *= -1
	}
	if futurePosition.Y+b.Radius > fieldSize.Y {
		b.Velocity.Y *= -1
	}
	if futurePosition.Y-b.Radius < 0 {
		b.Velocity.Y *= -1
	}
	if futurePosition.X+b.Radius > paddle1.Position.X && futurePosition.X-b.Radius < paddle1.Position.X+paddle1.Size.X && futurePosition.Y+b.Radius > paddle1.Position.Y && futurePosition.Y-b.Radius < paddle1.Position.Y+paddle1.Size.Y {
		b.Velocity.X *= -1
	}
	if futurePosition.X+b.Radius > paddle2.Position.X && futurePosition.X-b.Radius < paddle2.Position.X+paddle2.Size.X && futurePosition.Y+b.Radius > paddle2.Position.Y && futurePosition.Y-b.Radius < paddle2.Position.Y+paddle2.Size.Y {
		b.Velocity.X *= -1
	}
	b.Position.X += b.Velocity.X
	b.Position.Y += b.Velocity.Y
}
