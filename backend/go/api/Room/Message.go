package room

import (
	"encoding/json"
	"log"
)

type InputMessage struct {
	Mes    []byte
	Player *Player
}

type OutputMessage struct {
	Mes   string
	Event string
}

func (o *OutputMessage) ToJson() string {
	m, err := json.Marshal(o)
	if err != nil {
		log.Println("Room:", err)
	}
	return string(m)
}
