// Passive Event Listeners Polyfill - کد زیر مشکل هشدارهای مربوط به event listener های غیر passive را حل می‌کند
(function () {
    // تست پشتیبانی مرورگر از passive event listeners
    var supportsPassive = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true;
                return true;
            }
        });
        window.addEventListener('test', null, opts);
        window.removeEventListener('test', null, opts);
    } catch (e) { }

    // تغییر رفتار addEventListener برای پشتیبانی از jQuery قدیمی
    if (supportsPassive) {
        var originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function (type, listener, options) {
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

// SliderProject function has been moved to slider.js

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

// slick_client function has been moved to slick-init.js

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

    // تابع جدید برای مخفی کردن preloader اصلی
    function removeMainPreloader() {
        // اضافه کردن کلاس به body برای مخفی کردن preloader
        e('body').addClass('internal-page-loaded');

        // مخفی کردن preloader اصلی
        var preloader = e(".preloader");
        if (preloader.length > 0) {
            preloader.addClass("hidden");
            // مخفی کردن با CSS
            preloader.css({
                'display': 'none',
                'visibility': 'hidden',
                'opacity': '0',
                'z-index': '-9999'
            });
        }
    }

    function t(n) {
        // اگر n برابر با true باشد، یعنی این تابع از طریق بارگذاری صفحه‌های داخلی فراخوانی شده است
        // در این صورت، preloader اصلی را مخفی می‌کنیم
        if (n === true) {
            // مخفی کردن preloader اصلی در بارگذاری صفحه‌های داخلی
            removeMainPreloader();
        }

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
            }(), // SliderProject and slick_client have been moved to separate files
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
                        e("a").not(".effect-ajax").not("[href^='#']").not("[href^='mailto:']").not("[href^='tel:']").not("[href^='javascript:']").not("[href^='https://']").not("[href^='http://']").on("click", function (n) {
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
                        var n = this;

                        // شروع پیش‌بارگذاری صفحه جدید بدون نمایش modern-ajax-loader
                        // فقط از wait-loader استفاده می‌شود که در جای دیگر مدیریت می‌شود
                        setTimeout(function () {
                            n.loader(t, function () {
                                dsnGrid.scrollTop(0, 1), a().unlocked()
                            });
                        }, 50);
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
                        o.removeClass("dsn-effect-animate");

                        // بارگذاری فقط محتوای اصلی صفحه جدید بدون بارگذاری مجدد CSS و JS
                        // فقط محتوای داخل main.main-root را بارگذاری می‌کنیم

                        // استفاده از fetch برای بارگذاری سریع‌تر صفحه
                        fetch(t)
                            .then(function(response) {
                                if (!response.ok) {
                                    window.location = t; // در صورت خطا، به صفحه مورد نظر منتقل شو
                                    return;
                                }
                                return response.text();
                            })
                            .then(function(html) {
                                if (!html) return;

                                // استفاده از DOMParser برای پردازش HTML
                                var parser = new DOMParser();
                                var doc = parser.parseFromString(html, 'text/html');

                                // استخراج محتوای اصلی
                                var newContent = doc.querySelector('main.main-root');
                                if (!newContent) {
                                    window.location = t; // اگر محتوای اصلی پیدا نشد، به صفحه مورد نظر منتقل شو
                                    return;
                                }

                                // حذف preloader از محتوای جدید
                                var preloader = newContent.querySelector('.preloader');
                                if (preloader) {
                                    preloader.parentNode.removeChild(preloader);
                                }

                                // به‌روزرسانی عنوان صفحه
                                var title = doc.querySelector('title');
                                if (title) {
                                    document.title = title.textContent;
                                }

                                // به‌روزرسانی تاریخچه مرورگر
                                history.pushState(null, null, t);

                                // مخفی کردن انیمیشن‌ها
                                a.hideAnimate();

                                // جایگزینی محتوای اصلی
                                a.main_root.html(newContent.innerHTML);
                                var r = a.main_root;

                                // غیرفعال کردن اسکرول تا زمان بارگذاری کامل
                                e('body').css('overflow', 'hidden');

                                // مخفی کردن preloader اصلی برای جلوگیری از نمایش آن
                                removeMainPreloader();

                                // بارگذاری تصاویر قبل از نمایش محتوا
                                var images = r.find('img');
                                var imagesLoaded = 0;
                                var totalImages = images.length;
                                var minImagesToLoad = Math.min(3, totalImages); // حداقل 3 تصویر یا کل تصاویر اگر کمتر از 3 تا باشند

                                // حذف preloader اصلی از DOM برای جلوگیری از نمایش آن
                                e('.preloader').remove();

                                // اگر تصویری وجود ندارد، مستقیماً محتوا را نمایش بده
                                if (totalImages === 0) {
                                    // فعال کردن مجدد اسکرول
                                    e('body').css('overflow', '');
                                    a.animateAjaxEnd();
                                    void 0 !== n && n(r, null, null);
                                    d = !0;
                                    return;
                                }

                                // بارگذاری تصاویر
                                images.each(function() {
                                    var img = new Image();
                                    img.onload = img.onerror = function() {
                                        imagesLoaded++;

                                        // اگر حداقل 3 تصویر یا همه تصاویر بارگذاری شده‌اند
                                        if (imagesLoaded >= minImagesToLoad) {
                                            // فعال کردن مجدد اسکرول
                                            e('body').css('overflow', '');
                                            a.animateAjaxEnd();
                                            void 0 !== n && n(r, null, null);
                                            d = !0;

                                            // ادامه بارگذاری بقیه تصاویر در پس‌زمینه
                                            // این بخش برای اطمینان از بارگذاری همه تصاویر است
                                        }
                                    };
                                    img.src = this.src;
                                });
                            })
                            .catch(function(error) {
                                console.error('Error loading page:', error);
                                window.location = t; // در صورت خطا، به صفحه مورد نظر منتقل شو
                            });
                    },
                    animateAjaxEnd: function () {
                        var n = this;
                        n.main_root.css("transform", "");

                        // حذف کدهای مربوط به modern-ajax-loader
                        // فقط از wait-loader استفاده می‌شود
                        n.ajaxLoaderElemnt();
                        n.showAnimate();

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
                        // عنوان صفحه در تابع loader به‌روزرسانی می‌شود
                        // این تابع برای سازگاری با کد قبلی حفظ شده است
                    },
                    ajaxLoaderElemnt: function (e) {
                        if (e) {
                            o.addClass("dsn-ajax-effect");
                            // مخفی کردن preloader اصلی برای جلوگیری از نمایش آن
                            removeMainPreloader();
                        } else {
                            o.removeClass("dsn-ajax-effect");
                        }
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
            }(n),
            // Slick slider initialization has been moved to slick-init.js
            e(".gallery-col .box-im .image-zoom").magnificPopup({
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
                    // progress function has been removed as it's not used
                    // slideChange function has been removed as it's not used
                    // showText and hideText functions have been removed as they're not used
                    // touchStart and setTransition functions have been removed as they're not used
                    // swiperObject has been removed as it's not used
                    run: function () {
                        if (t.length <= 0) return;
                        this.initSlider();
                        // Swiper initialization has been removed as it's not used
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

        // Main preloader implementation with longer display time
        function () {
            var t = e(".preloader"),
                n = t.find(".preloader-block"),
                a = n.find(".percent"),
                o = n.find(".title"),
                s = n.find(".loading"),
                r = t.find(".preloader-bar"),
                l = r.find(".preloader-progress"),
                d = t.find(".preloader-after"),
                c = t.find(".preloader-before"),
                // Slower progress for better visibility (500ms instead of 300ms)
                u = dsnGrid.pageLoad(0, 100, 500, function (e) {
                    a.text(e);
                    l.css("width", e + "%");
                });

            // Check if this is the first entrance to the site
            var isFirstEntrance = true;
            if (performance.navigation.type === 1 || document.referrer.includes(window.location.hostname)) {
                isFirstEntrance = false;
            }

            // If it's not the first entrance, hide preloader immediately
            if (!isFirstEntrance) {
                t.addClass("hidden");
                return;
            }

            // For first entrance, show preloader with longer animation
            i.on("load", function () {
                // Add a minimum display time for preloader (2 seconds)
                setTimeout(function() {
                    clearInterval(u);
                    // Slower animation (1s instead of 0.5s)
                    TweenMax.fromTo(l, 1, {
                        width: "95%"
                    }, {
                        width: "100%",
                        onUpdate: function () {
                            var e = l.width() / l.parent().width() * 100;
                            a.text(parseInt(e, 10));
                        },
                        onComplete: function () {
                            // Slower animations for better visibility
                            TweenMax.to(r, 1, {
                                left: "100%"
                            });
                            TweenMax.to(o, 1.5, {
                                autoAlpha: 0,
                                y: -100
                            });
                            TweenMax.to(s, 1.5, {
                                autoAlpha: 0,
                                y: 100
                            });
                            TweenMax.to(a, 1.5, {
                                autoAlpha: 0
                            });
                            TweenMax.to(c, 1.5, {
                                y: "-100%",
                                delay: 1
                            });

                            // Smoother and shorter fade out animation for preloader
                            TweenMax.to(t, 0.8, {
                                opacity: 0,
                                delay: 0.2, // Shorter delay before hiding
                                ease: Power2.easeInOut, // Smoother easing function
                                onComplete: function () {
                                    t.addClass("hidden");
                                }
                            });
                        }
                    });
                }, 2000); // Minimum 2 seconds display time
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
        // استفاده از fetch برای بارگذاری سریع‌تر صفحه بدون بارگذاری مجدد CSS و JS
        fetch(document.location)
            .then(function(response) {
                if (!response.ok) {
                    window.location.reload(); // در صورت خطا، صفحه را مجدداً بارگذاری کن
                    return;
                }
                return response.text();
            })
            .then(function(html) {
                if (!html) return;

                // استفاده از DOMParser برای پردازش HTML
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, 'text/html');

                // استخراج محتوای اصلی
                var newContent = doc.querySelector('main.main-root');
                if (!newContent) {
                    window.location.reload(); // اگر محتوای اصلی پیدا نشد، صفحه را مجدداً بارگذاری کن
                    return;
                }

                // مخفی کردن preloader اصلی برای جلوگیری از نمایش آن
                removeMainPreloader();

                // حذف preloader از محتوای جدید
                var preloader = newContent.querySelector('.preloader');
                if (preloader) {
                    preloader.parentNode.removeChild(preloader);
                }

                // به‌روزرسانی عنوان صفحه
                var title = doc.querySelector('title');
                if (title) {
                    document.title = title.textContent;
                }

                // غیرفعال کردن اسکرول تا زمان بارگذاری کامل
                e('body').css('overflow', 'hidden');

                // جایگزینی محتوای اصلی
                e("main.main-root").html(newContent.innerHTML);
                var mainRoot = e("main.main-root");

                // بارگذاری تصاویر قبل از نمایش محتوا
                var images = mainRoot.find('img');
                var imagesLoaded = 0;
                var totalImages = images.length;
                var minImagesToLoad = Math.min(3, totalImages); // حداقل 3 تصویر یا کل تصاویر اگر کمتر از 3 تا باشند

                // اگر تصویری وجود ندارد، مستقیماً محتوا را نمایش بده
                if (totalImages === 0) {
                    // فعال کردن مجدد اسکرول
                    e('body').css('overflow', '');
                    // اجرای توابع مورد نیاز
                    t(true);
                    a().unlocked();
                    return;
                }

                // بارگذاری تصاویر
                images.each(function() {
                    var img = new Image();
                    img.onload = img.onerror = function() {
                        imagesLoaded++;

                        // اگر حداقل 3 تصویر یا همه تصاویر بارگذاری شده‌اند
                        if (imagesLoaded >= minImagesToLoad) {
                            // فعال کردن مجدد اسکرول
                            e('body').css('overflow', '');
                            // اجرای توابع مورد نیاز
                            t(true);
                            a().unlocked();

                            // ادامه بارگذاری بقیه تصاویر در پس‌زمینه
                            // این بخش برای اطمینان از بارگذاری همه تصاویر است
                        }
                    };
                    img.src = this.src;
                });
            })
            .catch(function(error) {
                console.error('Error loading page:', error);
                window.location.reload(); // در صورت خطا، صفحه را مجدداً بارگذاری کن
            });
    }), contactValidator(), n()
}(jQuery);

// Mobile navigation is now handled in mobile-nav.js