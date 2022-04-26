package dbfunc

import (
	"ProjectExercises/TeamB/models"
)

func PostLoginInfo(email string, password string) (user models.User, err error) {
	db := sqlConnect()
	defer db.Close()

	// データベースからユーザー情報を取得
	var u models.User
	if err = db.Where("email = ?", email).First(&u).Error; err != nil {
		return u, err
	}

	return u, err
}
