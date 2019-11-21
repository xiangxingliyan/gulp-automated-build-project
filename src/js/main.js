$(function () {

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
});