package game

import (
	"log"

	"github.com/labstack/echo/v4"
)

type User struct {
	UUID       string
	Name       string
	Room       *Room
	Connention echo.Context
	disConnect chan bool
}

func (u *User) Run() {
	ws, err := upgrader.Upgrade(u.Connention.Response(), u.Connention.Request(), nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer ws.Close()
	for {
		var msg Message
		err := ws.ReadJSON(&msg)
		if err != nil {
			return
		}
		log.Println(msg)
		// switch msg.Type {
		// case "join":
		// 	u.Room.AddPlayer(u)
		// case "leave":
		// 	u.Room.RemovePlayer(u)
		// case "chat":
		// 	u.Room.Broadcast(msg)
		// }

	}
}
