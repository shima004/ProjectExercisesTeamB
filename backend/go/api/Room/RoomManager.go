package room

import (
	"context"
	"fmt"
	"log"
)

type RoomManager struct {
	Rooms      map[int]*Room
	AddPlayer  chan *Player
	RemoveRoom chan *Room
}

func CreateRoomManager(ctx context.Context) *RoomManager {
	rm := &RoomManager{
		Rooms:     make(map[int]*Room),
		AddPlayer: make(chan *Player),
	}
	go rm.Run(ctx)
	return rm
}

func (rm *RoomManager) CreateNewRoom() {
	room := newRoom(fmt.Sprintf("%d", len(rm.Rooms)+1))
	rm.Rooms[len(rm.Rooms)] = room
}

func (rm *RoomManager) AddPlayerToRoom(Player *Player) {
	if len(rm.Rooms) == 0 {
		rm.CreateNewRoom()
	}
	if len(rm.Rooms[len(rm.Rooms)-1].Players) < 2 {
		rm.Rooms[len(rm.Rooms)-1].Register <- Player
	} else {
		rm.CreateNewRoom()
		rm.Rooms[len(rm.Rooms)-1].Register <- Player
	}
}

func (rm *RoomManager) RemovePlayerFromRoom(Player *Player) {
	for _, room := range rm.Rooms {
		for _, roomPlayer := range room.Players {
			if roomPlayer.UUID == Player.UUID {
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
			fmt.Println(player.UUID + " " + player.Name)
		}
	}
}

func (rm *RoomManager) Run(ctx context.Context) {
	log.Printf("RoomManager started")
	for {
		select {
		case Player := <-rm.AddPlayer:
			rm.AddPlayerToRoom(Player)
		case <-ctx.Done():
			return
		}
	}
}
