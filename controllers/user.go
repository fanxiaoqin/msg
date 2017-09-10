package controllers

import (
	"fmt"
	"msg/database"
	"msg/utils"

	"github.com/astaxie/beego"
)

type UserController struct {
	beego.Controller
}

func (c *UserController) Logi() {
	c.TplName = "login.html"
}
func (c *UserController) Login() {
	username := c.GetString("username")
	password := c.GetString("password")
	if username == "" || password == "" {
		c.Ctx.WriteString(utils.Obj2JS(4, "请输入xxxx"))
		return
	}
	user := &database.User{}
	res, err := user.Login(username, password)
	fmt.Println("c", username, password, "err:", err)
	if err == nil && len(res) > 0 {

		var id = res[0]["id"]
		fmt.Println(id)
		c.Ctx.WriteString(utils.Obj2JS(2, res[0]))
		return
	} else {
		c.Ctx.WriteString(utils.Obj2JS(4, "未查询到数据"))
		return
	}
}
func (c *UserController) Sign() {
	c.TplName = "register.html"
}
func (c *UserController) SignUp() {
	email := c.GetString("email")
	username := c.GetString("username")
	password := c.GetString("password")
	user := &database.User{}
	if user.SignUp(email, username, password) {
		c.Ctx.WriteString(utils.Obj2JS(2, "注册成功"))
	} else {
		c.Ctx.WriteString(utils.Obj2JS(4, "注册失败"))
	}

}
