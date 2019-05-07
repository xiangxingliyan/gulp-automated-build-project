$(function () {

    var homeBannerSwiper = new Swiper ('.home-banner', {
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        loop: true,
        pagination: {
            el: '.home-banner .swiper-pagination',
            clickable: true
        }
    });

    var suitSwiper =  new Swiper ('.suit-swiper', {
        autoplay: false,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        loop: false,
        on: {
            slideChange: function(){
                controlRightIconSlider(taste.elem.tasteItem,this.realIndex);
            }
        }
    });

    var throwingSwiper = new Swiper ('.throwing-swiper', {
        autoplay: false,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        loop: false,
        on: {
            slideChange: function(){
                controlRightIconSlider(throwing.elem.throwingItem,this.realIndex);
            }
        }
    })

    function controlRightIconSlider(elem,index) {
        elem.removeClass('active').eq(index).addClass('active');
    }

    var taste = {
        elem: {
            tasteItem: $('#J-suit-taste-items').find('li[data-taste-id]')
        },
        iconControlClickAction: function() {
            var _this = this;
            this.elem.tasteItem.on('click',function () {
                var index = $(this).data('tasteId');
                suitSwiper.slideTo(index);
            })
        },
        init: function () {
            this.iconControlClickAction();
        }
    };
    taste.init();

    var throwing = {
        elem: {
            throwingItem: $('#J-throwing-items').find('li[data-throwing-id]')
        },

        iconControlClickAction: function() {
            var _this = this;
            this.elem.throwingItem.on('click',function () {
                var index = $(this).data('throwingId');
                throwingSwiper.slideTo(index);
            })
        },
        init: function () {
            this.iconControlClickAction();
        }
    };
    throwing.init();


    /* jq实现锚点动画效果 */
    $('a[href*=#],area[href*=#]').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top - 90;
                $('html,body').stop().animate({
                        scrollTop: targetOffset
                    },
                    1000);
                return false;
            }
        }
    });

    //初始化skrollr插件
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