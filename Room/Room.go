package room

import (
	"context"
	"encoding/json"
	"github.com/shima004/ProjectExercisesTeamB/battle"
	"log"
	"time"
)

var ServerFPS = time.Second / 20

type Room struct {
	Id         string
	Players    []*Player
	Register   chan *Player
	Unregister chan *Player
	broadcast  chan Message
	Battle     *battle.Battle
	close      chan struct{}
}

func newRoom(id string) *Room {
	r := Room{
		Id:         id,
		Players:    make([]*Player, 0),
		Register:   make(chan *Player),
		Unregister: make(chan *Player),
		broadcast:  make(chan Message),
		Battle:     nil,
		close:      make(chan struct{}),
	}
	go r.Run(context.Background())
	return &r
}

func (rm *Room) AddPlayer(player *Player) {
	player.Room = rm
	player.Side = int8(len(rm.Players))
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
	c, cancel := context.WithCancel(context.Background())
	defer func() {
		ticker.Stop()
		cancel()
	}()
	for {
		select {
		case player := <-rm.Register:
			rm.AddPlayer(player)
			if len(rm.Players) == 2 {
				rm.Send([]byte("start"))
				rm.Battle = battle.OpenBattle(c)
			}
		case player := <-rm.Unregister:
			rm.RemovePlayer(player)
		case msg := <-rm.broadcast:
			var input battle.Input
			err := json.Unmarshal(msg.Mes, &input)
			if err != nil {
				log.Printf("error: %v", err)
			}
			input.Side = msg.Player.Side
			log.Printf("input: %v", input)
			rm.Send(msg.Mes)
			// if rm.Battle != nil {
			// 	input.Side = msg.Player.Side
			// 	rm.Battle.PlayerInput <- input
			// }
		case <-ctx.Done():
			log.Printf("Room %s closed", rm.Id)
			return
		case <-ticker.C:
			// rm.Send([]byte("tick" + time.Now().String()))
		}
	}
}
