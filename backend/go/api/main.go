package main

import (
	"ProjectExercises/TeamB/apifunc"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type CustomValidator struct {
	validator *validator.Validate
}

func (cv *CustomValidator) Validate(i interface{}) error {
	log.Println(i)
	if err := cv.validator.Struct(i); err != nil {
		// Optionally, you could return the error to give each route more control over the status code
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}

type Template struct {
  templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
  return t.templates.ExecuteTemplate(w, name, data)
}

func initUrl(e *echo.Echo) {
	requiredAuth := e.Group("")

	requiredAuth.Use(middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey: []byte("secret"),
	}))

	// http://localhost:8080/coin : GET apifunc->coin.go->CoinPost()
	requiredAuth.POST("/coin", apifunc.CoinPost)

	// http://localhost:8080/user : GET apifunc->user.go->UserGet()
	requiredAuth.GET("/user", apifunc.UserGet)
	// http://localhost:8080/user : POST apifunc->user.go->UserPost()
	e.POST("/user", apifunc.UserPost)
	// http://localhost:8080/user : PUT apifunc->user.go->UserPut()
	requiredAuth.PUT("/user", apifunc.UserPut)

	// http://localhost:8080/login : POST apifunc->login.go->LoginPost()
	e.POST("/login", apifunc.LoginPost)

	e.GET("/index", apifunc.GetIndex)
}

func main() {
	e := echo.New()
	e.Validator = &CustomValidator{validator: validator.New()}
	e.Static("/static/img", "./static/img")

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())
	e.Use(middleware.BodyDump(func(c echo.Context, reqBody, resBody []byte) {
		fmt.Fprintf(os.Stderr, "Request: %v\n", string(reqBody))
	}))

	t := &Template{
    templates: template.Must(template.ParseGlob("views/*.html")),
  }

	e.Renderer = t

	initUrl(e)

	// 8080???????????????????????????
	e.Logger.Fatal(e.Start(":8080"))
}
