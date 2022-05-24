package dbfunc

import (
	"ProjectExercises/TeamB/dbModels"
)

func PostLoginInfo(email string, password string) (user dbModels.User, err error) {
	db := sqlConnect()
	defer db.Close()

	// データベースからユーザー情報を取得
	var u dbModels.User
	if err = db.Where("email = ?", email).First(&u).Error; err != nil {
		return u, err
	}

	return u, err
}
