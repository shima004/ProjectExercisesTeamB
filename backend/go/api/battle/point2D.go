package battle

type Point2D struct {
	X float64
	Y float64
}

func NewPoint2D(x, y float64) Point2D {
	return Point2D{x, y}
}
