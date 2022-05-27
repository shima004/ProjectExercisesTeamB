package room

import (
	"ProjectExercises/TeamB/Field"
)

var (
	BAR_SPEED       = 5.0
	GAME_TIME       = 60 * 10 * 1
	FIELD_SIZE      = Field.NewPoint2D(800, 600)
	PADDLE_SIZE     = Field.NewPoint2D(100, 20)
	PADDLE_VELOCITY = Field.NewPoint2D(5.0, 0)
	BALL_SIZE       = 20.0
	BALL_VELOCITY   = Field.NewPoint2D(4.0, 4.0)

	BALL_MAX_VELOCITY = 10.0
	CLIENT_FPS        = 30
	SERVER_FPS        = 60
	BET               = 300
)
