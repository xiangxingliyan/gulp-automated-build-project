! function(t) {
    function i(r) {
        if (a[r]) return a[r].exports;
        var e = a[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return t[r].call(e.exports, e, e.exports, i), e.loaded = !0, e.exports
    }
    var a = {};
    return i.m = t, i.c = a, i.p = "", i(0)
}([
    function(t, i) {
        ! function(t) {
            t.fn.wangfullpage = function() {
                var i = this,
                    a = ".mjfullpage-items",
                    r = ".mjPosition",
                    e = ".mjPosition-items",
                    n = {};
                i.each(function() {
                    var i = t(this);
                    i.attr("data-index", 0), i.find(a).eq(0).addClass("cur"), i.find(r).css({
                        marginLeft: -(i.find(r).height() + 20) / 2
                    })
                });
                var o = function() {
                    var o = t(window).height(),
                        s = t(window).scrollTop();
                    return i.each(function(i) {
                        var c = t(this),
                            d = c.offset().top,
                            l = c.find(a);
                        n[i] = l.length;
                        var f = d + c.height() - o,
                            h = s >= d && f >= s ? "fixed" : "absolute";
                        if (c.css({
                            height: o * n[i]
                        }), l.css({
                            height: o,
                            position: h,
                            width: "100%",
                            top: 0,
                            left: 0
                        }), 0 === c.find(r).length && (c.append('<div class="mjPosition"></div>'), l.each(function(t) {
                            c.find(r).append('<a class="mjPosition-items" href="javascript:;"><span>' + t + "</span></a>")
                        }), c.find(e).eq(0).addClass("cur")), "absolute" === h) c.find(r).hide(), s > d && l.last().css({
                            top: "auto",
                            bottom: 0,
                            opacity: 1
                        });
                        else {
                            c.find(r).show();
                            var p = (s - d) / (o / 1.5),
                                u = parseInt(p),
                                v = s >= d ? u : 0;
                            u >= n[i] && (v = n[i] - 1), c.attr("data-index") !== v && (c.find(e).removeClass("cur").eq(v).addClass("cur"), l.removeClass("cur").css({
                                opacity: 0
                            }).eq(v).addClass("cur").css({
                                opacity: 1
                            }), c.attr("data-index", v))
                        }
                    })
                };
                t(document).on("click", e, function() {
                    var i = t(this).parent(),
                        a = t(this).index(),
                        r = t(window).height() / 1.5,
                        e = i.parent().offset().top + 5;
                    t("body, html").animate({
                        scrollTop: e + a * r
                    }, 500)
                }), o(), t(window).resize(o), t(window).scroll(o)
            }
        }(jQuery), $(function() {
            $(".Js-mjfullpage").wangfullpage()
        })
    }
]);