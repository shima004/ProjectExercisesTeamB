package battle

var (
	MoveSpeed = 5.0
)

type Paddle struct {
	Position Point2D
	Size     Point2D
}

func NewPaddle(position Point2D, size Point2D) Paddle {
	return Paddle{position, size}
}

func (p *Paddle) Move(input Input, filedSize Point2D) {
	if input.Key.Left {
		p.Position.X -= MoveSpeed
	}
	if input.Key.Right {
		p.Position.X += MoveSpeed
	}
	if p.Position.X < p.Size.X/2 {
		p.Position.X = 0
	}
	if p.Position.X+p.Size.X > p.Size.X {
		p.Position.X = p.Size.X - p.Size.X
	}
}
