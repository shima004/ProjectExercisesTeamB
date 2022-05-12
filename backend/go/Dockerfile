FROM golang:latest

RUN mkdir /backend
WORKDIR /backend

RUN go mod init test3
RUN go get github.com/labstack/echo/v4
RUN go get github.com/labstack/echo/v4/middleware
RUN go get github.com/go-sql-driver/mysql
RUN go get github.com/jinzhu/gorm
RUN go get github.com/joho/godotenv
RUN go get github.com/googollee/go-socket.io
RUN go get github.com/gorilla/websocket