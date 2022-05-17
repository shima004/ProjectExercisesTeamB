package room

import (
	"context"
	"log"
	"time"
)

var ServerFPS = time.Second / 20

type Room struct {
	Id         string
	Players    []*Player
	Register   chan *Player
	Unregister chan *Player
	broadcast  chan []byte
}

func newRoom(id string) *Room {
	r := Room{
		Id:         id,
		Players:    make([]*Player, 0),
		Register:   make(chan *Player),
		Unregister: make(chan *Player),
		broadcast:  make(chan []byte),
	}
	go r.Run(context.Background())
	return &r
}

func (rm *Room) AddPlayer(player *Player) {
	player.Room = rm
	rm.Players = append(rm.Players, player)
}

func (rm *Room) RemovePlayer(player *Player) {
	for i, player := range rm.Players {
		if player.UUID == player.UUID {
			if len(rm.Players) == 1 {
				rm.Players = make([]*Player, 0)
			} else {
				rm.Players = append(rm.Players[:i], rm.Players[i+1:]...)
			}
		}
	}
}

func (rm *Room) Send(msg []byte) {
	for _, player := range rm.Players {
		select {
		case player.Send <- msg:
		default:
			rm.Unregister <- player
			close(player.Send)
			rm.RemovePlayer(player)
		}
	}
}

func (rm *Room) Run(ctx context.Context) {
	ticker := time.NewTicker(ServerFPS)
	for {
		select {
		case player := <-rm.Register:
			rm.AddPlayer(player)
		case player := <-rm.Unregister:
			rm.RemovePlayer(player)
		case msg := <-rm.broadcast:
			rm.Send(msg)
		case <-ctx.Done():
			log.Printf("Room %s closed", rm.Id)
			return
		case <-ticker.C:
			rm.Send([]byte("tick" + time.Now().String()))
		}
	}
}
