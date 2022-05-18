package room

type InputMessage struct {
	Mes    []byte
	Player *Player
}

type OutputMessage struct {
	Mes   string
	Event string
}
