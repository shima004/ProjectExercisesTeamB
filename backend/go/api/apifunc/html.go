package apifunc

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetIndex(c echo.Context) error {
	data := map[string]interface{}{
		"Title": "ホーム",
	}
	return c.Render(http.StatusOK, "index", data)
}

func GetBlockBreaker(c echo.Context) error {
	data := map[string]interface{}{
		"Title": "ブロック崩し",
	}
	return c.Render(http.StatusOK, "blockBreaker", data)
}

func GetHockey(c echo.Context) error {
	data := map[string]interface{}{
		"Title": "ホッケー",
	}
	return c.Render(http.StatusOK, "hockey", data)
}

func GetNumberGuessing(c echo.Context) error {
	data := map[string]interface{}{
		"Title": "アルゴ",
	}
	return c.Render(http.StatusOK, "numberGuessing", data)
}

func GetShooting(c echo.Context) error {
	data := map[string]interface{}{
		"Title": "パネルたたき",
	}
	return c.Render(http.StatusOK, "shooting", data)
}

func GetSlot(c echo.Context) error {
	data := map[string]interface{}{
		"Title": "スロット",
	}
	return c.Render(http.StatusOK, "slot", data)
}

func GetSignUp(c echo.Context) error {
	data := map[string]interface{}{
		"Title": "SignUp",
	}
	return c.Render(http.StatusOK, "signUp", data)
}

func GetSignIn(c echo.Context) error {
	data := map[string]interface{}{
		"Title": "SignIn",
	}
	return c.Render(http.StatusOK, "signIn", data)
}

func GetSignOut(c echo.Context) error {
	data := map[string]interface{}{
		"Title": "SignOut",
	}
	return c.Render(http.StatusOK, "signOut", data)
}
