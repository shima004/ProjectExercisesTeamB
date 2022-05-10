package apifunc

import (
	"ProjectExercises/TeamB/dbfunc"
	"net/http"

	"github.com/labstack/echo/v4"
)

// success: return (json){email: (string), name: (string)}
// error: return (json){"message": (string)}
func UserGet(c echo.Context) error {
	// 送られてきたデータを元にDBから取得する
	user, err := dbfunc.GetUserInfo(c)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{"message": "データが取得できませんでした: " + err.Error()})
	}
	return c.JSON(http.StatusOK, map[string]interface{}{"name": user.Name, "coin": user.Coin})
}

type UserPostParams struct {
	Email    string `json:"email" form:"email" param:"email" validate:"required"`
	Password string `json:"password" form:"password" param:"password" validate:"required"`
	Name     string `json:"name" form:"name" param:"name" validate:"required"`
}

// success: return (json){"message": (string)}
// error: return (json){"message": (string)}
func UserPost(c echo.Context) error {
	// 送られてきたJSONを確かめる
	var params UserPostParams
	if err := c.Bind(&params); err != nil {
		println(err.Error())
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{"message": "パラメータが正しくありません: " + err.Error()})
	}

	if err := c.Validate(&params); err != nil {
		println(err.Error())
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{"message": "パラメータが不足しています: " + err.Error()})
	}

	// 送られてきたデータを元にDBに登録する
	if err := dbfunc.PostUser(params.Email, params.Password, params.Name); err != nil {
		println(err.Error())
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{"message": "データベースへの登録に失敗しました:" + err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{"message": "success"})
}

type UserPutParams struct {
	Name string `json:"name" validate:"required"`
}

// success: return (json){"message": (string)}
// error: return (json){"message": (string)}
func UserPut(c echo.Context) error {
	// 送られてきたJSONを確かめる
	var params UserPutParams
	if err := c.Bind(&params); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{"message": "パラメータが正しくありません: " + err.Error()})
	}

	if err := c.Validate(&params); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{"message": "パラメータが不足しています: " + err.Error()})
	}

	// 送られてきたデータを元にDBを更新する
	if err := dbfunc.PutUser(c, params.Name); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{"message": "データベースの更新に失敗しました: " + err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{"message": "success"})
}
