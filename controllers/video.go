package controllers

import (
	"github.com/astaxie/beego"
)

type VideoController struct {
	beego.Controller
}

func (c *VideoController) Get() {
	c.TplName = "imitate.html"
}
func (c *VideoController) Videolist() {
	c.TplName = "video.html"
}
func (c *VideoController) SDK() {
	c.TplName = "vediosdk.html"
}
func (c *VideoController) Zhuanjia() {
	c.TplName = "zhuanjia.html"
}
