package game

import (
	"ProjectExercises/TeamB/dbfunc"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

var (
	upgrader = websocket.Upgrader{}
)

func Ws(c echo.Context, rm *RoomManager) (a User, err error) {
	u, err := dbfunc.GetUserInfo(c)
	if err != nil {
		return
	}
	a = User{
		UUID:       u.UUID,
		Name:       u.Name,
		Room:       nil,
		Connention: c,
		disConnect: make(chan bool),
	}
	rm.AddUser <- &a
	rm.Print()

	return a, nil
}
