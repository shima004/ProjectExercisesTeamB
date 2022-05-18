package battle

type Paddle struct {
	Position Point2D
	Size     Point2D
}

func NewPaddle(position Point2D, size Point2D) Paddle {
	return Paddle{position, size}
}

func (p *Paddle) Move(input Input, fieldSize Point2D, speed float64) {
	if input.Key.Left {
		p.Position.X -= speed
	}
	if input.Key.Right {
		p.Position.X += speed
	}
	if p.Position.X < p.Size.X/2 {
		p.Position.X = p.Size.X / 2
	}
	if p.Position.X > fieldSize.X-p.Size.X/2 {
		p.Position.X = fieldSize.X - p.Size.X/2
	}
}
