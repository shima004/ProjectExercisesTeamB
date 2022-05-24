package room

import (
	"ProjectExercises/TeamB/Field"
	"context"
	"encoding/json"
	"log"
	"time"
)

var ServerFPS = time.Second / 60

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
	go r.Run()
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
		if p.Connention.RemoteAddr() == player.Connention.RemoteAddr() {
			if len(rm.Players) == 1 {
				rm.Players = make([]*Player, 0)
			} else {
				rm.Players = append(rm.Players[:i], rm.Players[i+1:]...)
			}
			log.Printf("Player %s left room %s", player.Connention.RemoteAddr(), rm.Id)
		}
	}
}

func (rm *Room) SendBroadcast(msg []byte) {
	for _, player := range rm.Players {
		select {
		case player.Send <- msg:
		default:
			rm.Unregister <- player
			close(player.Send)
		}
	}
}

func (rm *Room) inputMessageUnmarshal(message InputMessage) (input Field.Input, err error) {
	err = json.Unmarshal(message.Mes, &input)
	if err != nil {
		return input, err
	}
	input.Side = message.Player.Side
	return input, nil
}

func (rm *Room) isBattleOpen() bool {
	return rm.Battle != nil
}

func (rm *Room) isAvailable() bool {
	return len(rm.Players) == 2
}

func (rm *Room) Run() {
	c := context.Background()
	defer func() {
		c.Done()
	}()
	for {
		select {
		case player := <-rm.Register:
			rm.AddPlayer(player)
			if rm.isAvailable() {
				rm.Battle = OpenBattle(c, rm)
			}
		case player := <-rm.Unregister:
			rm.RemovePlayer(player)
		case msg := <-rm.read:
			input, err := rm.inputMessageUnmarshal(msg)
			if err != nil {
				log.Printf("Error unmarshal input message: %s", err)
				continue
			}
			if rm.isBattleOpen() {
				rm.Battle.PlayerInput <- input
			}
		case msg := <-rm.broadcast:
			m, err := json.Marshal(msg)
			if err != nil {
				log.Printf("error: %v", err)
			}
			rm.SendBroadcast(m)
		case <-c.Done():
			log.Printf("Battle is ended and Room %s closed", rm.Id)
			return
		}
	}
}
