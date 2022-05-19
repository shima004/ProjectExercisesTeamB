package battle

type Input struct {
	Time int64
	Key  Keys
	Side int8
}

type Keys struct {
	Left  bool
	Right bool
}
