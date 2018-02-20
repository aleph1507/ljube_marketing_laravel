jQuery(function ($) {

    var $action;
    var $container = jQuery('#grid'); //The ID for the list with all the blog posts

    jQuery(window).load(function () {
        $container.isotope({//Isotope options, 'item' matches the class in the PHP
            itemSelector: '.grid-item',
            layoutMode: 'masonry'
        });

        if (window.location.hash && ~window.location.pathname.indexOf('clients')) {
            jQuery(document.body).scrollTop(jQuery(window.location.hash).offset().top);
        }
    });

    function init_video() {
        jQuery("video#main_video source").each(function(){
            var sourceFile = jQuery(this).attr('data-src');
            jQuery(this).attr('src', sourceFile);
            var video = this.parentElement;
            video.load();
            setTimeout(function () {
                    video.play();
            }, 150);
        });
    }

    window.onload = init_video;

    //Add the class selected to the item that is clicked, and remove from the others
    var $optionSets = jQuery('#filters'),
        $optionLinks = $optionSets.find('a'),
        with_test = jQuery('.with-testimonials');

    $optionLinks.click(function () {
        var $this = jQuery(this);

        if ($this.hasClass('selected')) {
            return false;
        }
        var $optionSet = $this.parents('#filters');
        $optionSets.find('.selected').removeClass('selected');
        $this.addClass('selected');

        //When an item is clicked, sort the items.
        var selector = jQuery(this).attr('data-filter');
        $container.isotope({filter: selector});

        return false;
    });

    jQuery(document).ready(function () {
        if(getUrlParameter('type')){
            $optionSets.find('.selected').removeClass('selected');
            with_test.click();
        }
    });

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    if(jQuery('#filters').length){
        var type = window.location.hash.substr(1);
        if(type === 'case'){
            jQuery('#filters .with-cases').click();
        }
    }

    $('.show-all-categories').on('click', function () {
        var list = $('.categories ul');
        if(list.hasClass('full-categories')){
            list.removeClass('full-categories');
        } else {
            list.addClass('full-categories');
        }
    });

    jQuery('.address-tab .tab-addr').on('click', function (e) {
        var tab_a = jQuery('.tab-addr'),
            tab_cont = jQuery('.tab-cont');
        e.preventDefault();
        tab_a.removeClass('active');
        tab_cont.removeClass('active');
        jQuery(this).addClass('active');
        tab_a.eq(jQuery(this).index()).addClass('active');
        tab_cont.eq(jQuery(this).index()).addClass('active');
        return false;
    });

    $('.loadmore').click(function (e) {
        var self = $(this);
        var cliked = jQuery(e.target).data('action');
        var currentText = self.text();
        action = self.data('action');
        self.text('Loading...');
        var data = {
            'action': action,
            'query': true_posts,
            'page': current_page
        };
        $.ajax({
            url: ajaxurl,
            data: data,
            type: 'POST',
            success: function (data) {
                if (data) {
                    var $elems = $(data);
                    if ($container.length) {
                        $container.append($elems).imagesLoaded().always(function (instance) {
                            $container.isotope('appended', $elems);
                        });
                    } else {
                        $('.app-list').append($elems);
                    }

                    $('.loadmore').text(currentText); // вставляем новые посты
                    current_page++; // увеличиваем номер страницы на единицу
                    if (current_page == max_pages)
                        self.remove(); // если последняя страница, удаляем кнопку
                } else {
                    $('.loadmore').remove(); // если мы дошли до последней страницы постов, скроем кнопку
                }
            }
        });
        return false;
    });

    $('.loadmore-guides').click(function (e) {
        var self = $(this);
        var cliked = jQuery(e.target).data('action');
        var currentText = self.text();
        action = self.data('action');
        self.text('Loading...');
        var data = {
            'action': action,
            'query': guides_posts,
            'page': guides_current_page
        };
        $.ajax({
            url: ajaxurl,
            data: data,
            type: 'POST',
            success: function (data) {
                if (data) {
                    var $elems = $(data);
                    $('.tips-guides').append($elems);

                    $('.loadmore-guides').text(currentText); // вставляем новые посты
                    guides_current_page++; // увеличиваем номер страницы на единицу
                    if (guides_current_page == guides_max_pages)
                        self.remove(); // если последняя страница, удаляем кнопку
                } else {
                    $('.loadmore-guides').remove(); // если мы дошли до последней страницы постов, скроем кнопку
                }
            }
        });
        return false;
    });

    $('.loadmore-events').click(function (e) {
        var self = $(this);
        var currentText = self.text();
        action = self.data('action');
        self.text('Loading...'); // изменяем текст кнопки, вы также можете добавить прелоадер
        var data = {
            'action': action,
            'query': events_posts,
            'page': events_current_page
        };
        $.ajax({
            url: ajaxurl,
            data: data,
            type: 'POST',
            success: function (data) {
                if (data) {
                    var $elems = $(data);
                    $('.int-events').append($elems);

                    $('.loadmore-events').text(currentText); // вставляем новые посты
                    events_current_page++; // увеличиваем номер страницы на единицу
                    if (events_current_page == events_max_pages)
                        self.remove(); // если последняя страница, удаляем кнопку
                } else {
                    $('.loadmore-events').remove(); // если мы дошли до последней страницы постов, скроем кнопку
                }
            }
        });
        return false;
    });

    var nlform = $('form[name="cfnl38"]'),
        tpform = $('form[name="cf38"]');

    var sendActon = function (e) {
        var form = $(e.currentTarget),
                data = {
                    'action': 'acton',
                    'query': {
                        'your-name': form.find('input[name="your-name"]').val(),
                        'your-email': form.find('input[name="your-email"]').val(),
                        'url': window.location.href
                    }
                };

        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: data,
            type: 'POST',
            success: function (resp) {
            },
            error: function (error) {
            }
        });
    };

    nlform.on('submit', sendActon);
    tpform.on('submit', sendActon);

    $('#sub_form').on('submit',function (e) {
        e.preventDefault();
        if (validateGuideForm()){
            $('#sub_form').unbind('submit').submit();
            $(this).find('button').attr('disabled','disabled').css('background', '#cccccc');
        }
        $('.error_guide').each(function () {
            $(this).on('change', function () {
                if ($(this).val() != '') {
                    $(this).removeClass('error_guide');
                    $(this).parent().find('span').hide();
                }
            });
        });
    });
    function validateGuideForm(){
        var guide_name = $('.guide_name').val(),
            guide_email = $('.guide_email').val(),
            guide_site = $('.guide_site').val();

        var reg = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;

        if(guide_name==""){
            $('.guide_name').addClass('error_guide');
            $('.error_guide').parent().find('span').css('display', 'block');
        }
        if(guide_email=="" || !reg.test(guide_email)){
            $('.guide_email').addClass('error_guide');
            $('.error_guide').parent().find('span').css('display', 'block');
        }

        if(guide_name=="" || guide_email=="" || !reg.test(guide_email)){
            return false;
        }
        return true;
    }
});

var main = function () {
    jQuery('.arrow-next').click(function () {
        var currentSlide = jQuery('.active-slide');
        var nextSlide = currentSlide.next();

        if (nextSlide.length === 0) {
            nextSlide = jQuery('.slide').first();
        }

        var currentDot = jQuery('.active-dot');
        var nextDot = currentDot.next();
        if (nextDot.length === 0) {
            nextDot = jQuery('.dot').first();
        }

        currentDot.removeClass('active-dot');
        nextDot.addClass('active-dot');

        currentSlide.fadeOut(300).removeClass('active-slide');
        nextSlide.fadeIn(300).addClass('active-slide');

        return false;
    });

    jQuery('.arrow-prev').click(function () {
        var currentSlide = jQuery('.active-slide');
        var prevSlide = currentSlide.prev();
        if (prevSlide.length === 0) {
            prevSlide = jQuery('.slide').last();
        }
        currentSlide.fadeOut(300).removeClass('active-slide');
        prevSlide.fadeIn(300).addClass('active-slide');

        var currentDot = jQuery('.active-dot');
        var prevDot = currentDot.prev();
        if (prevDot.length === 0) {
            prevDot = jQuery('.dot').last();
        }

        currentDot.removeClass('active-dot');
        prevDot.addClass('active-dot');

        return false;
    });

    jQuery('.dot').click(function () {
        var currentData = jQuery(this).attr('data-filter');
        var clikedSlide = jQuery('.' + currentData);
        jQuery('.dot').removeClass('active-dot');
        jQuery(this).addClass('active-dot');
        jQuery('.slide').fadeOut(300).removeClass('active-slide');
        clikedSlide.fadeIn(300).addClass('active-slide'); /* flipInX*/

        console.log(currentData);
    });

    jQuery(document).ready(function () {
        jQuery(".dest_link").on("click", function (event) {
            event.preventDefault();
            var id  = jQuery(this).attr('href'),
                top = jQuery(id).offset().top - 75;
            jQuery('body,html').animate({scrollTop: top}, 500);
        });
        jQuery("a").on("click", function(event){
          if(this.hash !== ""){
            event.preventDefault();
            var hash = this.hash;
            jQuery('html, body').animate({
              scrollTop: jQuery(hash).offset().top
            }, 500, function(){
              window.location.hash = hash;
            });
          }
        });
        // TABS
        jQuery('.tab_li').on('click', function (e) {
           var tab_li = jQuery('.tab_li'),
               tab_a = jQuery('.tab_li a'),
               tab_cont = jQuery('.stories_box .stories_div');
            e.preventDefault();
            tab_li.removeClass('active');
            tab_a.removeClass('active');
            tab_cont.removeClass('active');
            jQuery(this).addClass('active');
            tab_a.eq(jQuery(this).index()).addClass('active');
            tab_cont.eq(jQuery(this).index()).addClass('active');
            return false;
        });

    });

    function sendAnalitycs(e) {
        if (e.origin != 'https://forms.promodo.ru')
            return;

        if (!e.data.transactionId)
            return;

        ga('create', 'UA-73278156-1', 'promodo.com');
        ga('require', 'displayfeatures');
        ga('send', 'pageview');
        var affil = 'ga-script.org';

        if (typeof window["dataLayer"] === 'undefined') {
            dataLayer = [];
        }
        window.dataLayer.push({
            'event': 'OrderFormSubmit'
        });

        ga('create', 'UA-73278156-1', 'promodo.com');
        ga('require', 'ecommerce');
        ga('ecommerce:addTransaction', {
            'id': e.data.transactionId,
            'affiliation': 'promodo.com'
        });

        ga('ecommerce:addItem', {
            'id': e.data.transactionId,
            'name': e.data.name + ' ' + e.data.email,
            'sku': e.data.transactionId,
            'category': 'Lead',
            'price': '1',
            'quantity': '1'
        });

        ga('ecommerce:send');

    }

    function receiveMessage(event){
        if (event.origin != 'https://forms.promodo.ru')
            return;

        if (event.data == "ppcSubmited") {
            jQuery.fancybox.open([
                {
                    tpl: {
                        wrap: '<div class="fancybox-wrap animated flipInY" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>'
                    },
                    href: '#ppc-thanks'
                },
            ], {
                padding: [30, 20, 50, 20],
                closeBtn: false
            });
        }
    }

    if (window.addEventListener) {
        window.addEventListener("message", sendAnalitycs);
        window.addEventListener("message", receiveMessage, false);
    } else {
        window.attachEvent("onmessage", sendAnalitycs); // IE8
    }

 //   loadCSS(window.location.protocol + '//' + window.location.host + '/wp-content/plugins/sitepress-multilingual-cms/res/css/language-selector.css?v=3.2.7');
  //  loadCSS(window.location.protocol + '//' + window.location.host + '/wp-content/plugins/contact-form-7/includes/css/styles.css');
  //  loadCSS('//fonts.googleapis.com/css?family=Open+Sans:300,300italic,400,600,700,800');
  //  loadCSS(window.location.protocol + '//' + window.location.host + '/wp-content/themes/promodo/assets/css/animate.min.css');
   // loadCSS(window.location.protocol + '//' + window.location.host + '/wp-content/themes/promodo/assets/css/isotope.css');
  //  loadCSS(window.location.protocol + '//' + window.location.host + '/wp-content/themes/promodo/assets/css/jquery.fancybox.css');
  //  loadCSS(window.location.protocol + '//' + window.location.host + '/wp-content/themes/promodo/assets/css/slick.css');
    loadCSS(window.location.protocol + '//' + window.location.host + '../css/libs.css');
    function loadCSS(href) {
        var cssLink = jQuery("<link rel='stylesheet' type='text/css' href='" + href + "'>");
        cssLink.appendTo(jQuery("head"));
    };


    jQuery(".srv").hover(function(e){
      jQuery(this).find("p").fadeIn();
      jQuery(this).animate({backgroundColor:
          "linear-gradient(to bottom,rgba(0,0,0,0.4) 0,rgba(0,0,0,0.4) 20%,rgba(0,0,0,0.7) 100%)"
      });
      if(jQuery(this).has(".line_graph")){
        serv_ico(jQuery(this).find(".line_graph"), '15px', '-97px');
        // jQuery(this).find(".line_graph").animate({
        //   'background-position-x': '15px',
        //   'background-position-y': '-97px'
        // }, 150, 'linear');
      }
      if(jQuery(this).has(".soc_media")){
        serv_ico(jQuery(this).find(".soc_media"), '-99px', '-97px');
        // jQuery(this).find(".soc_media").animate({
        //   'background-position-x': '-99px',
        //   'background-position-y': '-97px'
        // }, 150, 'linear');
      }
      if(jQuery(this).has('.websites')){
        serv_ico(jQuery(this).find('.websites'), '-505px', '-98px');
      }
      if(jQuery(this).has('.paid_media')){
        serv_ico(jQuery(this).find('.paid_media'), '-299px', '-96px');
      }
      if(jQuery(this).has('.analytics')){
        serv_ico(jQuery(this).find('.analytics'), '-398px', '-95px');
      }
      if(jQuery(this).has('.cont_marketing')){
        serv_ico(jQuery(this).find('.cont_marketing'), '-201px', '-96px');
      }
    }, function(){
      jQuery(this).find("p").fadeOut();
      jQuery(this).animate({backgroundColor: "#ebebeb"});
      if(jQuery(this).has(".line_graph")){
        serv_ico(jQuery(this).find(".line_graph"), '15px', '2px');
        // jQuery(this).find(".line_graph").css({"background-position": ""});
        // jQuery(this).find(".line_graph").animate({
        //   'background-position-x': '15px',
        //   'background-position-y': '2px'
        // }, 150, 'linear');
      }
      if(jQuery(this).has(".soc_media")){
        serv_ico(jQuery(this).find(".soc_media"), '-100px', '7px');
        // jQuery(this).find(".soc_media").animate({
        //   'background-position-x': '-100px',
        //   'background-position-y': '7px'
        // }, 150, 'linear');
      }
      if(jQuery(this).has('.websites')){
        serv_ico(jQuery(this).find('.websites'), '-505px', '1px');
      }
      if(jQuery(this).has('.paid_media')){
        serv_ico(jQuery(this).find('.paid_media'), '-299px', '7px');
      }
      if(jQuery(this).has('.analytics')){
        serv_ico(jQuery(this).find('.analytics'), '-399px', '1px');
      }
      if(jQuery(this).has('.cont_marketing')){
        serv_ico(jQuery(this).find('.cont_marketing'), '-202px', '7px');
      }
    });

    function serv_ico(ico, x, y){
      ico.animate({
        'background-position-x': x,
        'background-position-y': y
      }, 150, 'linear');
    }

    // jQuery(".srv").on("mouseout", function(e){
    //   // alert(jQuery(this).find("p").css("display"));
    //   if(jQuery(this).find("p").css("display") == "block")
    //      jQuery(this).find("p").fadeOut();
    // });

};


jQuery(document).ready(main);
