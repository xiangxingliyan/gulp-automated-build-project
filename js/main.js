$(function () {

    var homeBannerSwiper = new Swiper ('.home-banner', {

        autoplay: {
            delay: 4000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
        loop: true,
        speed: 1000,
        pagination: {
            el: '.home-banner .swiper-pagination',
            clickable: true
        }
    });

    var suitSwiper = new Swiper ('.suit-swiper', {
        autoplay: true,
        loop: true,
        speed: 1000,
        delay: 4000,
        pagination: {
            el: '.suit-swiper .swiper-pagination',
            clickable: true
        },
        on: {
            slideChange: function(){
                controlRightIconSlider(this.realIndex);
            }
        }
    });

    /* 控制右侧icon切换 */
    function controlRightIconSlider(index) {
        var $colorItem = $('.suit-info .color-list li');
        var $textItem = $('.suit-text').find('li');

        $colorItem.eq(index).addClass('active').siblings('li').removeClass('active');
        $textItem.eq(index).addClass('on').removeClass('hide').siblings('li').removeClass('on').addClass('hide');
        setTimeout(function () {
            $textItem.removeClass('hide');
        },1000);
    }

    $('.suit-info .color-list li').click(function () {
        var index = $(this).index();

        controlRightIconSlider(index);
        suitSwiper.slideToLoop(index);
    });



    /* jq实现锚点动画效果 */
    $('a[href*=#],area[href*=#]').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top - 90;
                $('html,body').animate({
                        scrollTop: targetOffset
                    },
                    1000);
                return false;
            }
        }
    });

    //初始化skrollr
    skrollr.init({
        constants:{
        },
        smoothScrollingDuration:500,
        smoothScrolling:true,
        forceHeight:false,
        edgeStrategy: 'set',
        mobileCheck: function() {
            //return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
            return false;
        },
        easing: {
            vibrate: function(p) {
                return Math.sin(p * 10 * Math.PI);
            },
            easeOutElasticBig: function(p) {
                return 56*(p*p*p*p*p) - 175*(p*p*p*p) + 200*(p*p*p) - 100*(p*p) + 20*p;
            }
        }
    });



});