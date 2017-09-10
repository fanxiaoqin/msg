package main

import (
	"msg/database"
	_ "msg/routers"

	"github.com/astaxie/beego"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	database.Regist()
	beego.Run()
}
