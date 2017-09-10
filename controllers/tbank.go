package controllers

import (
	"fmt"
	"msg/database"
	"msg/utils"

	"github.com/astaxie/beego"
)

type TbankController struct {
	beego.Controller
}

func (c *TbankController) Get() {
	c.TplName = "tbank.html"
}
func (c *TbankController) Tables() {
	c.TplName = "tables.html"
}
func (c *TbankController) TiKu() {
	class := c.GetString("class")
	top, err := c.GetInt("top")
	if err != nil {
		c.Ctx.WriteString(utils.Obj2JS(4, "参数(top)错误："+err.Error()))
		return
	}
	question := &database.Question{}
	res, err := question.TiKu(class, top)

	var i int
	if err == nil && len(res) > 0 {
		JSONRES := make(map[string]interface{})
		sliceCount := make([]interface{}, 0)
		for i = 0; i < len(res); i++ {
			knowledgepoint := res[i]["knowledgepoint"].(string)
			count := question.Count(class, knowledgepoint)
			sliceCount = append(sliceCount, count)
		}
		JSONRES["data"] = res
		JSONRES["count"] = sliceCount
		c.Ctx.WriteString(utils.Obj2JS(2, JSONRES))
		return
	} else {
		c.Ctx.WriteString(utils.Obj2JS(4, "未查询到数据"))
		return
	}
}
func (c *TbankController) QuesType() {

	knowledgepoint := c.GetString(":knowledgepoint")
	fmt.Println(knowledgepoint)
	questype := &database.Question{}
	res, err := questype.QuesType(knowledgepoint)
	fmt.Println("c", res, "err:", err)

	if err == nil && len(res) > 0 {
		c.SetSession(SessQType, knowledgepoint)
		c.Data["knowledgepoint"] = knowledgepoint
	} else {
		c.Data["knowledgepoint"] = 0
	}
	c.TplName = "table-list.html"
}
func (c *TbankController) Single() {

	var knowledgepoint = c.GetSession(SessQType).(string)
	c.Data["knowledgepoint"] = knowledgepoint

	c.TplName = "single.html"
}
func (c *TbankController) GetPage() {

	var knowledgepoint = c.GetSession(SessQType).(string)
	c.Data["knowledgepoint"] = knowledgepoint
	questiontype := c.GetString("questiontype")
	getpage := &database.Question{}
	res, err := getpage.GetPage(questiontype, knowledgepoint)
	fmt.Println("c", res, "err:", err)
	count := getpage.GetCount(questiontype, knowledgepoint)
	if err == nil && len(res) > 0 {
		JSONRES := make(map[string]interface{})
		JSONRES["count"] = count
		JSONRES["data"] = res
		c.Ctx.WriteString(utils.Obj2JS(2, JSONRES))
		return
	} else {
		c.Ctx.WriteString(utils.Obj2JS(4, "未查询到数据"))
		return
	}

}
func (c *TbankController) GetPages() {

	var knowledgepoint = c.GetSession(SessQType).(string)
	c.Data["knowledgepoint"] = knowledgepoint
	pi, err1 := c.GetInt("pi")
	if err1 != nil {
		c.Ctx.WriteString(utils.Obj2JS(4, "参数(pageIndex)错误："+err1.Error()))
		return
	}
	if pi < 1 {
		pi = 1
	}
	ps, err2 := c.GetInt("ps")
	if err2 != nil {
		c.Ctx.WriteString(utils.Obj2JS(4, "参数(pageSize)错误："+err2.Error()))
		return
	}
	if ps < 1 {
		ps = 1
	}
	questiontype := c.GetString("questiontype")
	getpages := &database.Question{}
	res, err := getpages.GetPages(pi, ps, questiontype, knowledgepoint)
	fmt.Println("c", res, "err:", err)
	count := getpages.GetCount(questiontype, knowledgepoint)
	if err == nil && len(res) > 0 {
		JSONRES := make(map[string]interface{})
		JSONRES["count"] = count
		JSONRES["data"] = res
		c.Ctx.WriteString(utils.Obj2JS(2, JSONRES))
		return
	} else {
		c.Ctx.WriteString(utils.Obj2JS(4, "未查询到数据"))
		return
	}

}
