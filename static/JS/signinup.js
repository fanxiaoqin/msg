function showTipError(selectorText, selectorInput, text){
    closeTip();
    $(selectorText).fadeIn().text(text);
    $(selectorInput).addClass("input_error");
}

function showTipWarning(selectorText, selectorInput, text){
    if ($(selectorInput).hasClass("input_warning")){
        return;
    }
    closeTip();
    $(selectorText).fadeIn().text(text);
    $(selectorInput).addClass("input_warning");
}

function closeTip(){
    $(".input_error").removeClass("input_error");
    $(".input_warning").removeClass("input_warning");
    $(".tips__item__error").fadeOut(0);
    $(".tips__item__warning").fadeOut(0);
    $(".tips__item__success").fadeOut(0);
}

function showTipSuccess(selectorText, text){
    closeTip();
    $(selectorText).fadeIn().text(text);
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validatePassword(password){
    if (!password){
        return false;
    }
    if (password.trim().length < 8) {
        return false;
    }
    return true;
}

function swipeToBox(selector){
    var target = $(selector);
    if (target.length){
        $('.member__info__box').hide();
        target.show();
    }
    else{
        console.error("No element " + selector);
    }
}
