package database

import (
	"fmt"
	"strconv"

	"github.com/astaxie/beego/orm"
)

type Question struct {
}

func (this Question) GetType() ([]orm.Params, error) {
	o := orm.NewOrm()
	var maps []orm.Params
	_, err := o.Raw("select id,num,name from doctype").Values(&maps, "id", "num", "name")
	return maps, err
}
func (this Question) TiKu(class string, top int) ([]orm.Params, error) {
	o := orm.NewOrm()
	var maps []orm.Params
	_, err := o.Raw("select  questionbank.questionid,doctype.name, questionbank.class,questionbank.knowledgepoint,questionbank.time from questionbank  LEFT JOIN doctype ON questionbank.class=doctype.num  where class=? group by  knowledgepoint desc limit 0,?", class, top).Values(&maps, "questionid", "name", "class", "knowledgepoint", "time")
	return maps, err
}
func (this Question) Count(class, knowledgepoint string) int {
	fmt.Println(class, knowledgepoint)
	o := orm.NewOrm()
	var res orm.ParamsList
	_, err := o.Raw("select Count(*) from questionbank WHERE class=? and knowledgepoint=?  ", class, knowledgepoint).ValuesFlat(&res)
	if err == nil {
		fmt.Println("err", err)
		count, errs := strconv.Atoi(res[0].(string))
		if errs == nil {
			return count
		}
		return 0
	}
	return 0
}
func (this Question) QuesType(knowledgepoint string) ([]orm.Params, error) {
	o := orm.NewOrm()
	var maps []orm.Params
	_, err := o.Raw("select questionid, class, questiontype, score, questioncontent,answers,optiona,optionb,optionc,optiond,correctAnswer,rightanswer,knowledgepoint,analysis,difficult,time from questionbank   where knowledgepoint=? ", knowledgepoint).Values(&maps, "questionid", "class", "questiontype", "score", "questioncontent", "answers", "optiona", "optionb", "optionc", "optiond", "correctAnswer", "rightanswer", "knowledgepoint", "analysis", "difficult", "time")
	fmt.Println("")
	return maps, err
}
func (this Question) GetPage(questiontype, knowledgepoint string) ([]orm.Params, error) {
	o := orm.NewOrm()
	var maps []orm.Params
	_, err := o.Raw("select questionid, class, questiontype, score, questioncontent,answers,optiona,optionb,optionc,optiond,correctAnswer,rightanswer,knowledgepoint,analysis,difficult,time from questionbank WHERE questiontype=? and knowledgepoint=? ", questiontype, knowledgepoint).Values(&maps, "questionid", "class", "questiontype", "score", "questioncontent", "answers", "optiona", "optionb", "optionc", "optiond", "correctAnswer", "rightanswer", "knowledgepoint", "analysis", "difficult", "time")
	return maps, err
}

func (this Question) GetPages(pi, ps int, questiontype, knowledgepoint string) ([]orm.Params, error) {
	o := orm.NewOrm()
	var maps []orm.Params
	_, err := o.Raw("select questionid, class, questiontype, score, questioncontent,answers,optiona,optionb,optionc,optiond,correctAnswer,rightanswer,knowledgepoint,analysis,difficult,time from questionbank WHERE questiontype=? and knowledgepoint=? order by questionid limit ?,?", questiontype, knowledgepoint, (pi-1)*ps, ps).Values(&maps, "questionid", "class", "questiontype", "score", "questioncontent", "answers", "optiona", "optionb", "optionc", "optiond", "correctAnswer", "rightanswer", "knowledgepoint", "analysis", "difficult", "time")
	return maps, err
}

func (this Question) GetCount(questiontype, knowledgepoint string) int {
	o := orm.NewOrm()
	var res orm.ParamsList
	_, err := o.Raw("select Count(*) from questionbank WHERE questiontype=? and knowledgepoint=?  ", questiontype, knowledgepoint).ValuesFlat(&res)
	if err == nil {
		count, errs := strconv.Atoi(res[0].(string))
		if errs == nil {
			return count
		}
		return 0
	}
	return 0
}
func (this Question) RandPage(questiontype string) ([]orm.Params, error) {
	o := orm.NewOrm()
	var maps []orm.Params
	_, err := o.Raw("select questionid, class, questiontype, score, questioncontent,answers,optiona,optionb,optionc,optiond,rightanswer,knowledgepoint,analysis,difficult,time from questionbank where questiontype=?  order by rand() limit 15", questiontype).Values(&maps, "questionid", "class", "questiontype", "score", "questioncontent", "answers", "optiona", "optionb", "optionc", "optiond", "correctAnswer", "rightanswer", "knowledgepoint", "analysis", "difficult", "time")
	return maps, err
}
