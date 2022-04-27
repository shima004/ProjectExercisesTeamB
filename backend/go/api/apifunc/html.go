package apifunc

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetIndex(c echo.Context) error {
	data := map[string]interface{}{
		"Title": "Index",
	}
	return c.Render(http.StatusOK, "index", data)
}

func GetBlockBreaker(c echo.Context) error {
	data := map[string]interface{}{
		"Title": "BlockBreaker",
	}
	return c.Render(http.StatusOK, "blockBreaker", data)
}

func GetHockey(c echo.Context) error {
	data := map[string]interface{}{
		"Title": "Hockey",
	}
	return c.Render(http.StatusOK, "hockey", data)
}

func GetNumberGuessing(c echo.Context) error {
	data := map[string]interface{}{
		"Title": "NumberGuessing",
	}
	return c.Render(http.StatusOK, "numberGuessing", data)
}

func GetShooting(c echo.Context) error {
	data := map[string]interface{}{
		"Title": "Shooting",
	}
	return c.Render(http.StatusOK, "shooting", data)
}

func GetSlot(c echo.Context) error {
	data := map[string]interface{}{
		"Title": "Slot",
	}
	return c.Render(http.StatusOK, "slot", data)
}
