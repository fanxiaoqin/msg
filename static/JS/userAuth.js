/**
 * Created by HUI on 2017/2/14.
 */

var hash = {
    'qq.com': 'http://mail.qq.com',
    'gmail.com': 'http://mail.google.com',
    'sina.com': 'http://mail.sina.com.cn',
    '163.com': 'http://mail.163.com',
    '126.com': 'http://mail.126.com',
    'yeah.net': 'http://www.yeah.net/',
    'sohu.com': 'http://mail.sohu.com/',
    'tom.com': 'http://mail.tom.com/',
    'sogou.com': 'http://mail.sogou.com/',
    '139.com': 'http://mail.10086.cn/',
    'hotmail.com': 'http://www.hotmail.com',
    'live.com': 'http://login.live.com/',
    'live.cn': 'http://login.live.cn/',
    'live.com.cn': 'http://login.live.com.cn',
    '189.com': 'http://webmail16.189.cn/webmail/',
    'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
    'yahoo.cn': 'http://mail.cn.yahoo.com/',
    'eyou.com': 'http://www.eyou.com/',
    '21cn.com': 'http://mail.21cn.com/',
    '188.com': 'http://www.188.com/',
    'foxmail.com': 'http://www.foxmail.com',
    'outlook.com': 'http://www.outlook.com'
};

/**
 * 未激活提示(弹窗)
 */
function gotoVemail() {
    var registerEmail = window.localStorage.registerEmail;
    layer.open({
        type: 1,
        title: false,
        area: ['516px', '502px'],
        closeBtn: 0,
        shadeClose: true,
        skin: 'yourclass',
        content: $('#activateEmail'),
        success: function(){
            $('#registerEmail').append(registerEmail);
        }
    });
}


/**
 * 清除输入信息
 */
function clearInput() {
    $('.register-box .layui-input').val('')
    $('.login-box .layui-input').val('')
}

/**
 * 清除所有错误信息
 */
function clearTips() {
    $('.error-tips').empty();
}

/**
 * 登陆弹窗
 */
function showLogin() {

    layui.use(['layer','element'], function() {
        const layer = layui.layer;
        layer.closeAll('page');
        layer.open({
            type: 1,
            title: false,
            area: ['360px', '350px'],
            closeBtn: 2,
            content: $('#loginbox'),
            cancel:function () {
                layer.closeAll('tips');
                $('.login-box #password').val('')
            },
            end:function () {
                layer.closeAll('tips');
                $('.login-box #password').val('')
            }
        });
    })
}

/**
 * 注册弹窗
 */
function showRegister() {
    layui.use(['layer','element'], function() {
        var layer = layui.layer;
        layer.closeAll('page');
        layer.open({
            type: 1,
            title: false,
            area: ['513px', '475px'],
            closeBtn: 2,
            content: $('#registerbox'),
            success:function () {
                $.get('/api/auth/captcha?type=REGISTER',function (data) {
                    $('#register-code').attr('src',data);
                })

            },
            cancel:clearInput(),
            end:clearInput()
        });
    })
}

/**
 * 加载注册验证码
 */
function reloadRegisterCode() {
    $.get('/api/auth/captcha?type=REGISTER', function (data) {
        $('#register-code').attr('src', data)
    })
}

/**
 * 登陆
 */
function login() {
    var userName = $('#userName');
    var password = $('#password');
    var userNameField =$('.login-phone')
    var passwordField =$('.login-password')
    if(!userName.val()){
        layer.tips('邮箱不能为空',userNameField);
    }
    else if(!password.val()){
        layer.tips('密码不能为空',passwordField);
    }
    else{
        var login_body = {};
        login_body.username = userName.val();
        login_body.password = password.val();
        $.ajax({
            url: '/api/auth/student/login',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(login_body),
            success: function () {
                layer.closeAll('page');
                window.location.reload()
            },
            error:function (data) {
                var err = (data.responseJSON.errors)[0].message;
                if(err==="email not verified"){
                    layer.closeAll('page');
                    window.location.href='/email/send-verify-email/?email='+login_body.username
                }
                else{
                    layer.tips(err,userNameField);
                }
            }
        })
    }
}

/**
 * 注册
 */
function register() {
    var email = $('#register-email');
    var password = $('#register-password');
    var passwordConfirm = $('#passwordConfirm');
    var registerCode = $('#vcode')
    var pass_regx = /^[\s\S]{6,16}$/;
    var email_regx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    var email_err = $('#email_err');
    var code_err =$('#code_err');
    var password_error =$('#password_err');
    var passwordConfirm_error=$('#passwordConfirm_err');

    if (!email.val()) {
        clearTips();
        email_err.text('邮箱不能为空')
    }
    else if (email.val().match(email_regx) === null) {
        clearTips();
        email_err.text('邮箱格式不正确')
    }
    else if (!password.val()) {
        clearTips();
        password_error.text('密码不能为空')
    }
    else if (password.val().match(pass_regx) === null) {
        clearTips();
        password_error.text('密码格式不正确')
    }
    else if (passwordConfirm.val() !== password.val()) {
        clearTips();
        passwordConfirm_error.text('两次输入的密码不一致')
    }
    else if (!registerCode.val()) {
        clearTips();
        code_err.text('验证码不能为空')
    }
    else {
        clearTips();
        var register_body = {};
        register_body.email = email.val();
        register_body.password = password.val();
        register_body.passwordConfirm = passwordConfirm.val();
        register_body.code = registerCode.val();
        $.ajax({
            url: '/api/auth/student/register',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(register_body),
            beforeSend:function () {

            },
            success: function () {
                registerSuccess(register_body.email);
            },
            error: function (data) {
                var err_message = (data.responseJSON.fields)[0].message;
                var err_field = (data.responseJSON.fields)[0].field;
                if (err_field === 'code') {
                    clearTips();
                    code_err.text(err_message)
                    reloadRegisterCode();
                }else if (err_field === 'password') {
                    clearTips();
                    password_error.text(err_message);
                    reloadRegisterCode();
                }else if (err_field === 'passwordConfirm') {
                    clearTips();
                    passwordConfirm_error.text(err_message);
                    reloadRegisterCode();
                }else if (err_field === 'email') {
                    clearTips();
                    if(err_message==="邮箱已经注册，尚未激活"){
                        var verify_href = '/email/send-verify-email?email='+$('#register-email').val();
                        email_err.append(err_message+'&nbsp;&nbsp;<a href="'+verify_href+'">去激活</a>');
                    }else{
                        email_err.text(err_message);
                    }
                    reloadRegisterCode();
                }
                else {
                    layer.msg("服务器出现了点意外请重试");
                }
            }
        })
    }


}

/**
 * 注册成功(弹窗)
 */
function registerSuccess(email) {
    layer.closeAll('page');
    layer.open({
        type: 1,
        title: false,
        area: ['516px', '502px'],
        closeBtn: 2,
        skin: 'yourclass',
        content: $('#registerSuccess'),
        success: function(){
            $('#registerEmail').text(email);
            var _mail = email.split('@')[1];
            for (var j in hash){
                if(j === _mail){
                    $('#goEmail').show();
                }
            }
        },
        cancel:function () {
            $('#registerEmail').text('');
        }
    });
}

/**
 * 邮箱跳转
 */
function vertify_now() {
    var _mail = $("#registerEmail").text().split('@')[1];
    console.log(_mail)
    for (var j in hash){
        if(j === _mail){
            window.open(hash[_mail]);
        }
    }

}

/**
 * 稍后验证
 */
function vertify_then() {
    layer.closeAll('page');
}

