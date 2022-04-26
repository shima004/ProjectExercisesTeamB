# コードについての説明
## ./main.go
---
```go
e.a(b, c)
```
aにはHTTPのメソッド名(GET, POST, PUT, DELETEなど)を指定し、 bにはパスを指定し、cには受け取ったデータを処理してどのようにして返すかを記述した関数を指定します。

例
```go
e.POST("/coin", apifunc.CoinPost)
```
localhost:8080/**coin**
にきた**POST**リクエストを処理する関数(apifunc.CoinPost)を指定しています。

## ./apifunc/*.go
---
このディレクトリには、リクエストを処理してデータを返す関数を定義しています。
### ./apifunc/user.go
---
例として、/user [GET]リクエストを処理する関数について説明していきます。
```go
type UserGetParams struct {
	Email string `json:"email"`
}

// success: return (json){email: (string), name: (string)}
// error: return (json){"message": (string)}
func UserGet(c echo.Context) error {
	// 送られてきたJSONを確かめる
	var params UserGetParams
	if err := c.Bind(&params); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{"message": "パラメータが正しくありません: " + err.Error()})
	}

	// 送られてきたデータを元にDBから取得する
	user, err := dbfunc.GetUserInfo(params.Email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{"message": "データが取得できませんでした: " + err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{"email": user.Email, "total": user.Coin})
}
```

---

```go
type UserGetParams struct {
	Email string `json:"email"`
}
```
JSONで受け取るパラメータを定義しています。

例
```go
type Example struct {
  LastName string `json:"last_name"`
  FirstName string `json:"first_name"`
  Age int `json:"age"`
}
```
この例では
```json
{
  "last_name": "hoge",
  "first_name": "fuga",
  "age": 20
}
```
というJSONを受け取ることができます。

---
```go
// 送られてきたJSONを確かめる
var params UserGetParams
if err := c.Bind(&params); err != nil {
  return c.JSON(http.StatusInternalServerError, map[string]interface{}{"message": "パラメータが正しくありません: " + err.Error()})
}
```
送られてきたJSONが先程定義したパラメータと一致しているか確認しています。
送られてきたJSONが自分が設定したパラメータと一致していない場合は、エラーを返します。

```go
var prams [UserGetParams]
```

の部分を変えれば、他のパラメータを受け取ることもできます。

---
```go
// 送られてきたデータを元にDBから取得する
user, err := dbfunc.GetUserInfo(params.Email)
if err != nil {
  return c.JSON(http.StatusInternalServerError, map[string]interface{}{"message": "データが取得できませんでした: " + err.Error()})
}
```
送られてきたデータを元にDBからユーザー情報を取得しています。<br>
dbfunc.GetUserInfo関数は、後述するdbfunc/user.goに記述しています。
データベースにユーザー情報が存在しない場合や、データベースに接続できない場合はエラーを返します。

---
```go
return c.JSON(http.StatusOK, map[string]interface{}{"email": user.Email, "total": user.Coin})
```
エラーがない場合は、ユーザー情報JSONで返します。

例
```go
return c.JSON(http.StatusOK, map[string]interface{}{"last_name": user.LastName, "first_name": user.FirstName, "age": user.Age})
```
c.JSONの第1引数には、HTTPレスポンスステータスコードを指定します。
第2引数には、JSONで返すデータを指定します。

# ./models/*.go
このディレクトリには、データベースに登録するテーブルに対応するモデルを定義しています。

## ./models/user.go
---
データベースに登録するUserのモデルを定義しています。
```go
type User struct {
	gorm.Model        // データベースで使えるようにするために必要
	Email      string `json:"email";gorm:"type:varchar(100);gorm:unique_index"`
	Password   string `json:"password"`
	Name       string `json:"name"`
	Coin       int    `json:"coin"`
}
```




# ./dbfunc/*.go
このディレクトリには、主にデータベースを操作する関数を定義しています。

## ./dbfunc/user.go
---
例として、/user [GET]リクエストの関数で使用している、データベースから情報を取得する関数について説明していきます。
```go
func GetUserInfo(email string) (user models.User, err error) {
	db := sqlConnect()

	// データベースからユーザー情報を取得
	var u models.User
	err = db.Where("email = ?", email).First(&u).Error

	defer db.Close()
	return u, err
}
```
この関数は、引数に渡されたemailを元にデータベースからユーザー情報を取得し、そのデータとエラーを返します。
データの更新などの返すデータのない場合でも、エラーを返すようにしてください

```go
db := sqlConnect()
```
データベースに接続するため。
```go
var u models.User
	err = db.Where("email = ?", email).First(&u).Error
```
データベースからemailをもとにユーザー情報を取得します。
```go
defer db.Close()
```
データベースから切断するため。
```go
return u, err
```
データとエラーを返す。