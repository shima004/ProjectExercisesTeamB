package apifunc

import (
	"io/ioutil"
	"net/http"

	"github.com/labstack/echo/v4"
)

// return json{path: ([][]string)}
func ImageGet(c echo.Context) error {
	var imgPath []string
	var imgPaths [][]string
	files, err := ioutil.ReadDir("./static/img")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{"message": "データベースのユーザの取得に失敗しました: " + err.Error()})
	}
	for _, file := range files {
		if file.IsDir() {
			images, err := ioutil.ReadDir("./static/img/" + file.Name())
			if err != nil {
				return c.JSON(http.StatusInternalServerError, map[string]interface{}{"message": err.Error()})
			}
			for _, image := range images {
				imgPath = append(imgPath, image.Name())
			}
			imgPaths = append(imgPaths, imgPath)
			imgPath = []string{}
		}
	}

	return c.JSON(http.StatusOK, map[string]interface{}{"path": imgPaths}) // フロントに返す値
}
