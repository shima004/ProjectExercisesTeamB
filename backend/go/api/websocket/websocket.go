package ws

import (
	"github.com/gorilla/websocket"
)

var (
	upgrader = websocket.Upgrader{}
)

// func Ws(c echo.Context, rm *RoomManager) (a User, err error) {
// 	u, err := dbfunc.GetUserInfo(c)
// 	if err != nil {
// 		return
// 	}
// 	a = User{
// 		UUID:       u.UUID,
// 		Name:       u.Name,
// 		Room:       nil,
// 		Connention: c,
// 		disConnect: make(chan bool),
// 	}
// 	rm.AddUser <- &a
// 	rm.Print()

// 	return a, nil
// }
