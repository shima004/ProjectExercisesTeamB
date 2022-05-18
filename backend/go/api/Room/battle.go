package room

import (
	"ProjectExercises/TeamB/battle"
	"context"
	"encoding/json"
	"log"
	"time"
)

var (
	BAR_SPEED = 5.0
)

type Battle struct {
	Field       battle.Field
	PlayerOne   []battle.Input
	PlayerTwo   []battle.Input
	PlayerInput chan battle.Input
	FieldUpdate chan bool
	Room        *Room
}

func OpenBattle(ctx context.Context, room *Room) *Battle {
	battle := &Battle{
		Field:       battle.NewField(battle.NewPoint2D(800, 600), battle.NewPoint2D(200, 20), 5),
		PlayerInput: make(chan battle.Input),
		FieldUpdate: make(chan bool),
		PlayerOne:   make([]battle.Input, 0),
		PlayerTwo:   make([]battle.Input, 0),
		Room:        room,
	}
	go battle.RunBattle(ctx)
	return battle
}

func (b *Battle) AddPlayerInput(input battle.Input) {
	if input.Side == 1 {
		b.PlayerOne = append(b.PlayerOne, input)
	} else {
		b.PlayerTwo = append(b.PlayerTwo, input)
	}
}

func (b *Battle) BattleUpdate() {
	if len(b.PlayerOne) == 0 || len(b.PlayerTwo) == 0 {
		return
	}
	b.Field.Update(b.PlayerOne[0], b.PlayerTwo[0])
	if len(b.PlayerOne) >= 1 {
		b.PlayerOne = b.PlayerOne[1:]
	} else {
		b.PlayerOne = make([]battle.Input, 0)
	}
	if len(b.PlayerTwo) >= 1 {
		b.PlayerTwo = b.PlayerTwo[1:]
	} else {
		b.PlayerTwo = make([]battle.Input, 0)
	}

	msg, e := json.Marshal(b.Field)
	if e != nil {
		log.Println("Battle:", e)
	}
	m := OutputMessage{
		Mes:   string(msg),
		Event: "update",
	}
	b.Room.broadcast <- m
}

func (b *Battle) initBattle() {
	for _, v := range b.Room.Players {
		for _, v2 := range b.Room.Players {
			if v.Connention.RemoteAddr() != v2.Connention.RemoteAddr() {
				// msg, err := json.Marshal(OutputMessage{
				// 	Mes:   v2.Name,
				// 	Event: "join",
				// })
				// if err != nil {
				// 	log.Println("Battle_init:", err)
				// }
				b.Room.broadcast <- OutputMessage{
					Mes:   v2.Name,
					Event: "join",
				}
			}
		}
	}
	field, err := json.Marshal(b.Field)
	if err != nil {
		log.Println("Battle:", err)
	}
	m := OutputMessage{
		Mes:   string(field),
		Event: "start",
	}
	b.Room.broadcast <- m
}

func (b *Battle) RunBattle(ctx context.Context) {
	b.initBattle()
	log.Println("Battle:", "Battle started"+b.Room.Id)
	// field, err := json.Marshal(b.Field)
	// if err != nil {
	// 	log.Println("Battle:", err)
	// }
	// m := OutputMessage{
	// 	Mes:   string(field),
	// 	Event: "start",
	// }
	// b.Room.broadcast <- m
	tiker := time.NewTicker(time.Second / 60)
	for {
		select {
		case <-ctx.Done():
			log.Println("Battle:", "Battle ended"+b.Room.Id)
			return
		case input := <-b.PlayerInput:
			b.AddPlayerInput(input)
		case <-tiker.C:
			b.BattleUpdate()
		}
	}
}
