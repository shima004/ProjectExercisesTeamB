package room

import (
	"log"
	"time"

	"github.com/gorilla/websocket"
)

var Upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 512
)

type Player struct {
	UUID       string
	Name       string
	Room       *Room
	Connention *websocket.Conn
	Send       chan []byte
	Side       int8
}

func NewPlayer(uuid string, name string, room *Room, conn *websocket.Conn) *Player {
	u := &Player{
		UUID:       uuid,
		Name:       name,
		Room:       room,
		Connention: conn,
		Send:       make(chan []byte, 256),
		Side:       -1,
	}
	return u
}

func (u *Player) Read() {
	defer func() {
		u.Room.Unregister <- u
		u.Connention.Close()
	}()
	u.Connention.SetReadLimit(maxMessageSize)
	if err := u.Connention.SetReadDeadline(time.Now().Add(pongWait)); err != nil {
		log.Printf("SetReadDeadline error: %v", err)
	}
	u.Connention.SetPongHandler(func(string) error {
		if err := u.Connention.SetReadDeadline(time.Now().Add(pongWait)); err != nil {
			log.Printf("SetReadDeadline error: %v", err)
		}
		return nil
	})
	for {
		_, message, err := u.Connention.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		message = append(message, '\n')
		msg := &InputMessage{
			Mes:    message,
			Player: u,
		}
		u.Room.read <- *msg
	}
}

func (u *Player) Write() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		u.Connention.Close()
	}()
	for {
		select {
		case message, ok := <-u.Send:
			if err := u.Connention.SetWriteDeadline(time.Now().Add(writeWait)); err != nil {
				log.Printf("SetWriteDeadline error: %v", err)
			}
			if !ok {
				if err := u.Connention.WriteMessage(websocket.CloseMessage, []byte{}); err != nil {
					log.Printf("WriteMessage error: %v", err)
				}
				return
			}
			w, err := u.Connention.NextWriter(websocket.TextMessage)
			if err != nil {
				log.Printf("NextWriter error: %v", err)
				return
			}
			if _, err := w.Write(message); err != nil {
				log.Printf("Write error: %v", err)
				return
			}

			if err := w.Close(); err != nil {
				log.Printf("Close error: %v", err)
				return
			}

			//送られていなかったデータを送信する
			n := len(u.Send)
			for i := 0; i < n; i++ {
				message, ok := <-u.Send
				if !ok {
					return
				}
				w, err := u.Connention.NextWriter(websocket.TextMessage)
				if err != nil {
					log.Printf("NextWriter error: %v", err)
					return
				}
				if _, err := w.Write(message); err != nil {
					log.Printf("Write error: %v", err)
					return
				}

				if err := w.Close(); err != nil {
					log.Printf("Close error: %v", err)
					return
				}
			}

		case <-ticker.C:
			if err := u.Connention.SetWriteDeadline(time.Now().Add(writeWait)); err != nil {
				log.Printf("SetWriteDeadline error: %v", err)
			}
			if err := u.Connention.WriteMessage(websocket.PingMessage, nil); err != nil {
				log.Printf("WriteMessage error: %v", err)
				return
			}
		}
	}
}
