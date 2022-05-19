package ws

type Message struct {
	Event   string      `json:"event"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}
