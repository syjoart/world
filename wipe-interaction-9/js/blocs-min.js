// Blocs.js Minified
function setUpSpecialNavs() {
    $(".navbar-toggler").click(function (t) {
        var a, e, o, i = $(this).closest("nav"), l = i.find("ul.site-navigation"), s = l.clone();
        l.parent().is(".fullscreen-nav, .sidebar-nav") && (t.stopPropagation(), l.parent().addClass("nav-special"), $(this).hasClass("selected-nav") ? ($(".close-special-menu").toggleClass("fadeOut fadeIn animDelay06 animSpeed02"), $(".blocsapp-special-menu blocsnav").removeClass("open"), $(".selected-nav").removeClass("selected-nav"), setTimeout(function () {
            $(".blocsapp-special-menu").remove(), $("body").removeClass("lock-scroll"), $(".nav-special").removeClass("nav-special")
        }, 300)) : ($(this).addClass("selected-nav"), i = i.attr("class").replace("navbar", "").replace("row", ""), l = l.parent().attr("class").replace("navbar-collapse", "").replace("collapse", ""), $(".content-tint").length = -1, $("body").append('<div class="content-tint"></div>'), s.insertBefore(".page-container").wrap('<div class="blocsapp-special-menu ' + i + '"><blocsnav class="' + l + '">'), $("blocsnav").prepend('<a class="close-special-menu animated fadeIn animDelay06"><div class="close-icon"></div></a>'), a = "fadeInRight", e = 0, o = 60, $(".blocsapp-special-menu blocsnav").hasClass("fullscreen-nav") ? (a = "fadeIn", o = 100) : $(".blocsapp-special-menu").hasClass("nav-invert") && (a = "fadeInLeft"), $(".blocsapp-special-menu blocsnav li").each(function () {
            $(this).parent().hasClass("dropdown-menu") ? $(this).addClass("animated fadeIn") : (e += o, $(this).attr("style", "animation-delay:" + e + "ms").addClass("animated " + a))
        }), setTimeout(function () {
            $(".blocsapp-special-menu blocsnav").addClass("open"), $(".content-tint").addClass("on"), $("body").addClass("lock-scroll")
        }, 10)))
    }), $("body").on("mousedown touchstart", ".content-tint, .close-special-menu", function (t) {
        $(".content-tint").removeClass("on"), $(".selected-nav").click(), setTimeout(function () {
            $(".content-tint").remove()
        }, 10)
    }).on("click", ".blocsapp-special-menu a", function (t) {
        $(t.target).closest(".dropdown-toggle").length || $(".close-special-menu").mousedown()
    })
}

function extraNavFuncs() {
    function a(t) {
        var a = t, e = t.offsetParent(".dropdown-menu");
        return t.next().hasClass("show") || t.parents(".dropdown-menu").first().find(".show").removeClass("show"), t.next(".dropdown-menu").toggleClass("show"), t.parent("li").toggleClass("show"), t.parents("li.nav-item.dropdown.show").on("hidden.bs.dropdown", function (t) {
            $(".dropdown-menu .show").removeClass("show")
        }), e.parent().hasClass("navbar-nav") || t.closest(".nav-special").length || a.next().css({
            top: a[0].offsetTop,
            left: e.outerWidth() - 4
        }), !1
    }

    $(".site-navigation a").click(function (t) {
        $(t.target).closest(".dropdown-toggle").length || $(".navbar-collapse").collapse("hide")
    }), $("a.dropdown-toggle").click(function (t) {
        $(this).parent().addClass("target-open-menu"), $(this).closest(".dropdown-menu").find(".dropdown.open").each(function (t) {
            $(this).hasClass("target-open-menu") || $(this).removeClass("open")
        }), $(".target-open-menu").removeClass("target-open-menu")
    }), $(".dropdown-menu a.dropdown-toggle").on("click", function (t) {
        return a($(this))
    }), $("body").on("click", ".dropdown-menu a.dropdown-toggle", function (t) {
        return a($(this))
    })
}

function scrollToTarget(t, a) {
    var e = "slow";
    0 == t ? t = $(a).closest(".bloc").height() : 1 == t ? t = 0 : 2 == t ? t = $(document).height() : (t = $(t).offset().top, $(".sticky-nav").length && (t -= $(".sticky-nav").outerHeight())), $(a).is("[data-scroll-speed]") && (e = $(a).attr("data-scroll-speed"), parseInt(e) && (e = parseInt(e))), $("html,body").animate({scrollTop: t}, e), $(".navbar-collapse").collapse("hide")
}

function animateWhenVisible() {
    hideAll(), inViewCheck(), $(window).scroll(function () {
        inViewCheck(), scrollToTopView(), stickyNavToggle()
    })
}

function setUpDropdownSubs() {
    $("ul.dropdown-menu [data-toggle=dropdown]").on("click", function (t) {
        t.preventDefault(), t.stopPropagation(), $(this).parent().siblings().removeClass("open"), $(this).parent().toggleClass("open");
        t = $(this).parent().children(".dropdown-menu");
        t.offset().left + t.width() > $(window).width() && t.addClass("dropmenu-flow-right")
    })
}

function stickyNavToggle() {
    var t, a, e, o, i;
    $(".sticky-nav").length && (a = (t = $(".sticky-nav")).offset().top, e = "sticky", o = $(".page-container"), (i = t.hasClass("fill-bloc-top-edge")) && (o = $(".fill-bloc-top-edge.sticky-nav").parent(), e = "sticky animated fadeInDown"), t.hasClass("sticky") && (a = t.attr("data-original-offset")), $(window).scrollTop() > a ? t.hasClass("sticky") || (t.addClass(e).attr("data-original-offset", a), a = t.height(), i && (t.css("background", getBlocBgColor(o)), a += parseInt(o.css("padding-top"))), o.css("padding-top", a)) : t.hasClass("sticky") && (t.removeClass(e).removeAttr("style"), o.removeAttr("style")))
}

function getBlocBgColor(t) {
    var a = t.css("background-color");
    return t.hasClass("b-parallax") && (a = t.find(".parallax").css("background-color")), "rgba(0, 0, 0, 0)" == a && (a = "#FFFFFF"), a
}

function hideAll() {
    $(".animated").each(function (t) {
        (!$("body").hasClass("mob-disable-anim") || 767 < $(window).width()) && $(this).removeClass("animated").addClass("hideMe")
    })
}

function inViewCheck() {
    $($(".hideMe").get().reverse()).each(function (t) {
        var a, e = jQuery(this), o = e.offset().top + e.height(), i = $(window).scrollTop() + $(window).height();
        e.height() > $(window).height() && (o = e.offset().top), o < i && (a = e.attr("class").replace("hideMe", "animated"), e.css("visibility", "hidden").removeAttr("class"), setTimeout(function () {
            e.attr("class", a).css("visibility", "visible")
        }, .01), e.on("webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd", function (t) {
            $(this).removeClass($(this).attr("data-appear-anim-style"))
        }))
    })
}

function scrollToTopView() {
    $(window).scrollTop() > $(window).height() / 3 ? $(".scrollToTop").hasClass("showScrollTop") || $(".scrollToTop").addClass("showScrollTop") : $(".scrollToTop").removeClass("showScrollTop")
}

function setUpVisibilityToggle() {
    $(document).on("click", "[data-toggle-visibility]", function (t) {
        t.preventDefault();
        var a, t = $(this).attr("data-toggle-visibility");

        function e(t) {
            t.is("img") ? t.toggle() : t.is(".row, .bloc-group") ? t.toggleClass("d-flex") : t.slideToggle(), reCalculateParallax()
        }

        -1 != t.indexOf(",") ? (a = t.split(","), $.each(a, function (t) {
            e($("#" + a[t]))
        })) : e($("#" + t))
    })
}

function setUpClassToggle() {
    $(document).on("click", "[data-toggle-class-target]", function (t) {
        t.preventDefault();
        var a, t = $(this).attr("data-toggle-class-target"), e = $(this).attr("data-toggle-class");
        e.length && (-1 != t.indexOf(",") ? (a = t.split(","), $.each(a, function (t) {
            $("#" + a[t]).toggleClass(e)
        })) : $("#" + t).toggleClass(e), reCalculateParallax())
    })
}

function setUpLightBox() {
    window.targetLightbox, $(document).on("click", "[data-lightbox]", function (t) {
        t.preventDefault(), targetLightbox = $(this);
        var a = targetLightbox.attr("data-lightbox"), e = targetLightbox.attr("data-autoplay"),
            o = '<p class="lightbox-caption">' + targetLightbox.attr("data-caption") + "</p>", i = "no-gallery-set",
            l = targetLightbox.attr("data-frame");
        targetLightbox.attr("data-gallery-id") && (i = targetLightbox.attr("data-gallery-id"));
        t = "";
        1 == e && (t = "autoplay");
        e = "";
        targetLightbox.find("img").hasClass("img-protected") && (e = "img-protected");
        o = $('<div id="lightbox-modal" class="modal fade"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content ' + l + ' blocs-lb-container"><button id="blocs-lightbox-close-btn" type="button" class="close-lightbox" data-dismiss="modal" aria-label="Close"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32"><path class="lightbox-close-icon" d="M4,4L28,28"/><path class="lightbox-close-icon" d="M28,4L4,28"/></svg></button><div class="modal-body"><a href="#" class="prev-lightbox" aria-label="prev"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32"><path class="lightbox-nav-icon lightbox-prev-icon" d="M22,2L9,16,22,30"/></svg></a><a href="#" class="next-lightbox" aria-label="next"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32"><path class="lightbox-nav-icon lightbox-next-icon" d="M10.344,2l13,14-13,14"/></svg></a><img id="lightbox-image" class="img-fluid mx-auto d-block ' + e + '" src="' + a + '"><div id="lightbox-video-container" class="embed-responsive embed-responsive-16by9"><video controls ' + t + ' class="embed-responsive-item"><source id="lightbox-video" src="' + a + '" type="video/mp4"></video></div>' + o + "</div></div></div></div>");
        $("body").append(o), "fullscreen-lb" == l && ($("#lightbox-modal").addClass("fullscreen-modal").append('<a class="close-full-screen-modal animated fadeIn" style="animation-delay:0.5s;" onclick="$(\'#lightbox-modal\').modal(\'hide\');"><div class="close-icon"></div></a>'), $("#blocs-lightbox-close-btn").remove()), ".mp4" == a.substring(a.length - 4) ? ($("#lightbox-image, .lightbox-caption").removeClass("d-block").hide(), $("#lightbox-video-container").show()) : ($("#lightbox-image,.lightbox-caption").addClass("d-block").show(), $("#lightbox-video-container").hide(), targetLightbox.attr("data-caption") || $(".lightbox-caption").removeClass("d-block").hide()), $("#lightbox-modal").modal("show"), "no-gallery-set" == i ? (0 == $("a[data-lightbox]").index(targetLightbox) && $(".prev-lightbox").hide(), $("a[data-lightbox]").index(targetLightbox) == $("a[data-lightbox]").length - 1 && $(".next-lightbox").hide()) : (0 == $('a[data-gallery-id="' + i + '"]').index(targetLightbox) && $(".prev-lightbox").hide(), $('a[data-gallery-id="' + i + '"]').index(targetLightbox) == $('a[data-gallery-id="' + i + '"]').length - 1 && $(".next-lightbox").hide()), addLightBoxSwipeSupport()
    }).on("hidden.bs.modal", "#lightbox-modal", function () {
        $("#lightbox-modal").remove()
    }), $(document).on("click", ".next-lightbox, .prev-lightbox", function (t) {
        t.preventDefault();
        var a = "no-gallery-set", e = $("a[data-lightbox]").index(targetLightbox), o = $("a[data-lightbox]").eq(e + 1);
        targetLightbox.attr("data-gallery-id") && (a = targetLightbox.attr("data-gallery-id"), e = $('a[data-gallery-id="' + a + '"]').index(targetLightbox), o = $('a[data-gallery-id="' + a + '"]').eq(e + 1)), $(this).hasClass("prev-lightbox") && (o = $('a[data-gallery-id="' + a + '"]').eq(e - 1), "no-gallery-set" == a && (o = $("a[data-lightbox]").eq(e - 1)));
        t = o.attr("data-lightbox");
        ".mp4" == t.substring(t.length - 4) ? (e = 1 == o.attr("data-autoplay") ? "autoplay" : "", $("#lightbox-image, .lightbox-caption").removeClass("d-block").hide(), $("#lightbox-video-container").show().html("<video controls " + e + ' class="embed-responsive-item"><source id="lightbox-video" src="' + t + '" type="video/mp4"></video>')) : ($("#lightbox-image").attr("src", t).addClass("d-block").show(), $("#lightbox-video-container").hide(), $(".lightbox-caption").removeClass("d-block").hide(), o.attr("data-caption") && $(".lightbox-caption").html(o.attr("data-caption")).show()), targetLightbox = o, $(".next-lightbox, .prev-lightbox").hide(), "no-gallery-set" == a ? ($("a[data-lightbox]").index(o) != $("a[data-lightbox]").length - 1 && $(".next-lightbox").show(), 0 < $("a[data-lightbox]").index(o) && $(".prev-lightbox").show()) : ($('a[data-gallery-id="' + a + '"]').index(o) != $('a[data-gallery-id="' + a + '"]').length - 1 && $(".next-lightbox").show(), 0 < $('a[data-gallery-id="' + a + '"]').index(o) && $(".prev-lightbox").show())
    })
}

function addKeyBoardSupport() {
    $(window).keydown(function (t) {
        37 == t.which ? $(".prev-lightbox").is(":visible") && $(".prev-lightbox").click() : 39 == t.which && $(".next-lightbox").is(":visible") && $(".next-lightbox").click()
    })
}

function addLightBoxSwipeSupport() {
    $("#lightbox-image").length && $("#lightbox-image").swipe({
        swipeLeft: function (t, a, e, o, i) {
            $(".next-lightbox").is(":visible") && $(".next-lightbox").click()
        }, swipeRight: function () {
            $(".prev-lightbox").is(":visible") && $(".prev-lightbox").click()
        }, threshold: 0
    })
}

function setUpImgProtection() {
    $("body").on("contextmenu", ".img-protected", function (t) {
        return !1
    }), $("body").on("mousedown", ".img-protected", function (t) {
        t.preventDefault()
    })
}

function reCalculateParallax() {
    var t;
    $(".b-parallax").length && ((t = $(".parallax__container .parallax")).css("height", "100%"), setTimeout(function () {
        calculateHeight(t, 3)
    }, 400))
}

$(function () {
    extraNavFuncs(), setUpSpecialNavs(), setUpDropdownSubs(), setUpLightBox(), setUpVisibilityToggle(), setUpClassToggle(), addKeyBoardSupport(), setUpImgProtection(), $('a[onclick^="scrollToTarget"]').click(function (t) {
        t.preventDefault()
    }), $(".nav-item [data-active-page]").addClass($(".nav-item [data-active-page]").attr("data-active-page")), $('[data-toggle="tooltip"]').tooltip()
}), $(window).on("load", function () {
    animateWhenVisible(), $("#page-loading-blocs-notifaction").addClass("preloader-complete")
});