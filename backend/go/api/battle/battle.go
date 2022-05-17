package battle

import "context"

type battle struct {
	Field       Field
	PlayerOne   []Input
	PlayerTwo   []Input
	PlayerInput chan Input
	FieldUpdate chan bool
}

func (b *battle) AddPlayerInput(input Input) {
	if input.Side == 1 {
		b.PlayerOne = append(b.PlayerOne, input)
	} else {
		b.PlayerTwo = append(b.PlayerTwo, input)
	}
}

func (b *battle) BattleUpdate(ctx context.Context) {
	for {
		select {
		case <-b.FieldUpdate:
			b.FieldUpdate = make(chan bool)

			return
		}
	}
}

func (b *battle) Update() {

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
