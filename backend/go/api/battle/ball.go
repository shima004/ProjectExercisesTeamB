package battle

type Ball struct {
	Position Point2D
	Velocity Point2D
	Radius   float64
}

func NewBall(position Point2D, velocity Point2D, radius float64) Ball {
	return Ball{position, velocity, radius}
}
