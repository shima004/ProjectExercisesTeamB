package game

type Message struct {
	Event string `json:"event"`
	Message string `json:"message"`
	Data interface{} `json:"data"`
}