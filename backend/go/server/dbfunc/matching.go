package dbfunc

import (
	"ProjectExercises/TeamB/models"

	"github.com/labstack/echo/v4"
)

func PostMatching(c echo.Context, user models.User) (err error) {
	db := sqlConnect()
	defer db.Close()

	// マッチングのルームをすべて取得
	// err := db.Find(&models.Matching{})
	// if err != nil {
	// 	return err
	// }

	return err
}
