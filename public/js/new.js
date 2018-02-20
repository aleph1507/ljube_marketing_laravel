    (function () {
        var screenWidth = window.innerWidth;
        jQuery('body').on({
            touchstart: function (e) {
                touchStartEvent = e;
            },
            touchmove: function (e) {
                if ((e.originalEvent.pageY > touchStartEvent.originalEvent.pageY && this.scrollTop == 0) ||
                    (e.originalEvent.pageY < touchStartEvent.originalEvent.pageY && this.scrollTop + this.offsetHeight >= this.scrollHeight))
                    e.preventDefault();
            }
        });
        /* ---------------- MOBILE DETECT FUNCTION --------------------*/
        var isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        /* ---------------- END MOBILE DETECT FUNCTION --------------------*/

        var latesProjects = jQuery('#latest-projects'),
            carousel = jQuery('#latest-projects .projects'),
            clients = jQuery('#clients .reviews');

        jQuery('#latest-projects .projects').carouFredSel({
            width: "100%",
            height: "auto",
            auto: false,
            prev: '#prev',
            next: '#next',
            pagination: "#pager",
            responsive: true,
            mousewheel: false,
            scroll: {
                fx: "cover-fade",
                duration: 800,
                onBefore: function (o, n, s) {
                    var img = o.items.visible[0].firstElementChild.src;
                    latesProjects.css('background-image', 'url(' + img + ')');
                },
                onAfter: function (o) {

                    testMobile = isMobile.any();

                    if (testMobile != null && screenWidth < 992) {
                        var circles = o.items.visible.find('.circle'),
                            count = 0,
                            counterIncrement = +1,
                            counter = setInterval(timer, 3000);

                        function timer() {
                            jQuery(circles.get(count)).fadeOut(2000);
                            // console.log(count);
                            count = count + counterIncrement;
                            if (count == 0 || count == 2) {
                                counterIncrement = -counterIncrement;
                            }
                            setTimeout(function () {
                                jQuery(circles.get(count)).fadeIn("slow").css("display", "inline-block");
                            }, 2000);

                        }
                    }
                }
            },
            swipe: {
                onMouse: true,
                onTouch: true
            },
            onCreate: function (o) {
                jQuery(window).on('resize', function () {
                    carousel.parent().add(carousel).height(carousel.children().first().height());
                }).trigger('resize');
                var imgFirst = o.items[0].firstElementChild.src;
                latesProjects.css('background-image', 'url(' + imgFirst + ')');

                testMobile = isMobile.any();

                if (testMobile != null && screenWidth < 992) {
                    var circles = jQuery(o.items[0]).find('.circle'),
                        count = 0,
                        counterIncrement = +1,
                        counter = setInterval(timer, 4000);

                    function timer() {
                        jQuery(circles.get(count)).fadeOut(2000);
                        count = count + counterIncrement;
                        if (count == 0 || count == 2) {
                            counterIncrement = -counterIncrement;
                        }
                        setTimeout(function () {
                            jQuery(circles.get(count)).fadeIn("slow").css("display", "inline-block");
                        }, 2000);

                    }
                }
            }
        });

        jQuery('#clients .reviews').carouFredSel({
            auto: false,
            width: "100%",
            height: 'variable',
            responsive: true,
            items: {
                height: 'variable'
            },
            prev: '#prev2',
            next: '#next2',
            pagination: "#pager2",
            mousewheel: false,
            swipe: {
                onMouse: true,
                onTouch: true
            },
            onCreate: function () {
                jQuery(window).on('resize', function () {
                    clients.parent().add(clients).height(clients.children().first().height());
                }).trigger('resize');
            }
        });

        jQuery('#awards .awards').carouFredSel({
            auto: false,
            width: '100%',
            items: {
                visible: 6,
                start: 0
            },
            scroll: {
                items: 1,
                duration: 500,
                timeoutDuration: 1000
            },
            pagination: "#pager4",
            prev: '#prev-award',
            next: '#next-award',
            mousewheel: true,
            swipe: {
                onMouse: true,
                onTouch: true
            }
        });

        jQuery('#photos').carouFredSel({
            auto: false,
            width: "100%",
            height: 280,
            items: {
                visible: {
                    min: 1,
                    max: 5
                },
                width: 280,
                height: 280
            },
            responsive: true,
            scroll: {
                items: 1,
            },
            prev: '#prev3',
            next: '#next3',
            mousewheel: false,
            swipe: {
                onMouse: true,
                onTouch: true
            }
        });


        jQuery('#trigger').waypoint(function () {
                jQuery('#nav').toggleClass('small-nav');
            }, {offset: 0}
        );

        jQuery('.box').waypoint(function () {
                jQuery(this.element).addClass('fadeInUp');
            }, {offset: '70%'}
        );

        jQuery('#reviewing').waypoint(function () {
                jQuery('#free').addClass('animated fadeIn');
            }, {offset: 150}
        );

        jQuery('.filters a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = jQuery(this.hash);
                target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    jQuery('html,body').animate({
                        scrollTop: target.offset().top - 73
                    }, 1000);
                    return false;
                }
            }
        });

        setTimeout(function () {
            jQuery('#page-free-ppc-audit .arrows-down').show();
            jQuery('#page-free-ppc-audit .arrows-down').addClass('animated bounceInDown');
        }, 2000);

        function parallaxInit() {
            testMobile = isMobile.any();

            if (testMobile == null){
                jQuery('.parallax .bg1').parallax("50%", 0.6);
                jQuery('.parallax .bg2').parallax("50%", 0.6);
                if (jQuery('#page-free-ppc-audit #featured').length != "") {
                    jQuery('#page-free-ppc-audit #featured').parallax("50%", 0.6);
                }
            }
        }

        parallaxInit();

        jQuery('#clients').waypoint(function () {
                var SEMICOLON = SEMICOLON || {};
                !function (e) {
                    "use strict";
                    SEMICOLON.widget = {
                        init: function () {
                            SEMICOLON.widget.counter()
                        }, counter: function () {
                            var t = e(".number");
                            t.length > 0 && t.each(function () {
                                var t = e(this);
                                SEMICOLON.widget.runCounter(t)
                            })
                        }, runCounter: function (e, t) {
                            1 == t ? e.find("span").countTo({formatter: function (e, t) {
                                return e = e.toFixed(t.decimals), e = e.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }}) : e.find("span").countTo()
                        }
                    },
                        SEMICOLON.documentOnReady = {
                            init: function () {
                                SEMICOLON.widget.init()
                            }
                        };

                    e(document).ready(SEMICOLON.documentOnReady.init)
                }(jQuery);
            }, {offset: '70%'}
        );

        jQuery('.widget_text_quote').waypoint(function () {
            jQuery(this.element).addClass('fadeInUp');
        }, {offset: '70%'});

        function initSF() {
            jQuery(".sf-menu").superfish({delay: 700, speed: 'fast', speedOut: 'fast', animation: {opacity: 'show'}});
        }
        initSF();
        var menuLink = jQuery("#toggle-nav"), mobileNav = jQuery("#mobile-menu"), mobQuote = jQuery('#mob-quote');

        menuLink.click(function (e) {
            e.preventDefault();
            menuLink.toggleClass("active");
            mobileNav.toggleClass("active");
            jQuery('body').toggleClass('noscroll');
        });

        mobQuote.click(function (e) {
            menuLink.toggleClass("active");
            mobileNav.removeClass("active");
            jQuery('body').removeClass('noscroll');
        });

        jQuery('#mobile-menu ul li').each(function () {
            if (jQuery(this).find('> ul').length > 0) {
                jQuery(this).addClass('has-ul');
                jQuery(this).find('> a').append('<i class="icon-down"></i>');
            }
        });

        jQuery('#mobile-menu ul li:has(">ul") > a').click(function () {
            jQuery(this).parent().toggleClass('open');
            jQuery(this).parent().find('> ul').stop(true, true).slideToggle();
            return false;
        });

        jQuery('#show-more').click(function () {
            jQuery('.second-stack').slideToggle();
            return false;
        });

        jQuery('#an-show-more').toggle(
            function () {
                jQuery('#mobile-an-services ul').animate({height: "670px"}, 500);
                return false;
            },
            function () {
                jQuery('#mobile-an-services ul').animate({height: "170px"}, 500);
                return false;
            }
        );

        jQuery('.free-quote, .btn-quote, #together .btn').click(function (event) {
            var target = jQuery(this).attr('href');
            jQuery('html, body').animate({scrollTop: jQuery(target).offset().top - 50}, 500);
            return false;
        });

        jQuery(".fancybox").fancybox({
            helpers: {
                overlay: {
                    locked: false
                }
            }
        });

        jQuery('#menu-item-10727 > a').click(function (e) {
            e.preventDefault();
        });

        // Search Button
        var main_margin_top = jQuery('#main').css('margin-top');
        var searchHeight;

        jQuery('#close-search, .menu-item-search>a').click(function () {
            if (jQuery('#top-search').hasClass('open')) {
                jQuery('#top-search').removeClass('open').delay(200);
                jQuery('#main').animate({'margin-top': parseInt(main_margin_top) + 'px'}, 300);
                jQuery('#top-search').animate({height: '0px'}, 200);
            } else {
                if (testMobile != null && screenWidth < 767) {
                    searchHeight = '80px';
                } else {
                    searchHeight = '120px';
                }
                jQuery('#top-search').animate({height: searchHeight, opacity: 1}, 200, function () {
                    jQuery('#top-search>form>input').focus();
                    jQuery('#top-search').addClass('open');
                });
            }
            e.preventDefault();
        });

        jQuery('#slide-clients').slick({
            arrows: true,
            infinite: true,
            dots: false,
            slidesToShow: 6,
            slidesToScroll: 1,
            speed: 300,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 770,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        jQuery('#awards-slide').slick({
            arrows: true,
            infinite: true,
            dots: false,
            slidesToShow: 6,
            slidesToScroll: 1,
            speed: 300,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 770,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }(jQuery));


    var form = {
        init: function () {
            this.pumpButton = jQuery('.pumpkin-button-holder');
            this.form = jQuery('.report-popup-holder');
            this.closeButton = this.form.find('.report-popup-close');
            this.name = this.form.find('#name');
            this.email = this.form.find('#email');
            this.submit = this.form.find('.form-send input');
            this.errorEmail = this.form.find('.errorEmail');
            this.errorName = this.form.find('.errorName');
            this.errors = 0;

            this.events();
        },

        events: function () {
            this.pumpButton.on('click', this.showForm.bind(this));
            this.closeButton.on('click', this.hideForm.bind(this));
            this.email.on('blur', this.validate.bind(this));
            this.name.on('blur', this.validate.bind(this));
            this.email.on('focus', function () {
                this.errorEmail.css('display','none');
            }.bind(this));
            this.name.on('focus', function () {
                this.errorName.css('display','none');
            }.bind(this));
            this.submit.on('click', this.doSubmit.bind(this));
        },

        doSubmit: function (e) {
            this.errors = 0;
            e.preventDefault();
            this.email.trigger('blur');
            this.name.trigger('blur');
            if (this.errors === 0) {
                this.form.find('form').submit();
                this.submit.attr('disabled', 'disabled').css('background', '#cccccc');
            }
        },

        validate: function () {
            var email = this.email.val();
            var name = this.name.val();
            this.errorEmail.css('display','none');
            this.errorName.css('display','none');
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

            if (!pattern.test(email)) {
                this.errors = 1;
                this.errorEmail.css('display','block');
            }
            if(name == ""){
                this.errors = 1;
                this.errorName.css('display','block');
            }
        },

        showForm: function (e) {
            e.preventDefault();
            this.errors = 0;
            this.errorEmail.css('display','none');
            this.errorName.css('display','none');
            this.pumpButton.css({
                opacity: 0,
                visibility: 'hidden'
            });

            if(window.screen.width < 767){
                this.form.css({
                    display: 'block',
                    right: 0
                });
                TopscrollTo();
            } else {
                this.form.css({right: 0});
            }
        },

        hideForm: function (e) {
            e.preventDefault();
            this.pumpButton.css({
                opacity: 1,
                visibility: 'visible'
            });
            if(window.screen.width < 767){
                this.form.css({
                    right: 0,
                    display: 'none'
                });
            }else {
                this.form.css({right: -720});
            }

        }
    };
    function TopscrollTo() {
        if(window.scrollY!=0) {
            setTimeout(function() {
                window.scrollTo(0,window.scrollY-30);
                TopscrollTo();
            }, 10);
        }
    }

    jQuery(document).ready(function () {
        form.init();
        if (window.location.hash == "#popup")
            form.showForm();

    });