function ajax_login(){
	var index=layer.open({
	  type: 2,
	  title: "用户登录（变色龙账号可登录）",
	  shadeClose: false,
	  shade: 0.5,
	  area: ['585px'],	  
	  content: 'http://www.jiaobu365.com/Login/iframe_login.html',
	 
	});
}
function ajax_register(){
	
	var index=layer.open({
	  type: 2,
	  title: "用户注册",
	  shadeClose: false,
	  shade: 0.5,
	  area: ['585px'],	  
	  content: 'http://www.jiaobu365.com/Login/iframe_register.html',
	 
	});
}
function ajax_login_out()
{
	window.location.href="http://www.jiaobu365.com/login/out.html"+"?forward="+encodeURIComponent(window.location.href);
}

$(function(){
	$(window).resize(function(){
		if($(".edit-maincont .positonDiv").hasClass('on'))
		{
			var s_top = $(".edit-maincont .positonDiv.on").offset().top-$(".resume-toolbar").height()-8;
			var s_wd = $(".edit-maincont .positonDiv.on").offset().left;
			var big_wd = $(".right-editbtn").offset().left-45;
			var toolbar = $(".resume-toolbar").width();
			if(s_wd+toolbar > big_wd)
			{
				s_wd = big_wd-toolbar;
			}
			$(".resume-toolbar").css({top:s_top,left:s_wd});
		}		
	})
	
	//header 头像
	$(".userinfo .cont").mouseover(function(){
		$(".top_user").show();
	});
	$(".userinfo .cont").mouseleave(function(){
		$(".top_user").hide();
	});
	
	$(".dengluadd").click(function(){
		$("#save_resume").click();
		ajax_login();
	});	
	$(".edit-maincont .positonDiv").live("click",function(){
		
		$(".resumebg").stop().fadeIn();
		$(".right-editbtn").stop().css("opacity","0");
		
		$(this).addClass("on").siblings().removeClass("on");
		if($(this).hasClass("msgDiv") || $(this).hasClass("skillDiv") || $(this).hasClass("hobbyDiv"))
		{
			return false;
		}
		var s_top = $(this).offset().top-$(".resume-toolbar").height()-8;
		var s_wd = $(this).offset().left;
		var big_wd = $(".right-editbtn").offset().left-45;
		var toolbar = $(".resume-toolbar").width();
		if(s_wd+toolbar > big_wd)
		{
			s_wd = big_wd-toolbar;
		}
		$(".resume-toolbar").show();
		$(".resume-toolbar").css({top:s_top,left:s_wd});
	})
	$(".resumebg").live("click",function(){
		$(".edit-maincont .positonDiv").removeClass("on");
		$(".resume-toolbar").hide();
		$(".right-editbtn").stop().css("opacity","1");
		$(this).stop().fadeOut();	
	})
	$(".edit-ltmb .contsmkd .zpart .edit").click(function(){
		var _href = $(this).data("href");
		resumeConfirm("编辑其它简历前，请记得先保存当前简历", function() {
			window.location.href=_href;	
		}, function() {
		});
	});
	$(".positonDiv .btnExp").live("click",function(event){
		layer.open({
		  type: 2,
		  title: false,
		  closeBtn: 0,
		  shadeClose: true,
		  shade: 0.8,
		  scrollbar: false,
		  area: ['694px', '80%'],
		  content: '/Home/Resume/exp_list'
		});
	})
	
	$(".resumebg1").live("click",function(){
		$(this).stop().fadeOut();	
		$(".experiencetk,.deliverytk").stop().fadeOut();
	})
	$(".left-editbtn .star").click(function(){
		$("<div class='resumebg2'></div>").appendTo("body");
		$(".edit-parts").animate({left:"0px"},200)
	})
	$(".left-editbtn .history").click(function(){
		if(flag==""){
			$("#save_resume").click();
			ajax_login();
			return false;
		}
		$("<div class='resumebg2'></div>").appendTo("body");
		$(".edit-ltmb").animate({left:"0px"},200)
	})
	
	$(".left-editbtn .delivery").click(function(){
		$(".resumebg1,.deliverytk").fadeIn();
	})
	$(".resumebg2").live('click',function(){
		$(".edit-parts,.edit-ltmb").animate({left:"-290px"},200);
		$(this).remove();
	})
	$(".lange li i").click(function(){
		$(".lange li i").removeClass("on");
		$(this).addClass("on");
	})

	$('.windbar').niceScroll({
	    cursorcolor: "#4cb3dd",// 光标颜色
	    cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
	    touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
	    cursorwidth: "5px", //像素光标的宽度
	    cursorborder: "0", // 	游标边框css定义
	    cursorborderradius: "0px",//以像素为光标边界半径
	    autohidemode: false //是否隐藏滚动条
	});
});
