package Field

import (
	"log"
	"math"
)

type Paddle struct {
	Position Point2D
	Size     Point2D
	Velocity Point2D
}

func NewPaddle(position Point2D, size Point2D, Velocity Point2D) Paddle {
	return Paddle{position, size, Velocity}
}

func (p *Paddle) Collide(b *Ball) bool {
	fp := Point2D{
		X: b.Position.X + b.Velocity.X,
		Y: b.Position.Y + b.Velocity.Y,
	}
	ball := NewBall(fp, b.Velocity, b.Radius, 0)
	// 円と矩形の衝突判定
	//　矩形の上下
	if p.Position.X-(p.Size.X/2) < ball.Position.X && p.Position.X+(p.Size.X/2) > ball.Position.X {
		if p.Position.Y-(p.Size.Y/2)-(ball.Radius) < ball.Position.Y && p.Position.Y+(p.Size.Y/2)+(ball.Radius) > ball.Position.Y {
			b.Velocity.Y *= -1
			b.Velocity.X += p.Velocity.X
			return true
		}
	}

	//　矩形の左右
	if p.Position.Y-(p.Size.Y/2) < ball.Position.Y && p.Position.Y+(p.Size.Y/2) > ball.Position.Y {
		if p.Position.X-(p.Size.X/2)-(ball.Radius) < ball.Position.X && p.Position.X+(p.Size.X/2)+(ball.Radius) > ball.Position.X {
			b.Velocity.X *= -1
			return true
		}
	}

	c1 := NewPoint2D(p.Position.X-(p.Size.X/2), p.Position.Y-(p.Size.Y/2))
	c2 := NewPoint2D(p.Position.X+(p.Size.X/2), p.Position.Y-(p.Size.Y/2))
	c3 := NewPoint2D(p.Position.X+(p.Size.X/2), p.Position.Y+(p.Size.Y/2))
	c4 := NewPoint2D(p.Position.X-(p.Size.X/2), p.Position.Y+(p.Size.Y/2))
	if c1.Distance(ball.Position) < ball.Radius || c2.Distance(ball.Position) < ball.Radius || c3.Distance(ball.Position) < ball.Radius || c4.Distance(ball.Position) < ball.Radius {
		b.Velocity.Y *= -1
		b.Velocity.X *= -1
		return true
	}
	return false
}

func (p *Paddle) Move(input Input, fieldSize Point2D) {
	if input.Key.Left {
		p.Velocity.X = math.Max(p.Velocity.X-0.3, -10)
	}
	if input.Key.Right {
		p.Velocity.X = math.Min(p.Velocity.X+0.3, 10)
	}
	log.Println(math.Round(p.Velocity.X))
	p.Position.X += math.Round(p.Velocity.X)
	if p.Position.X < p.Size.X/2 {
		p.Position.X = p.Size.X / 2
		p.Velocity.X *= -0.5
	}
	if p.Position.X > fieldSize.X-p.Size.X/2 {
		p.Position.X = fieldSize.X - p.Size.X/2
		p.Velocity.X *= -0.5
	}
}
