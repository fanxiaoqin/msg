package controllers

import (
	"github.com/astaxie/beego"
)

type FaceController struct {
	beego.Controller
}

func (c *FaceController) Get() {
	c.TplName = "faceto.html"
}
