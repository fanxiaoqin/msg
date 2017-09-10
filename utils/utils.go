package utils

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"reflect"
	"time"
	"unsafe"
)

func GetPaging(pi, ps, tot int) string {
	if ps < 5 {
		ps = 5
	}
	tp := int((tot + ps - 1) / ps) //总页数 totalPage pn->pageNav
	if tp < 1 {
		tp = 1
	}
	var output string
	if tp > 1 {
		if pi != 1 { //处理首页
			output += fmt.Sprintf("<li><a class='_pn' href='javascript:void(0)' title='1'>first</a></li> ")
		}
		if pi > 1 { //处理上一页的
			output += fmt.Sprintf("<li><a class='_pn' href='javascript:void(0)' title='%d'>&laquo;</a></li> ", pi-1)
		}
		ci := 3                   //ci->centreIndex
		for i := 0; i <= 6; i++ { //一共最多显示6个页码，前面3个，后面3个
			if (pi+i-ci) >= 1 && (pi+i-ci) <= tp {
				if ci == i { //当前页处理
					output += fmt.Sprintf("<li class='am-disabled'><a class='cp' href='javascript:void(0)' title='%d'>%d</a></li> ", pi, pi)
				} else { //一般页处理
					output += fmt.Sprintf("<li><a class='_pn' href='javascript:void(0)' title='%d'>%d</a></li> ", pi+i-ci, pi+i-ci)
				}
			}
		}
		if pi < tp { //处理下一页的链接
			output += fmt.Sprintf("<li><a class='_pn' href='javascript:void(0)' title='%d'>&raquo;</a></li> ", pi+1)
		}
		if pi != tp {
			output += fmt.Sprintf("<li><a class='_pn' href='javascript:void(0)' title='%d'>last</a></li> ", tp)
		}
	}
	output += fmt.Sprintf("<li>%d/%d页(共%d条)</li>", pi, tp, tot)
	return output
}
func Obj2JS(status int, message interface{}) string { //test-time 0ns
	m := make(map[string]interface{})
	m["status"] = status
	m["message"] = message
	if bt, err := json.Marshal(m); err != nil {
		return Obj2JS(0, "")
	} else {
		return B2Str(bt)
	}
}

func Json2B(status int, message interface{}) []byte { //test-time 0ns
	m := make(map[string]interface{})
	m["status"] = status
	m["message"] = message
	if bt, err := json.Marshal(m); err != nil {
		return Json2B(0, "")
	} else {
		return bt
	}
}

func GetRandomString(lens int64) string { //test-time 0ns
	str := "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	bytes := []byte(str)
	result := []byte{}
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	var i int64
	for i = 0; i < lens; i++ {
		result = append(result, bytes[r.Intn(len(bytes))])
	}
	return string(result)
}

func B2Str(b []byte) (s string) {
	pbytes := (*reflect.SliceHeader)(unsafe.Pointer(&b))
	pstring := (*reflect.StringHeader)(unsafe.Pointer(&s))
	pstring.Data = pbytes.Data
	pstring.Len = pbytes.Len
	return
}

func Str2B(s string) (b []byte) {
	pbytes := (*reflect.SliceHeader)(unsafe.Pointer(&b))
	pstring := (*reflect.StringHeader)(unsafe.Pointer(&s))
	pbytes.Data = pstring.Data
	pbytes.Len = pstring.Len
	pbytes.Cap = pstring.Len
	return
}
