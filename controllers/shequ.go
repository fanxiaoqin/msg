package controllers

import (
	"github.com/astaxie/beego"
)

type ShequController struct {
	beego.Controller
}

func (c *ShequController) Get() {
	c.TplName = "index-1.html"
}

func (c *ShequController) Jsjl() {
	c.TplName = "jsjl.html"
}
func (c *ShequController) Zyfx() {
	c.TplName = "zyfx.html"
}
func (c *ShequController) ZP() {
	c.TplName = "zpxx.html"
}
func (c *ShequController) Ysh() {
	c.TplName = "life.html"
}
func (c *ShequController) Sqdetail() {
	c.TplName = "single.html"
}
