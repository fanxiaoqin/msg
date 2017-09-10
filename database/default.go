package database

import "github.com/astaxie/beego"
import "github.com/astaxie/beego/orm"

func Regist() {
	orm.RegisterDriver("mysql", orm.DRMySQL)
	orm.RegisterDataBase("default", "mysql", beego.AppConfig.String("DataBase::connStr"))

}
