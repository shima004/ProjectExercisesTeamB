package room

import (
	"ProjectExercises/TeamB/battle"
	"context"
	"encoding/json"
	"log"
	"time"
)

var ServerFPS = time.Second / 20

type Room struct {
	Id         string
	Players    []*Player
	Register   chan *Player
	Unregister chan *Player
	broadcast  chan OutputMessage
	read       chan InputMessage
	Battle     *Battle
	close      chan struct{}
}

func newRoom(id string) *Room {
	r := Room{
		Id:         id,
		Players:    make([]*Player, 0),
		Register:   make(chan *Player),
		Unregister: make(chan *Player),
		broadcast:  make(chan OutputMessage),
		read:       make(chan InputMessage),
		Battle:     nil,
		close:      make(chan struct{}),
	}
	go r.Run(context.Background())
	return &r
}

func (rm *Room) AddPlayer(player *Player) {
	player.Room = rm
	player.Side = int8(len(rm.Players))
	log.Printf("Player %s joined room %s", player.Connention.RemoteAddr(), rm.Id)
	rm.Players = append(rm.Players, player)
}

func (rm *Room) RemovePlayer(player *Player) {
	for i, p := range rm.Players {
		if p.UUID == player.UUID {
			if len(rm.Players) == 1 {
				rm.Players = make([]*Player, 0)
			} else {
				rm.Players = append(rm.Players[:i], rm.Players[i+1:]...)
			}
			log.Printf("Player %s left room %s", player.Connention.RemoteAddr(), rm.Id)
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
				rm.Battle = OpenBattle(c, rm)
			}
		case player := <-rm.Unregister:
			cancel()
			rm.RemovePlayer(player)
		case msg := <-rm.read:
			var input battle.Input
			err := json.Unmarshal(msg.Mes, &input)
			if err != nil {
				log.Printf("error: %v", err)
			}
			input.Side = msg.Player.Side
			if rm.Battle != nil {
				rm.Battle.PlayerInput <- input
			}
		case msg := <-rm.broadcast:
			m, err := json.Marshal(msg)
			if err != nil {
				log.Printf("error: %v", err)
			}
			rm.Send(m)
		case <-ctx.Done():
			log.Printf("Room %s closed", rm.Id)
			return
		case <-ticker.C:
			// rm.Send([]byte("tick" + time.Now().String()))
		}
	}
}
