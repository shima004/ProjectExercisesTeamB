package battle

import "context"

type battle struct {
	Field       Field
	PlayerOne   []Input
	PlayerTwo   []Input
	PlayerInput chan Input
	FieldUpdate chan bool
}

func OpenBattle(ctx context.Context) battle {
	battle := battle{
		Field:       NewField(NewPoint2D(800, 600), NewPoint2D(10, 50), 5),
		PlayerInput: make(chan Input),
		FieldUpdate: make(chan bool),
		PlayerOne:   make([]Input, 0),
		PlayerTwo:   make([]Input, 0),
	}
	go battle.RunBattle(ctx)
	return battle
}

func (b *battle) AddPlayerInput(input Input) {
	if input.Side == 1 {
		b.PlayerOne = append(b.PlayerOne, input)
	} else {
		b.PlayerTwo = append(b.PlayerTwo, input)
	}
	if len(b.PlayerOne) >= 1 && len(b.PlayerTwo) >= 1 {
		b.FieldUpdate <- true
	}
}

func (b *battle) BattleUpdate(ctx context.Context) {

}

func (b *battle) RunBattle(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			return
		case input := <-b.PlayerInput:
			b.AddPlayerInput(input)
		case <-b.FieldUpdate:
			b.BattleUpdate(ctx)
		}
	}
}
