package battle

import "math"

type Point2D struct {
	X float64
	Y float64
}

func NewPoint2D(x, y float64) Point2D {
	return Point2D{x, y}
}

func (p Point2D) Distance(p2 Point2D) float64 {
	return math.Sqrt(math.Pow(p.X-p2.X, 2) + math.Pow(p.Y-p2.Y, 2))
}
