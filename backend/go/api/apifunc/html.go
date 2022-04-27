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