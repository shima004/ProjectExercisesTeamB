package game

import (
	"fmt"

	"github.com/labstack/echo/v4"
	"golang.org/x/net/websocket"
)

var matchingQueue_10 = MatchingQueue{
	Rate:  10,
	Queue: []int{},
}

var matchingQueue_50 = MatchingQueue{
	Rate:  50,
	Queue: []int{},
}

var matchingQueue_100 = MatchingQueue{
	Rate:  100,
	Queue: []int{},
}

// type Matching struct {
// 	Rate int
// 	token
// }

func Hello(c echo.Context) error {
	websocket.Handler(func(ws *websocket.Conn) {
		defer ws.Close()
		for {
			// Write
			err := websocket.Message.Send(ws, "Hello, Client!")
			if err != nil {
				c.Logger().Error(err)
			}

			// Read
			msg := ""
			err = websocket.Message.Receive(ws, &msg)
			if err != nil {
				// c.Logger().Error(err)
			}
			fmt.Printf("%s\n", msg)
		}
	}).ServeHTTP(c.Response(), c.Request())
	return nil
}
