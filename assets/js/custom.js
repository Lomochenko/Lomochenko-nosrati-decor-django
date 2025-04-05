// Passive Event Listeners Polyfill - کد زیر مشکل هشدارهای مربوط به event listener های غیر passive را حل می‌کند
(function() {
    // تست پشتیبانی مرورگر از passive event listeners
    var supportsPassive = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassive = true;
                return true;
            }
        });
        window.addEventListener('test', null, opts);
        window.removeEventListener('test', null, opts);
    } catch (e) {}

    // تغییر رفتار addEventListener برای پشتیبانی از jQuery قدیمی
    if (supportsPassive) {
        var originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            if (type === 'touchstart' || type === 'touchmove' || type === 'wheel' || type === 'mousewheel') {
                var opts = options;
                if (typeof options === 'object') {
                    opts = Object.assign({}, options);
                } else {
                    opts = {
                        capture: !!options,
                        passive: true
                    };
                }
                originalAddEventListener.call(this, type, listener, opts);
            } else {
                originalAddEventListener.call(this, type, listener, options);
            }
        };
    }
})();

function SliderProject() {
    $(".slider-project .swiper-container").each(function (e) {
        new Swiper(this, {
            slidesPerView: "auto",
            spaceBetween: 60,
            navigation: {
                nextEl: $(this).parents(".slider-project").find(".slider-button-next"),
                prevEl: $(this).parents(".slider-project").find(".slider-button-prev")
            },
            pagination: {
                el: $(this).parents(".slider-project").find(".swiper-pagination"),
                type: "fraction"
            }
        })
    })
}

function data_overlay() {
    $("[data-overlay-color]").each(function (e) {
        var t = $(this),
            n = dsnGrid.removeAttr(t, "data-overlay-color");
        t.addClass("dsn-overlay-" + e), $("body").append("<style>.dsn-overlay-" + e + "[data-overlay]:before{background: " + n + ";}</style>")
    })
}

function background() {
    $(".cover-bg, section , [data-image-src]").each(function () {
        var e = $(this).attr("data-image-src");
        void 0 !== e && !1 !== e && $(this).css("background-image", "url(" + e + ")")
    })
}

function slick_client(e) {
    var t = $(".client-curs");
    t.length > 0 && (t.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: !0,
        infinite: !0,
        nextArrow: '<i class="fas fa-angle-right"></i>',
        prevArrow: '<i class="fas fa-angle-left"></i>',
        cssEase: "cubic-bezier(.9, .03, .41, .49)",
        speed: 700
    }), e.width() > 991 && (dsnGrid.parallaxMoveElemnt(t.find(".fas.fa-angle-right"), 25), dsnGrid.parallaxMoveElemnt(t.find(".fas.fa-angle-left"), 25)))
}

function contactValidator() {
    var e = $("#contact-form");
    e < 1 || (e.validator(), e.on("submit", function (t) {
        if (!t.isDefaultPrevented()) {
            return $.ajax({
                type: "POST",
                url: "contact.php",
                data: $(this).serialize(),
                success: function (t) {
                    var n = "alert-" + t.type,
                        a = t.message,
                        i = '<div class="alert ' + n + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + a + "</div>";
                    n && a && (e.find(".messages").html(i), e[0].reset()), setTimeout(function () {
                        e.find(".messages").html("")
                    }, 3e3)
                },
                error: function (e) {
                    console.log(e)
                }
            }), !1
        }
    }))
}

function initMap() {
    var e = document.getElementById("map"),
        t = document.getElementById("map_api");
    if (null !== e) {
        if (null === t) {
            var n = document.createElement("script");
            n.type = "text/javascript", n.id = "map_api", n.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyA49hGCmzG22gXOfg784H0w8DtKEsSvq7k", document.body.appendChild(n)
        }
        setTimeout(function () {
            try {
                var t = $("#map"),
                    n = t.data("dsn-lat"),
                    a = t.data("dsn-len"),
                    i = t.data("dsn-zoom"),
                    o = new google.maps.LatLng(n, a),
                    s = new google.maps.Map(e, {
                        center: {
                            lat: n,
                            lng: a
                        },
                        zoom: i,
                        styles: [{
                            featureType: "all",
                            elementType: "labels.text.fill",
                            stylers: [{
                                saturation: 36
                            }, {
                                color: "#000000"
                            }, {
                                lightness: 40
                            }]
                        }, {
                            featureType: "all",
                            elementType: "labels.text.stroke",
                            stylers: [{
                                visibility: "on"
                            }, {
                                color: "#000000"
                            }, {
                                lightness: 16
                            }]
                        }, {
                            featureType: "all",
                            elementType: "labels.icon",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "administrative",
                            elementType: "geometry.fill",
                            stylers: [{
                                color: "#000000"
                            }, {
                                lightness: 20
                            }]
                        }, {
                            featureType: "administrative",
                            elementType: "geometry.stroke",
                            stylers: [{
                                color: "#000000"
                            }, {
                                lightness: 17
                            }, {
                                weight: 1.2
                            }]
                        }, {
                            featureType: "landscape",
                            elementType: "geometry",
                            stylers: [{
                                color: "#000000"
                            }, {
                                lightness: 20
                            }]
                        }, {
                            featureType: "poi",
                            elementType: "geometry",
                            stylers: [{
                                color: "#000000"
                            }, {
                                lightness: 21
                            }]
                        }, {
                            featureType: "road.highway",
                            elementType: "geometry.fill",
                            stylers: [{
                                color: "#000000"
                            }, {
                                lightness: 17
                            }]
                        }, {
                            featureType: "road.highway",
                            elementType: "geometry.stroke",
                            stylers: [{
                                color: "#000000"
                            }, {
                                lightness: 29
                            }, {
                                weight: .2
                            }]
                        }, {
                            featureType: "road.arterial",
                            elementType: "geometry",
                            stylers: [{
                                color: "#000000"
                            }, {
                                lightness: 18
                            }]
                        }, {
                            featureType: "road.local",
                            elementType: "geometry",
                            stylers: [{
                                color: "#000000"
                            }, {
                                lightness: 16
                            }]
                        }, {
                            featureType: "transit",
                            elementType: "geometry",
                            stylers: [{
                                color: "#000000"
                            }, {
                                lightness: 19
                            }]
                        }, {
                            featureType: "water",
                            elementType: "geometry",
                            stylers: [{
                                color: "#000000"
                            }, {
                                lightness: 17
                            }]
                        }]
                    });
                google.maps.event.addDomListener(window, "resize", function () {
                    var e = s.getCenter();
                    google.maps.event.trigger(s, "resize"), s.setCenter(e)
                });
                new google.maps.Marker({
                    position: o,
                    animation: google.maps.Animation.BOUNCE,
                    icon: "assets/img/map-marker.png",
                    title: "ASL",
                    map: s
                })
            } catch (e) {
                console.log(e)
            }
        }, 1e3)
    }
}

function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorHelper = document.querySelector('.cursor-helper');
    const cursorView = document.querySelector('.cursor-view');
    const cursorClose = document.querySelector('.cursor-close');
    const cursorLink = document.querySelector('.cursor-link');

    // بررسی وجود عناصر قبل از استفاده از آن‌ها
    if (!cursor || !cursorHelper || !cursorView || !cursorClose || !cursorLink) {
        return; // اگر هر کدام از عناصر موجود نباشند، از تابع خارج شو
    }

    // Add cursor effect for tt-accordion-item
    const accordionItems = document.querySelectorAll('.tt-accordion-item');
    if (accordionItems.length === 0) {
        return; // اگر هیچ آیتم آکاردئونی وجود نداشته باشد، از تابع خارج شو
    }

    accordionItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor && cursor.classList.add('cursor-hover');
            cursorHelper && cursorHelper.classList.add('cursor-hover');
            cursorView && cursorView.classList.add('cursor-hover');
            cursorClose && cursorClose.classList.add('cursor-hover');
            cursorLink && cursorLink.classList.add('cursor-hover');
        });

        item.addEventListener('mouseleave', () => {
            cursor && cursor.classList.remove('cursor-hover');
            cursorHelper && cursorHelper.classList.remove('cursor-hover');
            cursorView && cursorView.classList.remove('cursor-hover');
            cursorClose && cursorClose.classList.remove('cursor-hover');
            cursorLink && cursorLink.classList.remove('cursor-hover');
        });
    });
}

! function (e) {
    "use strict";

    function t(n) {
        data_overlay(),
            function () {
                if (e('[data-dsn-temp="light"]').length > 0) {
                    o.addClass("v-light");
                    let t = e('[data-dsn-header="project"]');
                    t.length <= 0 ? o.addClass("menu-light") : t.hasClass("header-hero-2") && o.addClass("menu-light")
                } else o.removeClass("v-light")
            }(), background(), initMap(),
            initCursor(),
            function () {
                const t = e(".filtering");
                var n = e(".gallery").isotope({
                    itemSelector: ".item",
                    transitionDuration: "0.5s"
                });
                t.on("click", "button", function () {
                    var t = e(this).attr("data-filter");
                    n.isotope({
                        filter: t
                    })
                }), t.on("click", "button", function () {
                    e(this).addClass("active").siblings().removeClass("active");
                    let t = i;
                    r.isScroller(!0) && (t = r.getScrollbar()), setTimeout(function () {
                        TweenLite.to(t, 1.5, {
                            scrollTo: n.offset().top - 150,
                            ease: Expo.easeInOut
                        })
                    }, 500)
                }), n.find("video").each(function () {
                    this.pause();
                    e(this).parents(".item").find("> a").on("mouseenter", function () {
                        e(this).parents(".item").find("video")[0].play()
                    }).on("mouseleave", function () {
                        e(this).parents(".item").find("video")[0].pause()
                    })
                })
            }(), SliderProject(), slick_client(i),
            function (n) {
                const r = "dsn-effect-animate",
                    l = '[data-dsn-ajax="img"]';
                var d = !0;
                return {
                    main_root: e("main.main-root"),
                    ajax_click: e("a.effect-ajax "),
                    isEffectAjax: function () {
                        return !o.hasClass("dsn-ajax")
                    },
                    ajaxLoad: function () {
                        var t = this;
                        n && this.ajax_click.off("click"), this.ajax_click.on("click", function (n) {
                            if (!t.isEffectAjax()) {
                                n.preventDefault();
                                var i = e(this),
                                    o = i.attr("href"),
                                    s = i.data("dsn-ajax");
                                o.indexOf("#") >= 0 || void 0 === o || d && (d = !1, a().locked(), t.ajaxLoaderElemnt(!0), "slider" === s ? t.ajaxSlider(i, o) : "list" === s ? t.ajaxList(i, o) : "next-project" === s ? t.ajaxNextProject(i, o) : "blog" === s ? t.ajaxBlog(i, o) : "next" === s ? t.ajaxNext(i, o) : "work" === s ? t.ajaxWork(i, o) : t.ajaxNormal(o))
                            }
                        });

                        // اضافه کردن قابلیت انتقال صفحه برای همه لینک‌های داخلی
                        e("a").not(".effect-ajax").not("[href^='#']").not("[href^='mailto:']").not("[href^='tel:']").not("[href^='javascript:']").not("[href^='https://']").not("[href^='http://']").on("click", function(n) {
                            if (!t.isEffectAjax()) {
                                var href = e(this).attr("href");
                                // بررسی اینکه آیا لینک داخلی است یا خیر
                                if (href && href.indexOf(window.location.hostname) !== -1 || !/^https?:\/\//.test(href)) {
                                    n.preventDefault();
                                    d && (d = !1, a().locked(), t.ajaxLoaderElemnt(!0), t.ajaxNormal(href));
                                }
                            }
                        });
                    },
                    ajaxSlider: function (t, n) {
                        let a = this,
                            i = t.parents(".slide-content").data("dsn-id"),
                            o = e('.dsn-slider .slide-item[data-dsn-id="' + i + '"] .cover-bg').first(),
                            s = n;
                        void 0 !== s && TweenMax.to(".project-metas , .nav-slider ,.footer-slid ,.view-all , .dsn-all-work ", .8, {
                            autoAlpha: 0,
                            scale: .8,
                            onComplete: function () {
                                o.removeClass("hidden"), o.find("img").addClass("hidden"), a.createElement(o, s, e(".dsn-root-slider"))
                            }
                        })
                    },
                    ajaxList: function (t, n) {
                        let a = this,
                            i = e(".nav-work-img-box img.dsn-active").first(),
                            s = n;
                        void 0 !== s && TweenMax.to(".nav-work-box .list-main", .8, {
                            autoAlpha: 0,
                            onComplete: function () {
                                a.createElement(i, s), setTimeout(function () {
                                    o.removeClass("dsn-show-work")
                                }, 1e3)
                            }
                        })
                    },
                    ajaxNextProject: function (e, t) {
                        let n = this,
                            a = e.parents(".next-project"),
                            i = a.find(".bg-image").first(),
                            o = t;
                        void 0 !== o && (TweenMax.to("footer", .8, {
                            autoAlpha: 0,
                            y: -50
                        }), TweenMax.staggerTo(a.find(".project-title").find("span , h5"), .8, {
                            autoAlpha: 0,
                            y: -50
                        }, .1, function () {
                            n.createElement(i, o, a.find(".bg"))
                        }))
                    },
                    ajaxBlog: function (e, t) {
                        let n = this,
                            a = e.parents(".post-list-item").find(".bg").first(),
                            i = t;
                        void 0 !== i && (TweenMax.to(a.find("img"), .8, {
                            scale: 1,
                            height: "100%",
                            top: 0,
                            y: "0%"
                        }), TweenMax.to(".post-list-item-content", .8, {
                            autoAlpha: 0,
                            scale: .8,
                            onComplete: function () {
                                n.createElement(a.find("img"), i)
                            }
                        }))
                    },
                    ajaxWork: function (e, t) {
                        let n = e.find("img");
                        n.removeClass("hidden");
                        let a = this;
                        TweenMax.to(n, .8, {
                            scale: 1,
                            height: "100%",
                            top: 0,
                            y: "0%",
                            onComplete: function () {
                                a.createElement(n, t)
                            }
                        })
                    },
                    createElement: function (n, i, s, d, c) {
                        let u = this,
                            f = e('<div class="active-ajax-e"></div>');
                        f.css({
                            position: "fixed",
                            width: "100%",
                            height: "100%",
                            top: 0,
                            left: 0,
                            zIndex: 999,
                            visibility: "hidden",
                            opacity: 0
                        }), f.css("background-color", o.css("background-color"));
                        var h = u.addElement(f, n, s);
                        o.append(f);
                        let g = 0,
                            m = .5;
                        TweenMax.to(f, 1, {
                            autoAlpha: 1,
                            ease: Power4.easeInOut,
                            onComplete: function () {
                                o.removeClass(r), u.loader(i, function (n, i, s) {
                                    var d = e(l);
                                    if (d.length <= 0) return TweenMax.to([f, h], 1, {
                                        width: 0,
                                        autoAlpha: 0,
                                        delay: 1,
                                        ease: Expo.easeIn,
                                        onStart: function () {
                                            a().unlocked(), t()
                                        },
                                        onComplete: function () {
                                            o.addClass(r), setTimeout(function () {
                                                f.remove()
                                            }, 500)
                                        }
                                    }), !1;
                                    var c = (d = d.first()).offset();
                                    void 0 === c && (c = {
                                        top: 0,
                                        left: 0
                                    }), g = .8, m = 1, TweenMax.to(h, 1, {
                                        top: c.top,
                                        left: c.left,
                                        width: d.width(),
                                        height: d.height(),
                                        objectFit: "cover",
                                        borderRadius: 0,
                                        onComplete: function () {
                                            TweenMax.to(f, m, {
                                                height: 0,
                                                onComplete: function () {
                                                    a().unlocked(), u.showAnimate()
                                                }
                                            }), TweenMax.to(h, m, {
                                                autoAlpha: 0,
                                                delay: g,
                                                onComplete: function () {
                                                    f.remove()
                                                }
                                            })
                                        }
                                    })
                                })
                            }
                        })
                    },
                    addElement: function (e, t, n) {
                        if (void 0 === t || t.length <= 0) return;
                        (void 0 === n || n.length <= 0) && (n = t);
                        let a = t.clone(),
                            i = n[0].getBoundingClientRect();
                        return void 0 === i && (i = {
                            left: 0,
                            top: 0
                        }), a.css({
                            position: "absolute",
                            display: "block",
                            transform: "",
                            transition: "",
                            objectFit: "cover"
                        }), a.css(dsnGrid.getBoundingClientRect(n[0])), e.append(a), a
                    },
                    ajaxNormal: function (t) {
                        var n = this,
                            s = e('<div class="modern-ajax-loader"></div>');

                        // افزودن لودر چرخشی مدرن
                        var loaderSvg = e('<div class="loader-circle"><svg viewBox="25 25 50 50"><circle cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>');

                        s.css({
                            position: "fixed",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(18, 18, 18, 0.9)",
                            backdropFilter: "blur(10px)",
                            zIndex: 900199,
                            opacity: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        });

                        s.append(loaderSvg);
                        o.append(s);

                        // افزودن استایل برای لودر
                        var style = e('<style>.modern-ajax-loader .loader-circle {width: 60px; height: 60px; position: relative;}'
                            + '.modern-ajax-loader .loader-circle svg {animation: loader-rotate 1.5s linear infinite; width: 100%; height: 100%;}'
                            + '.modern-ajax-loader .loader-circle circle {stroke: #fff; stroke-dasharray: 150, 200; stroke-dashoffset: -10; stroke-linecap: round; animation: loader-dash 1.2s ease-in-out infinite;}'
                            + '@keyframes loader-rotate {100% {transform: rotate(360deg);}}'
                            + '@keyframes loader-dash {0% {stroke-dasharray: 1, 200; stroke-dashoffset: 0;}'
                            + '50% {stroke-dasharray: 89, 200; stroke-dashoffset: -35px;}'
                            + '100% {stroke-dasharray: 89, 200; stroke-dashoffset: -125px;}}'
                            + '</style>');
                        o.append(style);

                        // شروع پیش‌بارگذاری صفحه جدید حتی قبل از نمایش کامل لودر
                        setTimeout(function() {
                            n.loader(t, function () {
                                dsnGrid.scrollTop(0, 1), a().unlocked()
                            });
                        }, 50);

                        // انیمیشن ظاهر شدن لودر - سریع‌تر شده
                        TweenMax.to(s, 0.4, {
                            opacity: 1,
                            ease: Power2.easeInOut
                        });
                    },
                    hideAnimate: function () {
                        TweenMax.set(e(s.animateTextAjax), {
                            autoAlpha: 0,
                            y: -50
                        })
                    },
                    showAnimate: function () {
                        TweenMax.staggerTo(e(s.animateTextAjax), 0.8, {
                            autoAlpha: 1,
                            y: 0
                        }, .15)
                    },
                    loader: function (t, n) {
                        var a = this;
                        o.removeClass("dsn-effect-animate"), this.main_root.load(t + " main.main-root > *", function (i, o, s) {
                            var r = e(this);
                            a.hideAnimate(), "error" !== o ? (a.ajaxTitle(t), history.pushState(null, null, t), setTimeout(function () {
                                a.animateAjaxEnd(), void 0 !== n && n(r, i, s), d = !0
                            }, 200)) : window.location = t
                        })
                    },
                    animateAjaxEnd: function () {
                        var n = this;
                        n.main_root.css("transform", "");
                        let a = e(".modern-ajax-loader");

                        // انیمیشن خروج لودر - سریع‌تر شده
                        TweenMax.to(a, 0.4, {
                            opacity: 0,
                            ease: Power2.easeInOut,
                            onComplete: function () {
                                a.remove();
                                e("style:contains('.modern-ajax-loader')").remove();
                                n.ajaxLoaderElemnt();
                                n.showAnimate();
                            }
                        });

                        t(!0);
                    },
                    ajaxNext: function (t, n) {
                        var a = e('.dsn-imgs[data-dsn-next="blog"]'),
                            i = this;
                        a.length <= 0 ? i.ajaxNormal(n) : (TweenMax.set(a, {
                            autoAlpha: 1,
                            zIndex: 99999999
                        }), TweenMax.to(a, 1, {
                            top: 0,
                            ease: Expo.easeInOut,
                            onComplete: function () {
                                e('[data-dsn-header="blog"]').css("width", "100%"), i.createElement(a, n)
                            }
                        }))
                    },
                    ajaxTitle: function (t) {
                        e("title").load(t + " title", "", function (t) {
                            document.title = e(this).text()
                        });
                        var n = e("#wpadminbar");
                        n.length > 0 && n.load(t + " #wpadminbar", "", function (t) {
                            n.html(e(this).html())
                        })
                    },
                    ajaxLoaderElemnt: function (e) {
                        e ? o.addClass("dsn-ajax-effect") : o.removeClass("dsn-ajax-effect")
                    }
                }
            }(n).ajaxLoad(),
            function (t) {
                function n() {
                    dsnGrid.elementHover(i, "a.link-pop , a > img", "cursor-view"), dsnGrid.elementHover(i, ".close-wind", "cursor-close"), dsnGrid.elementHover(i, "a:not(> img) , .dsn-button-sidebar,  button", "cursor-link")
                }
                const i = ".cursor";
                if (a().isMobiles()) return;
                if (void 0 !== t && !0 === t) return void n();
                if (e("body").hasClass("dsn-large-mobile")) return;
                dsnGrid.mouseMove(i), n()
            }(n), e(".client-see .slick-slider  ").slick({
                infinite: !0,
                slidesToShow: 1,
                arrows: !1,
                dots: !0,
                fade: !0,
                cssEase: "linear"
            }), e(' .our-news .slick-slider , .our-team .slick-slider , [data-dsn-col="2"] .slick-slider').slick({
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                autoplay: true,
                autoplaySpeed: 3000,
                pauseOnHover: true,
                cssEase: 'ease-out',
                speed: 800,
                fade: false,
                swipe: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            autoplaySpeed: 2500
                        }
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            autoplaySpeed: 2000
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            autoplaySpeed: 1800
                        }
                    }
                ]
            }), e('[data-dsn-col="3"] .slick-slider').slick({
                infinite: !0,
                slidesToShow: 3,
                arrows: !1,
                dots: !0,
                autoplay: !0,
                responsive: [{
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            }), e(".gallery-col .box-im .image-zoom").magnificPopup({
                delegate: "a",
                type: "image",
                closeOnContentClick: !1,
                closeBtnInside: !1,
                gallery: {
                    enabled: !0
                },
                zoom: {
                    enabled: !0,
                    duration: 300,
                    opener: function (e) {
                        return e.find("img")
                    }
                }
            }),
            function () {
                var t = e(".gallery-portfolio");
                if (t.length < 1) return;
                t.justifiedGallery({
                    rowHeight: 300,
                    margins: 15
                }), t.magnificPopup({
                    delegate: "a",
                    type: "image",
                    closeOnContentClick: !1,
                    closeBtnInside: !1,
                    mainClass: "mfp-with-zoom",
                    gallery: {
                        enabled: !0
                    },
                    zoom: {
                        enabled: !0,
                        duration: 300,
                        easing: "ease-in-out",
                        opener: function (e) {
                            return e.find("img")
                        }
                    },
                    callbacks: {
                        open: function () {
                            e("html").css({
                                margin: 0
                            })
                        },
                        close: function () { }
                    }
                })
            }(),
            $(".tt-accordion").each(function () {
                // اگر محتوای آکاردئون کلاس "is-open" را داشته باشد
                $(this).find(".tt-accordion-item").each(function () {
                    var $this = $(this);
                    if ($this.find(".tt-accordion-content").hasClass("is-open")) {
                        $this.addClass("active");
                    }
                });

                // کلیک روی آیتم آکاردئون
                $(this).find(".tt-accordion-heading").on("click", function () {
                    var $this = $(this);

                    if ($this.parents(".tt-accordion-item").hasClass("active")) {
                        // اگر آیتم فعال است، آن را ببند
                        $this.parents(".tt-accordion-item").removeClass("active");
                        $this.next(".tt-accordion-content").slideUp(350);
                    } else {
                        // اگر آیتم غیرفعال است، بقیه را ببند و این را باز کن
                        $this.parent().parent().find(".tt-accordion-item").removeClass("active");
                        $this.parent().parent().find(".tt-accordion-content").slideUp(350);
                        $this.parents(".tt-accordion-item").toggleClass("active");
                        $this.next(".tt-accordion-content").slideToggle(350);
                    }
                });
            })
            ,
            function () {
                const t = e(".view-all");
                if (t.length <= 0) return;
                t.on("click", function () {
                    o.toggleClass("dsn-show-work")
                });
                const n = e(".nav-work-box").find(".work-item"),
                    a = e(".nav-work-img-box");
                n.each(function (t) {
                    let n = e(this);
                    n.attr("data-dsn-id", t);
                    let i = n.find("img");
                    i.attr("data-dsn-id", t), n.hasClass("dsn-active") && i.addClass("dsn-active"), a.append(i)
                }), n.on("mouseenter", function () {
                    let t = function (e) {
                        let t = e.data("dsn-id");
                        return a.find('img[data-dsn-id="' + t + '"]')
                    }(e(this));
                    if (t.hasClass("dsn-active") || o.hasClass("dsn-ajax-effect")) return;
                    n.removeClass("dsn-active"), e(this).addClass("dsn-active");
                    let i = a.find(".dsn-active");
                    a.find("img").removeClass("dsn-active").removeClass("dsn-active-enter").removeClass("dsn-active-leve"), i.addClass("dsn-active-leve"), t.addClass("dsn-active dsn-active-enter")
                })
            }(),
            function () {
                const t = e(".dsn-slider"),
                    n = 1.2;
                return {
                    initSlider: function () {
                        const n = t.find(".slide-item"),
                            a = t.find(".dsn-slider-content");
                        n.each(function (t) {
                            e(this).attr("data-dsn-id", t);
                            let n = e(this).find(".slide-content");
                            n.attr("data-dsn-id", t), 0 === t && n.addClass("dsn-active dsn-active-cat"), a.append(n);
                            let i = n.find(".title-text-header-inner a");
                            dsnGrid.convertTextLine(i, i)
                        })
                    },
                    progress: function (e) {
                        e.on("progress", function () {
                            let e = this;
                            for (let t = 0; t < e.slides.length; t++) {
                                let n = e.slides[t].progress,
                                    a = .5 * e.width,
                                    i = n * a;
                                e.slides[t].querySelector(".image-bg").style.transform = "translateX(" + i + "px) "
                            }
                        })
                    },
                    slideChange: function (a) {
                        var i = this;
                        a.on("slideChange", function () {
                            let o = t.find(".dsn-slider-content .dsn-active"),
                                s = o.data("dsn-id");
                            let r = e(this.slides[this.activeIndex]).data("dsn-id");
                            if (s === r) return;
                            t.find('[data-dsn="video"] video').each(function () {
                                this.pause()
                            });
                            let l = e(this.slides[this.activeIndex]).find('[data-dsn="video"] video');
                            l.length > 0 && l[0].play();
                            let d = o.find(".dsn-chars-wrapper");
                            o.removeClass("dsn-active-cat");
                            let c = t.find('.dsn-slider-content [data-dsn-id="' + r + '"]'),
                                u = c.find(".dsn-chars-wrapper"),
                                f = s > r,
                                h = new TimelineLite;
                            h.staggerFromTo(dsnGrid.randomObjectArray(d, .3), .3, i.showText().title, i.hideText(f).title, .1, 0, function () {
                                t.find(".dsn-slider-content .slide-content").removeClass("dsn-active"), t.find(".dsn-slider-content .slide-content").removeClass("dsn-active-cat"), c.addClass("dsn-active"), c.addClass("dsn-active-cat")
                            }), h.staggerFromTo(dsnGrid.randomObjectArray(u, n), n, i.hideText(f).title, i.showText().title, .1, "-=.8")
                        })
                    },
                    showText: function () {
                        return {
                            title: {
                                autoAlpha: 1,
                                x: "0%",
                                scale: 1,
                                rotation: 0,
                                ease: Elastic.easeInOut,
                                yoyo: !0
                            },
                            subtitle: {
                                autoAlpha: 1,
                                y: "0%",
                                ease: Elastic.easeOut
                            }
                        }
                    },
                    hideText: function (e) {
                        let t = "-90%";
                        return e && (t = "90%"), {
                            title: {
                                autoAlpha: 0,
                                x: t,
                                rotation: 8,
                                scale: 1.2,
                                ease: Elastic.easeOut,
                                yoyo: !0
                            },
                            subtitle: {
                                autoAlpha: 0,
                                y: t,
                                ease: Elastic.easeOut
                            }
                        }
                    },
                    touchStart: function (e) {
                        e.on("touchStart", function () {
                            let e = this;
                            for (let t = 0; t < e.slides.length; t++) e.slides[t].style.transition = ""
                        })
                    },
                    setTransition: function (e) {
                        e.on("setTransition", function (e) {
                            let t = this;
                            for (let n = 0; n < t.slides.length; n++) t.slides[n].style.transition = e + "ms", t.slides[n].querySelector(".image-bg").style.transition = e + "ms"
                        })
                    },
                    swiperObject: function () {
                        return new Swiper(".dsn-slider .slide-inner", {
                            speed: 1500,
                            allowTouchMove: !0,
                            resistanceRatio: .65,
                            navigation: {
                                nextEl: ".dsn-slider .control-nav .next-container",
                                prevEl: ".dsn-slider .control-nav .prev-container"
                            },
                            pagination: {
                                el: ".dsn-slider .footer-slid .control-num span",
                                type: "custom",
                                clickable: !0,
                                renderCustom: function (e, t, n) {
                                    return dsnGrid.numberText(t)
                                }
                            },
                            on: {
                                init: function () {
                                    this.autoplay.stop(), t.find('[data-dsn="video"] video').each(function () {
                                        this.pause()
                                    })
                                },
                                imagesReady: function () {
                                    let t = e(this.slides[this.activeIndex]).find('[data-dsn="video"] video');
                                    t.length > 0 && t[0].play()
                                }
                            }
                        })
                    },
                    run: function () {
                        if (t.length <= 0) return;
                        this.initSlider();
                        var n = this.swiperObject();
                        if (this.progress(n), this.touchStart(n), this.setTransition(n), this.slideChange(n), e(".nav-slider").length <= 0) return;
                        let a = new Swiper(".nav-slider", {
                            speed: 1500,
                            slidesPerView: 3,
                            centeredSlides: !0,
                            touchRatio: .2,
                            slideToClickedSlide: !0,
                            direction: "vertical",
                            resistanceRatio: .65
                        });
                        n.controller.control = a, a.controller.control = n
                    }
                }
            }().run(), e("a.vid").YouTubePopUp(), contactValidator()
    }

    function n() {
        i.off("scroll");
        let t = e(".dsn-nav-bar");
        t.removeClass("header-stickytop");
        let n = 0;
        var a = e(".wrapper").offset(),
            o = e(".header-single-post .container").offset(),
            s = e(".post-full-content").offset(),
            l = 0;
        void 0 !== o ? a = o : a.top <= 70 && (a = s), r.getListener(function (e) {
            n = "scroll" === e.type ? i.scrollTop() : e.offset.y;
            let o = 70;
            void 0 !== a && (o = a.top - 100), n > o ? l < n ? t.addClass("nav-bg").addClass("hide-nave") : t.removeClass("hide-nave") : t.removeClass("nav-bg").removeClass("hide-nave"), l = n
        })
    }

    function a() {
        const t = window.Scrollbar;
        var a = document.querySelector("#dsn-scrollbar");
        return {
            isMobile: function () {
                return !!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/MSIE 9/i))
            },
            isMobiles: function () {
                return !!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/MSIE 9/i) || i.width() <= 991)
            },
            isScroller: function (e) {
                e && (a = document.querySelector("#dsn-scrollbar"));
                let t = !o.hasClass("dsn-effect-scroll") || this.isMobile() || null === a;
                return t && e && o.addClass("dsn-mobile"), !t
            },
            locked: function () {
                if (o.addClass("locked-scroll"), this.isScroller()) {
                    let e = this.getScrollbar();
                    void 0 !== e && e.destroy()
                }
            },
            unlocked: function () {
                o.removeClass("locked-scroll"), this.start(), n(), l.allInt(), dsnGrid.progressCircle(r)
            },
            getScrollbar: function (e) {
                return void 0 === e ? t.get(a) : t.get(document.querySelector(e))
            },
            getListener: function (e) {
                if (void 0 !== e) {
                    var t = this;
                    t.isScroller(!0) ? t.getScrollbar().addListener(e) : i.on("scroll", e)
                }
            },
            start: function () {
                if (dsnGrid.scrollTop(0, 1), e(".scroll-to").on("click", function (t) {
                    t.preventDefault();
                    let n = i;
                    r.isScroller(!0) && (n = r.getScrollbar()), TweenLite.to(n, 1.5, {
                        scrollTo: e(".wrapper").offset().top,
                        ease: Expo.easeInOut
                    })
                }), !this.isScroller(!0)) return;
                let n = .05;
                this.isMobiles() && (n = .02), t.init(a, {
                    damping: n
                }), this.workScroll()
            },
            sliderScroll: function () {
                t.init(document.querySelector(".slider .main-slider .slider-nav-list"), {
                    damping: .05
                })
            },
            menuScroll: function () {
                t.init(document.querySelector(".nav__content"), {
                    damping: .05
                })
            },
            commentScroll: function () {
                const e = document.querySelector(".comment-modal .comment-modal-container");
                null !== e && t.init(e, {
                    damping: .05
                })
            },
            sidebarScroll: function () {
                const e = document.querySelector(".dsn-sidebar .sidebar-single");
                null !== e && t.init(e, {
                    damping: .05
                })
            },
            workScroll: function () {
                const e = document.querySelector(".dsn-all-work .dsn-work-scrollbar");
                null !== e && t.init(e, {
                    damping: .05
                })
            }
        }
    }
    const i = e(window),
        o = e("body"),
        s = {
            animateTextAjax: '.headefr-fexid .project-title .title-text-header .cat ,[data-dsn-animate="ajax"] , footer, .next-project , .root-project'
        };
    (navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/MSIE 9/i)) && e(".cursor").css("display", "none"),

    // پیش‌نمایشگر ساده‌شده برای عملکرد بهتر
    function () {
        const simplePreloader = {
            $body: e('body'),
            $preloader: null,
            $logo: null,
            $counter: null,
            $progressBar: null,
            progress: 0,
            timeouts: [],

            init: function() {
                // ساخت عناصر پیش‌نمایشگر
                this.createElements();
                // شروع لودر
                this.start();

                // جلوگیری از اسکرول صفحه در زمان نمایش پیش‌نمایشگر
                this.$body.css('overflow', 'hidden');
            },

            createElements: function() {
                // ساخت کانتینر اصلی - ساده‌تر برای عملکرد بهتر
                this.$preloader = e('<div class="simple-preloader"></div>');

                // لوگو و عنوان ساده‌تر
                this.$logo = e(`
                    <div class="preloader-logo">
                        <h1>نصرتی دکور</h1>
                        <h2>INTERIOR DESIGN</h2>
                    </div>
                `);

                // شمارنده درصد
                this.$counter = e('<div class="preloader-counter">0</div>');

                // نوار پیشرفت ساده‌تر
                this.$progressBar = e(`
                    <div class="preloader-progress-bar">
                        <div class="preloader-progress-track">
                            <div class="preloader-progress-fill"></div>
                        </div>
                    </div>
                `);

                // نوار پیشرفت
                this.$progressBar = e(`
                    <div class="preloader-progress-bar">
                        <div class="preloader-progress-track">
                            <div class="preloader-progress-fill"></div>
                        </div>
                    </div>
                `);

                // افزودن عناصر به DOM
                this.$preloader.append(this.$scene);
                this.$preloader.append(this.$logo);
                this.$preloader.append(this.$counter);
                this.$preloader.append(this.$progressBar);

                // افزودن استایل‌های مورد نیاز
                this.addStyles();

                // افزودن به بدنه سند
                this.$body.prepend(this.$preloader);
            },

            addStyles: function() {
                // اضافه کردن استایل‌ها به صورت داینامیک
                const style = e(`
                <style>
                    .luxury-preloader {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: #0F0F0F;
                        z-index: 9999999;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        overflow: hidden;
                    }

                    .preloader-scene {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1;
                    }

                    .preloader-decor-element {
                        position: absolute;
                        opacity: 0;
                    }

                    .vertical-line {
                        width: 1px;
                        height: 0;
                        background-color: rgba(220, 215, 201, 0.2);
                        animation: lineGrow 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                    }

                    .preloader-logo {
                        position: relative;
                        z-index: 2;
                        text-align: center;
                        opacity: 0;
                        transform: translateY(20px);
                        animation: fadeInUp 1s cubic-bezier(0.19, 1, 0.22, 1) 0.5s forwards;
                    }

                    .preloader-logo h1 {
                        font-size: 48px;
                        font-weight: 300;
                        letter-spacing: 4px;
                        color: #DCD7C9;
                        margin-bottom: 10px;
                    }

                    .preloader-logo h2 {
                        font-size: 14px;
                        letter-spacing: 8px;
                        color: rgba(220, 215, 201, 0.7);
                        text-transform: uppercase;
                    }

                    .preloader-counter {
                        position: relative;
                        z-index: 2;
                        font-size: 60px;
                        font-weight: 200;
                        color: #DCD7C9;
                        margin-top: 40px;
                        opacity: 0;
                        transform: translateY(20px);
                        animation: fadeInUp 1s cubic-bezier(0.19, 1, 0.22, 1) 0.7s forwards;
                    }

                    .preloader-progress-bar {
                        position: relative;
                        z-index: 2;
                        width: 200px;
                        margin-top: 20px;
                        opacity: 0;
                        transform: translateY(20px);
                        animation: fadeInUp 1s cubic-bezier(0.19, 1, 0.22, 1) 0.9s forwards;
                    }

                    .preloader-progress-track {
                        width: 100%;
                        height: 1px;
                        background-color: rgba(220, 215, 201, 0.3);
                    }

                    .preloader-progress-fill {
                        width: 0%;
                        height: 1px;
                        background-color: #DCD7C9;
                        transition: width 0.2s ease-out;
                    }

                    @keyframes lineGrow {
                        0% {
                            height: 0;
                            opacity: 0;
                        }
                        20% {
                            opacity: 1;
                        }
                        100% {
                            height: 80%;
                            opacity: 1;
                        }
                    }

                    @keyframes fadeInUp {
                        0% {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes fadeOut {
                        0% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                        100% {
                            opacity: 0;
                            transform: translateY(-50px);
                        }
                    }
                </style>
                `);

                e('head').append(style);
            },

            start: function() {
                // مقدار اولیه
                this.progress = 0;
                this.$counter.text('0');
                this.$progressBar.find('.preloader-progress-fill').css('width', '0%');

                // شبیه‌سازی پیشرفت لودینگ
                const simulateLoading = () => {
                    // افزایش پیشرفت به شکل طبیعی
                    if (this.progress < 99) {
                        // پیشرفت با سرعت متغیر
                        if (this.progress < 30) {
                            // سریع در ابتدا
                            this.progress += Math.random() * 2.5;
                        } else if (this.progress < 60) {
                            // کند در میانه
                            this.progress += Math.random() * 1.2;
                        } else if (this.progress < 95) {
                            // بسیار کند در انتها
                            this.progress += Math.random() * 0.4;
                        }

                        // آپدیت عناصر ظاهری
                        const progressInt = Math.floor(this.progress);
                        this.$counter.text(progressInt);
                        this.$progressBar.find('.preloader-progress-fill').css('width', progressInt + '%');

                        // ادامه شبیه‌سازی
                        const delay = 80 + Math.random() * 70;
                        const timeout = setTimeout(simulateLoading, delay);
                        this.timeouts.push(timeout);
                    }
                };

                // شروع شبیه‌سازی
                simulateLoading();

                // وقتی صفحه کاملا لود شد، پیش‌نمایشگر را مخفی کن
                i.on('load', () => {
                    // پاکسازی تایمرها
                    this.timeouts.forEach(timeout => clearTimeout(timeout));

                    // تکمیل پیشرفت
                    this.$counter.text('100');
                    this.$progressBar.find('.preloader-progress-fill').css('width', '100%');

                    // کمی تاخیر برای نمایش 100%
                    setTimeout(() => {
                        // انیمیشن خروج عناصر با ترتیب معکوس
                        this.$counter.css({
                            'animation': 'fadeOut 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards'
                        });

                        setTimeout(() => {
                            this.$progressBar.css({
                                'animation': 'fadeOut 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards'
                            });
                        }, 100);

                        setTimeout(() => {
                            this.$logo.css({
                                'animation': 'fadeOut 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards'
                            });
                        }, 200);

                        // اسلاید آپ کل پیش‌نمایشگر
                        setTimeout(() => {
                            this.$preloader.css({
                                'transform': 'translateY(-100%)',
                                'transition': 'transform 1s cubic-bezier(0.7, 0, 0.3, 1)'
                            });

                            // فعال کردن اسکرول پس از مخفی شدن
                            setTimeout(() => {
                                this.$body.css('overflow', '');

                                // حذف از DOM پس از اتمام انیمیشن
                                setTimeout(() => {
                                    this.$preloader.remove();
                                }, 300);
                            }, 800);
                        }, 400);
                    }, 600);
                });
            }
        };

        // راه‌اندازی پیش‌نمایشگر لوکس
        e(document).ready(() => {
            luxuryPreloader.init();
        });
    }(),

        function () {
            var t = e(".menu-icon");
            e(".site-header .custom-drop-down > a").on("click", function () {
                return !1
            }), i.on("load", function () {
                const n = e(".site-header nav > ul");
                if (n.length <= 0) return;
                let a = n[0].outerHTML;
                (a = e(a)).attr("class", "nav__list"), a.find("li.custom-drop-down").attr("class", "nav__list-dropdown"), a.find("li").addClass("nav__list-item");
                let i = e(".header-top .nav .nav__content");
                void 0 !== i && i.prepend(a), t.on("click", function () {
                    o.toggleClass("nav-active")
                }), e(".nav__list-item:not(.nav__list-dropdown) ").on("click", function () {
                    o.removeClass("nav-active")
                }), e(".nav__list-dropdown > a").on("click", function (t) {
                    t.preventDefault();
                    var n = e(this).parent(),
                        a = n.find("ul").css("display");
                    e(".nav__list-dropdown").find("ul").slideUp("slow"), "block" !== a && n.find("ul").slideDown("slow")
                })
            }), i.on("scroll", function () {
                var t = i.scrollTop(),
                    n = e(".site-header , .header-top"),
                    a = e(".page-content").offset(),
                    o = 70;
                void 0 !== a && (o = a.top), t > o ? (n.addClass("header-stickytop"), e(".sections").addClass("body-pt")) : (n.removeClass("header-stickytop"), e("body").css("paddingTop", 0))
            });
            var n = e(".header-top .header-container .menu-icon .text-menu");
            if (!(n.length <= 0)) {
                var a = n.find(".text-button"),
                    s = n.find(".text-open"),
                    r = n.find(".text-close");
                dsnGrid.convertTextWord(a, a, !0), dsnGrid.convertTextWord(s, s, !0), dsnGrid.convertTextWord(r, r, !0)
            }
        }();
    var r = a(),
        l = function () {
            var t = new ScrollMagic.Controller;
            const n = '[data-dsn-header="project"]',
                a = '[data-dsn-footer="project"]';
            return {
                clearControl: function () {
                    t = new ScrollMagic.Controller
                },
                isElemntId: function (e) {
                    return null !== document.getElementById(e)
                },
                headerProject: function () {
                    if (e(n).length <= 0) return !1;
                    let a = e("#dsn-hero-parallax-img"),
                        i = e("#dsn-hero-parallax-title"),
                        s = e("#dsn-hero-parallax-fill-title"),
                        r = e("#descover-holder"),
                        l = 1.2;
                    a.hasClass("parallax-move-element") && dsnGrid.parallaxMoveElemnt({
                        target: e(n),
                        element: a.find(".cover-bg")
                    }, 5, 1);
                    var d = new TimelineMax;
                    if (a.length > 0) {
                        let e = a.hasClass("has-top-bottom") ? 1 : 1.08;
                        d.to(a, 1, {
                            force3D: !0,
                            y: "30%",
                            scale: e
                        }, 0)
                    }
                    if (i.length > 0 && (i.hasClass("project-title") && (l = 1), d.to(i, .8, {
                        force3D: !0,
                        top: "30%",
                        autoAlpha: 0,
                        scale: l
                    }, 0)), s.length > 0 && d.to(s, 1, {
                        force3D: !0,
                        height: 80
                    }, 0).to("#dsn-hero-parallax-fill-title h1", 1, {
                        force3D: !0,
                        top: 0
                    }, 0), r.length > 0 && d.to(r, .8, {
                        force3D: !0,
                        bottom: "-10%",
                        autoAlpha: 0
                    }, 0), d._totalDuration <= 0) return !1;
                    var c = new ScrollMagic.Scene({
                        triggerElement: n,
                        triggerHook: 0,
                        duration: "100%"
                    }).setTween(d).addTo(t);
                    let u = a.find("video");
                    return (u.length > 0 || o.hasClass("v-light")) && (c.on("enter", function () {
                        u.length > 0 && u.get(0).play(), o.hasClass("v-light") && !e(n).hasClass("header-hero-2") && o.removeClass("menu-light")
                    }), c.on("leave", function () {
                        u.length > 0 && u.get(0).pause(), o.hasClass("v-light") && !e(n).hasClass("header-hero-2") && o.addClass("menu-light")
                    })), c
                },
                nextProject: function () {
                    let n = e("#dsn-next-parallax-img"),
                        i = e("#dsn-next-parallax-title"),
                        s = !(n.length <= 0) && new ScrollMagic.Scene({
                            triggerElement: a,
                            triggerHook: 1,
                            duration: "100%"
                        }).setTween(TweenMax.to(n, 1, {
                            force3D: !0,
                            y: "30%",
                            scale: 1
                        }, 0)).addTo(t),
                        l = !(i.length <= 0) && new ScrollMagic.Scene({
                            triggerElement: a,
                            triggerHook: .5,
                            duration: "55%"
                        }).setTween(TweenMax.to(i, 1, {
                            force3D: !0,
                            top: "0%",
                            opacity: 1,
                            ease: Power0.easeNone
                        }, 0)).addTo(t);
                    r.getListener(function (e) {
                        !1 !== s && s.refresh(), !1 !== l && l.refresh()
                    }), !1 !== l && o.hasClass("v-light") && l.on("progress", function (e) {
                        e.progress > .8 ? o.removeClass("menu-light") : o.addClass("menu-light")
                    })
                },
                parallaxImg: function () {
                    e('[data-dsn-grid="move-up"]').each(function () {
                        let n = e(this);
                        n.attr("data-dsn-grid", "moveUp");
                        let a = n.find("img:not(.hidden) , video"),
                            i = dsnGrid.getUndefinedVal(n.data("dsn-triggerhook"), 1),
                            o = dsnGrid.getUndefinedVal(n.data("dsn-duration"), 1 !== i ? "100%" : "200%");
                        if (a.length > 0) {
                            var s;
                            if (a.hasClass("has-top-bottom")) {
                                let e = dsnGrid.getUndefinedVal(a.data("dsn-move"), "15%");
                                s = TweenMax.to(a, .8, {
                                    force3D: !0,
                                    y: e,
                                    ease: Power0.easeNone
                                })
                            } else {
                                let e = dsnGrid.getUndefinedVal(a.data("dsn-y"), "10%"),
                                    t = dsnGrid.getUndefinedVal(a.data("dsn-scale"), 1.1);
                                1 !== i ? (a.css("top", 0), s = TweenMax.to(a, 2, {
                                    force3D: !0,
                                    scale: t,
                                    y: e
                                })) : s = TweenMax.to(a, 1, {
                                    force3D: !0,
                                    scale: t,
                                    y: e,
                                    ease: Power0.easeNone
                                })
                            }
                            var l = new ScrollMagic.Scene({
                                triggerElement: this,
                                triggerHook: i,
                                duration: o
                            }).setTween(s).addTo(t);
                            r.getListener(function () {
                                l.refresh()
                            })
                        }
                    })
                },
                moveSection: function () {
                    e('[data-dsn-grid="move-section"]').each(function () {
                        let n = e(this);
                        n.removeAttr("data-dsn-grid"), n.addClass("dsn-move-section");
                        let a = dsnGrid.getUndefinedVal(n.data("dsn-move"), -100),
                            o = dsnGrid.getUndefinedVal(n.data("dsn-triggerhook"), 1),
                            s = dsnGrid.getUndefinedVal(n.data("dsn-opacity"), n.css("opacity")),
                            l = dsnGrid.getUndefinedVal(n.data("dsn-duration"), "150%");
                        if ("tablet" === n.data("dsn-responsive") && i.width() < 992) return;
                        let d = TweenMax.to(n, 2, {
                            y: a,
                            autoAlpha: s,
                            ease: Power0.easeNone
                        });
                        var c = new ScrollMagic.Scene({
                            triggerElement: this,
                            triggerHook: o,
                            duration: l
                        }).setTween(d).addTo(t);
                        r.getListener(function () {
                            c.refresh()
                        })
                    })
                },
                parallaxImgHover: function () {
                    const t = e('[data-dsn="parallax"]');
                    0 === t.length || i.width() < 992 || t.each(function () {
                        var t = e(this),
                            n = (dsnGrid.removeAttr(t, "data-dsn"), dsnGrid.removeAttr(t, "data-dsn-speed")),
                            a = dsnGrid.removeAttr(t, "data-dsn-move"),
                            i = !1;
                        t.hasClass("image-zoom") && (i = !0), dsnGrid.parallaxMoveElemnt(t, a, n, void 0, i)
                    })
                },
                // change color
                changeColor: function () {
                    const n = "v-light";
                    var a = o.hasClass(n);
                    e('[data-dsn="color"]').each(function () {
                        let i = dsnGrid.getUndefinedVal(e(this).data("dsn-duration"), e(this).outerHeight() + 500);
                        var s = new ScrollMagic.Scene({
                            triggerElement: this,
                            triggerHook: 0.5,
                            duration: i
                        }).addTo(t);
                        s.on("enter", function () {
                            a ? o.removeClass(n) : o.addClass(n)
                        }), s.on("leave", function () {
                            a ? o.addClass(n) : o.removeClass(n)
                        }), r.getListener(function () {
                            s.refresh()
                        })
                    })
                },
                animateText: function () {
                    e('[data-dsn-animate="text"] , [data-dsn-animate="up"]').each(function () {
                        let n = e(this),
                            a = 1;
                        "text" === n.data("dsn-animate") ? (dsnGrid.convertTextWord(n, n), n.attr("data-dsn-animate", "animate")) : a = .8;
                        var i = new ScrollMagic.Scene({
                            triggerElement: this,
                            reverse: !1,
                            triggerHook: a
                        }).setClassToggle(this, "dsn-active").addTo(t);
                        r.getListener(function () {
                            i.refresh()
                        })
                    })
                },
                headerBlog: function () {
                    const n = e('[data-dsn-header="blog"]');
                    if (!(n.length <= 0 || i.width() < 992)) {
                        var a = new ScrollMagic.Scene({
                            triggerElement: ".header-single-post",
                            triggerHook: 0,
                            duration: "100%"
                        }).setTween(TweenMax.fromTo(n, 1, {
                            width: "100%"
                        }, {
                            width: "80%"
                        })).addTo(t);
                        r.getListener(function () {
                            a.refresh()
                        })
                    }
                },
                allInt: function () {
                    this.clearControl();
                    let e = this.headerProject();
                    r.getListener(function (t) {
                        !1 !== e && e.refresh()
                    }), this.nextProject(), this.parallaxImgHover(), this.parallaxImg(), this.moveSection(), this.animateText(), this.changeColor()
                }
            }
        }();
    r.start(), l.allInt(), t(), i.on("popstate", function (n) {
        e("main.main-root").load(document.location + " main.main-root > *", function () {
            t(!0), a().unlocked()
        })
    }), contactValidator(), n()
}(jQuery);

// اضافه کردن عملکرد ناوبری موبایل با سینتکس jQuery
(function($) {
    // تابع تنظیم کلاس active بر اساس URL فعلی
    function setActiveNavItem() {
        // پیدا کردن منوی موبایل
        var $mobileNav = $('.nav-mobile-app');
        if ($mobileNav.length <= 0) return;

        // همیشه منو نمایش داده شود
        $mobileNav.addClass('nav-visible').removeClass('nav-hidden');

        // گرفتن URL فعلی
        var currentPath = window.location.pathname;
        var currentPage = currentPath.split('/').pop() || 'home.html';

        // اگر URL خالی است، احتمالاً در صفحه اصلی هستیم
        if (currentPage === '') {
            currentPage = 'home.html';
        }

        // برای بررسی اگر در صفحه مشاوره هستیم
        var isConsultingPage = window.location.hash === '#consulting';

        // حذف کلاس active از همه آیتم‌ها
        $mobileNav.find('.nav-item').removeClass('active');

        // اضافه کردن کلاس active به آیتم مناسب
        $mobileNav.find('.nav-item').each(function() {
            var $item = $(this);
            var href = $item.attr('href');

            // تشخیص آیتم فعال بر اساس URL
            if (
                href === currentPage ||
                ((currentPage === 'home.html' || currentPage === 'index.html') &&
                 (href === 'home.html' || href === 'index.html')) ||
                (isConsultingPage && href === 'consulting.html')
            ) {
                $item.addClass('active');
            }
        });

        // حذف افکت ripple برای بهبود عملکرد
        // فقط تنظیم کلاس active برای آیتم‌های منو
        $mobileNav.find('.nav-item').off('click.ripple').on('click', function() {
            $mobileNav.find('.nav-item').removeClass('active');
            $(this).addClass('active');
        });
    }

    // اجرای تابع هنگام بارگذاری صفحه
    $(document).ready(function() {
        setActiveNavItem();
    });

    // اجرای مجدد تابع پس از تغییر صفحه با AJAX (در صورت وجود)
    $(document).on('ajaxComplete', function() {
        setActiveNavItem();
    });

})(jQuery);