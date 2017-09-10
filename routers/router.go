package routers

import (
	"msg/controllers"

	"github.com/astaxie/beego"
)

func init() {

	beego.Router("/", &controllers.IndexController{})
	beego.Router("/resume", &controllers.IndexController{}, "get:Resume")
	beego.Router("/use", &controllers.IndexController{}, "get:Use")
	beego.Router("/jl", &controllers.IndexController{}, "get:Jl")
	beego.Router("/video", &controllers.VideoController{})
	beego.Router("/v-list", &controllers.VideoController{}, "get:Videolist")
	beego.Router("/sdk", &controllers.VideoController{}, "get:SDK")
	beego.Router("/zj", &controllers.VideoController{}, "get:Zhuanjia")
	beego.Router("/face", &controllers.FaceController{})

	beego.Router("/tbank", &controllers.TbankController{})
	beego.Router("/t-list", &controllers.TbankController{}, "get:Tables")
	beego.Router("/tiku", &controllers.TbankController{}, "get,post:TiKu")
	beego.Router("/:knowledgepoint", &controllers.TbankController{}, "get,post:QuesType")
	beego.Router("/single", &controllers.TbankController{}, "get:Single")
	beego.Router("/getpage", &controllers.TbankController{}, "get,post:GetPage")
	beego.Router("/getpages", &controllers.TbankController{}, "get,post:GetPages")

	beego.Router("/shequ-1", &controllers.ShequController{})

	beego.Router("/jsjl", &controllers.ShequController{}, "get:Jsjl")
	beego.Router("/zyfx", &controllers.ShequController{}, "get:Zyfx")
	beego.Router("/zp", &controllers.ShequController{}, "get:ZP")
	beego.Router("/ysh", &controllers.ShequController{}, "get:Ysh")
	beego.Router("/single", &controllers.ShequController{}, "get:Sqdetail")

	beego.Router("/logi", &controllers.UserController{}, "get:Logi")
	beego.Router("/login", &controllers.UserController{}, "post:Login")
	beego.Router("/sign", &controllers.UserController{}, "get:Sign")
	beego.Router("/signup", &controllers.UserController{}, "get:SignUp")
}
