package database

import (
	"fmt"

	"github.com/astaxie/beego/orm"
)

type User struct {
}

func (this User) Login(username, password string) ([]orm.Params, error) {
	o := orm.NewOrm()
	var maps []orm.Params
	_, err := o.Raw("SELECT userid,username,password FROM userinfo where username=? and password=?", username, password).Values(&maps, "userid", "username", "password")
	fmt.Println(maps, err)
	return maps, err
}
func (this User) SignUp(email, username, password string) bool {
	o := orm.NewOrm()
	res, err := o.Raw("insert into userinfo (email,username,password) values (?,?,?)", email, username, password).Exec()
	if err == nil {
		num, _ := res.RowsAffected()
		fmt.Println(" ", num)
		if num > 0 {
			return true
		} else {
			return false
		}
	}
	return false
}
