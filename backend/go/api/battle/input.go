package battle

type Input struct {
	Time int64
	Key  Keys
	Side int
}

type Keys struct {
	Left  bool
	Right bool
}
