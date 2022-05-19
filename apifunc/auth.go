package apifunc

import (
	"ProjectExercises/TeamB/dbfunc"
	"time"

	"net/http"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

type LoginPostParams struct {
	Email    string `json:"email" form:"email" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
}

//認証が必要なAPIにアクセスするためトークンを返す
func LoginPost(c echo.Context) error {
	var params LoginPostParams
	if err := c.Bind(&params); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{"message": "パラメータが正しくありません: " + err.Error()})
	}

	if err := c.Validate(&params); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{"message": "パラメータが不足しています: " + err.Error()})
	}

	user, err := dbfunc.PostLoginInfo(params.Email, params.Password)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{"message": "データベースのユーザの取得に失敗しました: " + err.Error()})
	}

	if !dbfunc.ComparePassword(user.Password, params.Password) {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{"message": "パスワードが正しくありません"})
	}

	token := jwt.New(jwt.SigningMethodHS256)
	climes := token.Claims.(jwt.MapClaims)
	climes["uid"] = user.UUID
	climes["exp"] = time.Now().Add(time.Hour * 24 * 3).Unix()
	t, err := token.SignedString([]byte("secret"))
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, map[string]interface{}{"token": t}) // フロントに返す値
}
