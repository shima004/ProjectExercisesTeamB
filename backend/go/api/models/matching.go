package models

import "github.com/jinzhu/gorm"

// フィールド名は大文字でなければ外部パッケージからアクセスできないため大文字にすること！
type Matching struct {
	gorm.Model        // データベースで使えるようにするために必要
	Users      []User `json:"users"`
}
