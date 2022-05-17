package battle

import (
	"context"
	"log"
)

var (
	BAR_SPEED = 5.0
)

type Battle struct {
	Field       Field
	PlayerOne   []Input
	PlayerTwo   []Input
	PlayerInput chan Input
	FieldUpdate chan bool
}

func OpenBattle(ctx context.Context) *Battle {
	battle := &Battle{
		Field:       NewField(NewPoint2D(800, 600), NewPoint2D(10, 50), 5),
		PlayerInput: make(chan Input),
		FieldUpdate: make(chan bool),
		PlayerOne:   make([]Input, 0),
		PlayerTwo:   make([]Input, 0),
	}
	go battle.RunBattle(ctx)
	return battle
}

func (b *Battle) AddPlayerInput(input Input) {
	if input.Side == 1 {
		b.PlayerOne = append(b.PlayerOne, input)
	} else {
		b.PlayerTwo = append(b.PlayerTwo, input)
	}
	if len(b.PlayerOne) >= 1 && len(b.PlayerTwo) >= 1 {
		b.FieldUpdate <- true
	}
}

func (b *Battle) BattleUpdate(ctx context.Context) {
	b.Field.Update(b.PlayerOne[0], b.PlayerTwo[0])
	if len(b.PlayerOne) >= 1 {
		b.PlayerOne = b.PlayerOne[1:]
	} else {
		b.PlayerOne = make([]Input, 0)
	}
	if len(b.PlayerTwo) >= 1 {
		b.PlayerTwo = b.PlayerTwo[1:]
	} else {
		b.PlayerTwo = make([]Input, 0)
	}
}

func (b *Battle) RunBattle(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			return
		case input := <-b.PlayerInput:
			b.AddPlayerInput(input)
			log.Println("Battle:", input)
		case <-b.FieldUpdate:
			b.BattleUpdate(ctx)
		}
	}
}
