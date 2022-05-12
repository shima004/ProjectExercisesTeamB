package game

import "context"

type Room struct {
	Id      string
	Players []*User
}

func (rm *Room) AddPlayer(user *User) {
	rm.Players = append(rm.Players, user)
}

func (rm *Room) Run(ctx context.Context) {

}
