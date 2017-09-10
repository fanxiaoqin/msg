package controllers

import (
	"github.com/astaxie/beego"
)

type IndexController struct {
	beego.Controller
}

func (c *IndexController) Get() {
	c.TplName = "index.html"
}
func (c *IndexController) Resume() {
	c.TplName = "resume.html"
}
func (c *IndexController) Jl() {
	c.TplName = "jl.html"
}
func (c *IndexController) Use() {
	c.TplName = "using.html"
}
