var $ = jQuery;

// code tab
$(function() {
    $('body').on('click', '.code__show__tab', function() {
        $('.code__show__tab').removeClass('code__show-active');
        $(this).addClass('code__show-active');
        $('.code__show__item').hide().eq($(this).index()).show();
    });
});

// btn hover
$(function() {
    $('body').on('mouseover', '.btn__gradient', function() {
        $(this).addClass('btn__gradient__hover').removeClass('btn__gradient');
    }).on('mouseout', '.btn__gradient__hover', function() {
        $(this).addClass('btn__gradient').removeClass('btn__gradient__hover');
    });

    $('body').on('mouseover', '.btn__gradient__white', function() {
        $(this).addClass('btn__gradient__overturn').removeClass('btn__gradient__white');
    }).on('mouseout', '.btn__gradient__overturn', function() {
        $(this).addClass('btn__gradient__white').removeClass('btn__gradient__overturn');
    });
});

// mobile menu
$(function() {
    var menu = $('#js_mob_menu');
    $('#js_menu').click(function() {
        menu.toggleClass("header__mob");
        $('body').toggleClass('scroll__hide');
        $(this).toggleClass('icon__menu__close');
    });
});

// carousel text
function carouselText(parentEl, nodeEl, offsetHeight) {
    var carouselBox = parentEl,
        item = nodeEl,
        timer = null,
        offset = item.length,
        coefficient = 1;

    if (item.length > 1) {
        carouselBox.append(item.eq(0).clone());
    }

    var step = function() {
        // var progress = timestamp - start;
        // d.style.left = Math.min(progress / 10, 200) + "px";
        offset -= item.length;
        if (offset > -offsetHeight * coefficient) {
            requestAnimationFrame(step);
        }
        if (offset == item.length * -offsetHeight) {
            offset = item.length;
            coefficient = 0;
            requestAnimationFrame(step);
        }
        carouselBox.css("transform", "translateY(" + offset + "px)");
    }

    setInterval(function() {
        if (coefficient < item.length) {
            coefficient++;
            requestAnimationFrame(step);
        }
    }, 3000)

    requestAnimationFrame(step);
}
// carousel img
function carouselImg(option) {
    var container = option.container,
        data = option.data,
        className = option.className;

    function animationEndEvent() {
        container.get(0).addEventListener("webkitAnimationEnd", function() {
            container.removeClass(className);
        }, false);
    }

    if (data && data.length > 0) {
        var index = 0;
        container.addClass(className);
        animationEndEvent()
        setInterval(function() {
            if (index == data.length) {
                index = 0;
            }
            container.attr('src', data[index])
                .addClass(className);
            animationEndEvent();
            index++;
        }, 3000)
    } else {
        container.addClass(className);
    }
}
// select language
$('#js_select_language').click(function() {
    var lang = $(this).data('language');
    Cookies.set('language', lang, {
        expires: 1024
    });
    window.location.href = window.location.origin + '/' + lang + '/';
});

$(function() {
    //
    var tipsItem = $('.flow__tips__item'),
        hoverClassName = 'tips__item-active';
    $('.flow__tips__item').mouseover(function() {
            tipsItem.removeClass(hoverClassName);
            $(this).addClass(hoverClassName);
        })
        .mouseout(function() {
            $(this).removeClass(hoverClassName);
        });

    //
    var menu = $('#js_mob_hd');
    $('#js_menu').click(function() {
        menu.slideToggle();
        $('body').toggleClass('scroll__hide')
        $('body').toggleClass('scroll__hide')
    });
    var timerFlodMenu,
        flowMenuItems = $('.fold__menu__items');

    $('#js_fold_menu').mouseenter(function() {
            clearTimeout(timerFlodMenu);
            flowMenuItems.show();
        })
        .mouseleave(function() {
            timerFlodMenu = setTimeout(function() {
                flowMenuItems.hide()
            }, 600);
        });

    flowMenuItems.mouseenter(function() {
            clearTimeout(timerFlodMenu);
        })
        .mouseleave(function() {
            clearTimeout(timerFlodMenu);
            timerFlodMenu = setTimeout(function() {
                flowMenuItems.hide()
            }, 600);
        });

    var timerDonwloadList,
        flowDonwloaItems = $('#js_web_download');

    $('#js_web_download_btn').mouseenter(function() {
            clearTimeout(timerDonwloadList);
            flowDonwloaItems.show();
        })
        .mouseleave(function() {
            timerDonwloadList = setTimeout(function() {
                flowDonwloaItems.hide()
            }, 400);
        });

    flowDonwloaItems.mouseenter(function() {
            clearTimeout(timerDonwloadList);
        })
        .mouseleave(function() {
            clearTimeout(timerDonwloadList);
            timerDonwloadList = setTimeout(function() {
                flowDonwloaItems.hide()
            }, 400);
        });


    var nav = $('.header');
    $(window).on("scroll", function(e) {
        if ($(this).scrollTop() > 80) {
            nav.addClass("header-fix");
        } else {
            nav.removeClass("header-fix");
        }
    }).trigger('scroll');

});