package game

import (
	"context"
	"fmt"
)

type RoomManager struct {
	Rooms   map[int]*Room
	AddUser chan *User
}

func CreateRoomManager(ctx context.Context) *RoomManager {
	rm := &RoomManager{
		Rooms:   make(map[int]*Room),
		AddUser: make(chan *User),
	}
	go rm.Run(ctx)
	return rm
}

func (rm *RoomManager) CreateNewRoom() {
	room := &Room{
		Id:      fmt.Sprintf("%d", len(rm.Rooms)),
		Players: make([]*User, 0),
	}
	rm.Rooms[len(rm.Rooms)] = room
}

func (rm *RoomManager) AddUserToRoom(user *User) {
	if len(rm.Rooms) == 0 {
		rm.CreateNewRoom()
	}
	if len(rm.Rooms[len(rm.Rooms)-1].Players) < 2 {
		rm.Rooms[len(rm.Rooms)-1].AddPlayer(user)
	} else {
		rm.CreateNewRoom()
		rm.Rooms[len(rm.Rooms)-1].AddPlayer(user)
	}
}

func (rm *RoomManager) RemoveUserFromRoom(user *User) {
	for _, room := range rm.Rooms {
		for _, roomUser := range room.Players {
			if roomUser.UUID == user.UUID {
				room.Players = append(room.Players[:], room.Players[:]...)
				room.Players = room.Players[:len(room.Players)-1]
				return
			}
		}
	}
}

func (rm *RoomManager) Print() {
	for _, room := range rm.Rooms {
		fmt.Println(room.Id)
		for _, player := range room.Players {
			fmt.Println(player.UUID)
		}
	}
}

func (rm *RoomManager) Run(ctx context.Context) {
	for {
		select {
		case user := <-rm.AddUser:
			rm.AddUserToRoom(user)
			go user.Run()
		case <-ctx.Done():
			return
		}
	}
}
