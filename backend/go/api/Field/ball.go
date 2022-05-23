package Field

import "math/rand"

type Ball struct {
	Position Point2D
	Velocity Point2D
	Radius   float64
}

func NewBall(position Point2D, velocity Point2D, radius float64) Ball {
	return Ball{position, velocity, radius}
}

func (b *Ball) Move(fieldSize Point2D, paddle1 Paddle, paddle2 Paddle) int {
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
		b.Position.X = fieldSize.X / 2
		b.Position.Y = fieldSize.Y / 2
		b.Velocity.X = 8 * (rand.Float64() - 0.5)
		b.Velocity.Y = -8 * rand.Float64()
		return 1
	}
	if futurePosition.Y-b.Radius < 0 {
		b.Position.X = fieldSize.X / 2
		b.Position.Y = fieldSize.Y / 2
		b.Velocity.X = 8 * (rand.Float64() - 0.5)
		b.Velocity.Y = 8 * rand.Float64()
		return 2
	}
	paddle1.Collide(b)
	paddle2.Collide(b)
	b.Position.X += b.Velocity.X
	b.Position.Y += b.Velocity.Y
	return 0
}
