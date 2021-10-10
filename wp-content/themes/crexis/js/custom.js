jQuery(window).on( "load unload", function($){

    'use strict';

	/* ==============================================
	PAGE LOADER
	============================================== */

    jQuery("#pageloader .spinner").delay(0).fadeOut("slow");
    jQuery("#pageloader").delay(300).fadeOut("slow");

    // Video Animated Controls

    if(jQuery(".hero-media-youtube.video-controls-animated").length > 0) {

    	setTimeout( function(){
    	    jQuery( '.hero-media-youtube.video-controls-animated .mb_YTVPBar' ).insertAfter( ".hero-media-youtube.video-controls-animated .home-text-slider h1" );
    	}, 5000);

    }

});

// Back-forward cache fix for Safari

jQuery(window).on( "pageshow", function(event) {
  'use strict';
  if (event.originalEvent.persisted) {
      window.location.reload()
  }
});

// Document Ready Scripts

( function ( $ ) {
	'use strict';

	$(document).ready(function() {

		/* ==============================================
		HOME PAGE IMAGE SLIDER (SUPER SLIDES)
		=============================================== */

		if($('.hero-fullscreen').length > 0) {

			$('.hero-fullscreen').each(function() {
				var playSpeed = $(this).data('slider-speed');
				if( !playSpeed ) playSpeed = 12000;
			 	jQuery(this).superslides({
				 	play: playSpeed,
			    	animation_speed: 600,
			    	usekeyboard: false,
				    animation: 'fade',
				    inherit_height_from: window
			    });

			    jQuery(this).on('animated.slides', function() {

			    	var currentSlide = jQuery(this).superslides('current');

			    	$(this).find('.slides-container div').removeClass('current-slide');
			    	$(this).find('.slides-container div:nth-child(' + (currentSlide + 1) + ')').addClass('current-slide');
			    });

		    });
		}

		if($('.fullscreen-slider').length > 0) {


		 	$('.fullscreen-slider').each(function() {

		 		var $inherit_height = jQuery(this);

		 		jQuery(this).superslides({
		 		 	play: 12000,
		 			animation_speed: 600,
		 			usekeyboard: false,
		 		    animation: 'fade',
		 		    inherit_height_from: '.button-slider'
		 		});

		 	});
		}

		/* ==============================================
		TEXT ROTATOR FOR HOME TEXTS
		=============================================== */

		if($('.text-rotator .rotate').length > 0) {
		    $(".text-rotator .rotate").textrotator({
		        animation: "dissolve",
		        speed: 4000,
				separator: ","
		    });
		}

		// RainyDay

		if($("#rainyday").length > 0) {

			var image = document.getElementById('rainyday');

			image.onload = function() {
				var engine = new RainyDay({
					image: this
				});
				// RainyDay Effect
				engine.rain([ [5, 4, 0.1], [2, 1.8, 0.1] ], 60 );
			};

			image.crossOrigin = 'anonymous';
			var imageSrc = $('#rainyday').data('image');

			$(image).attr('src', imageSrc);

			// Move Canvas
			setTimeout(function(){
				$('div + canvas').insertAfter('#rainyday');
			}, 100);

		}



		/* ==============================================
		NAVIGATION SECTION CHANGEABLE BACKGROUND SCRIPT
		=============================================== */

		    $('body').scrollspy({
		        target: '.navigation-menu',
		        offset: 90
		    })

		/* ==============================================
		TOOLTIPS AND POPOVER
		=============================================== */

		    //Tooltip Calling
		    $('[data-toggle="tooltip"]').tooltip()
		    // Popover Calling
		    $('[data-toggle="popover"]').popover()

		/* ==============================================
		HEADER 3 ROWS
		=============================================== */

		     $('.header-style-3').each(function(){
		        var headerWidth = $(this).outerWidth();
		        var innerWidth = $('.inner').outerWidth();
		        $(this).next('.header_rows').css({'width': innerWidth - headerWidth - 20 + 'px'});
		    });

		/* ==============================================
		NAVIGATION LABELS
		=============================================== */

		    $('.label').each(function(){
		        $(this).append('<span></span>')
		        var labelText = $(this).data('label-text');
		        var labelColor = $(this).data('label-color');
		        $(this).find('span').html(labelText).addClass(labelColor);
		    });

		/* ==============================================
		NAVIGATION SCROLL EFFECT
		===============================================  */

		    //Add Navigation Color
		    $('.white-nav > .navigation').addClass('white-nav');
		    $('.dark-nav > .navigation').addClass('dark-nav');
		    $('.colored-nav > .navigation').addClass('colored-nav');

		    //Clone Navigation
		    if($('body').hasClass('header-style-transparent-hamburger') || $('body').hasClass('page-template-template-fullpage')) {

		    } else {
		    	$(".double-nav").clone().insertAfter("#navigation");
		    }

		    //Select Second Nav
		    var sMenu = $('#navigation + .double-nav');
		    $(sMenu).addClass('second-nav').removeClass('first-nav');

		    var whiteLogo = $(sMenu).find('.logo-link img').data('second-logo');

		    $(sMenu).find('.logo-link img').attr( 'src', whiteLogo )

		    //Change Logo SRC For White Nav
		    $('.second-nav.white-nav .logo a img').each(function() {
		        var secondLogo = $(this).data('second-logo');
		        $(this).attr('src', secondLogo);
		    });

		    //AddClass for ScrollSpy
		    $('#navigation + .double-nav .nav-menu').addClass('navigation-menu');

		    var pagetopHeight = $('#pagetop').outerHeight();
		    var headerH = $('nav').outerHeight();
		    $('#pagetop + nav').css({'margin-top': pagetopHeight + 'px'});

		    //Second Nav Script
		    $(window).scroll(function () {
		        //Visible Second Nav Scripts
		        var y = $(this).scrollTop();

		        var section = $('body #page-content .vc_row:nth-of-type(1)');

		        if($('#page-header').length > 0) {
		        	section = $('#page-header');
		        } else if($('body #page-content .vc_row:nth-of-type(1)').length <= 0) {
		        	section = $('#navigation');
		        }

		        var homeH = section.outerHeight();

		        var headerH = $('nav').outerHeight();
		        var z = section.offset().top + homeH - headerH;
		        var topAmount = 0;

		        if($('#wpadminbar').length > 0) topAmount = 32;

		        if (y >= z) {
		            $(sMenu).css({top: topAmount + 'px'})

		        } else {
		            $(sMenu).css({top: '-130' + 'px'})
		        }
		    });// End Scroll Function



		/* ==============================================
		NAVIGATION DROP DOWN MENU
		=============================================== */

			jQuery('.nav-menu > .nav > .menu-item-has-children, .nav-menu .menu-item-has-children:not(".mega-menu") .menu-item-has-children, .vntd-nav-cart').each(function() {

				var navElement = jQuery(this);

        navElement.on( "mouseenter", function() {
					navElement.find('.dropdown-menu, .nav-cart-products').first().stop(true, true).fadeIn(200);
				});

        navElement.on( "mouseleave", function() {
					navElement.find('.dropdown-menu, .nav-cart-products').first().stop(true, true).fadeOut(200);
				});

			});

		 	jQuery('a.dropdown-toggle, .dropdown-menu a').on( 'touchend', function(){
		 	        var href = jQuery(this).attr('href');
		 	        location.href = href;
		 	})

			jQuery('body').on('touchstart.dropdown', '.dropdown-menu, .work-image', function (e) { e.stopPropagation(); });

      $('.nav-toggle').on( "mouseenter", function() {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeIn(250);
      });

      $('.nav-toggle').on( "mouseleave", function() {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeOut(0);
      });

			// Search Click Toggle

			var divNotifi = $('#search-dropdown');

			$(document).on( 'click', function (e)
			{
			    var container = $("#search-dropdown");
			    if (container.has(e.target).length === 0)
			    {
			        container.hide();
			    }
			});

			$('#search-toggle').on( 'click', function(e)
			{
			    if (divNotifi.is(":visible"))
			    {
			        divNotifi.stop(true, true).stop(true, true).fadeOut(50);
			    }
			    else
			    {
			        divNotifi.stop(true, true).fadeIn(250);
			    }
			    return false;
			});
//
//		    $('.nav a.scroll').on('click', function(){
//		        $('.dropdown-menu').fadeOut(200);
//		    })

		    $('.dropdown-menu.pull-center, .mega-menu > .dropdown-menu').each(function() {
		        var menuW = $(this).outerWidth();
		        if ($(window).width() > 1000) {
		            $(this).css({'left': - menuW / 2 + 40 + 'px'});
		        }
		    });

		/* ==============================================
		MOBILE NAV BUTTON
		=============================================== */

		    $( ".mobile-nav-button" ).on('click', function() {

		    	// If on sticky nav

		    	if ( $(this).closest( '.navigation' ).hasClass( 'second-nav' ) ) {
		    		window.scrollTo(0,0);
		    	}

		    	if( $( ".mobile-nav-button" ).hasClass('open') ) {
		    		$( ".mobile-nav-button" ).removeClass('open');
		    	} else {
		    		$( ".mobile-nav-button" ).addClass('open');
		    	}

		        $( "#navigation .mobile-nav" ).slideToggle( "medium", function() {
		        // Animation complete.
		        });

		    });

		    jQuery('#mobile-nav li.menu-item-has-children').append('<span class="dropdown-toggle"></span>');

    		jQuery('#mobile-nav .dropdown-toggle').on( 'click', function(event) {

    			var parent = jQuery(this).closest('li');
    			event.preventDefault();

    			parent.find("> .dropdown-menu").slideToggle("fast");

    		});

		    $( "#navigation + .navigation .mobile-nav-button" ).on('click', function() {
		        $( "#navigation + .navigation .nav-inner div.nav-menu" ).slideToggle( "medium", function() {
		        // Animation complete.
		        });
		    });

		    //Close Navigation For One Pages
		    $('nav ul.nav li a.scroll').on('click', function () {
		        if ($(window).width() < 1000) {
		            $("nav .nav-menu").slideToggle("2000")
		        }
		    });
		     $('nav + .navigation ul.nav li a.scroll').on('click', function () {
		        if ($(window).width() < 1000) {
		            $("nav + .navigation .nav-menu").slideToggle("2000")
		        }
		    });

		/* ==============================================
		FIT VIDEOS
		=============================================== */

		if($('.fitvid').length > 0) {
		     $(".fitvid").fitVids();
		}

		 /* ==============================================
		ALERT CLOSE
		=============================================== */

		    $(".alert .close").on('click', function() {
		        $(this).parent().animate({'opacity' : '0'}, 300).slideUp(300);
		        return false;
		    });

		/* ==============================================
		CONTENT OPTIONS
		=============================================== */

		   $(".content .video").each(function(){
		        'use strict';
		        // Add video button
		        $(this).append("<a class='play mp-video'></a>");
		        // Add background image
		        $(this).append("<span class='image'></span>");
		        var imageBg = $(this).data('image');
		        var videoLink = $(this).data('video');
		        $(this).find('a.play').attr({'href' : videoLink});
		        $(this).find("span.image").css({'background-image' : 'url(images/' + imageBg + ')' });
		    });

		/* ==============================================
		SOFT SCROLL EFFECT FOR NAVIGATION LINKS
		=============================================== */

		    $( '.scroll, .page-template-template-onepager .nav-menu a, a' ).on( 'click', function( event ) {

		        var $anchor = $(this);
		        var href = $anchor.attr( 'href' );

		        if ( !href ) {

		        } else {

			        if ( href.substring( 0, 1 ) == "#" && !$anchor.find('span').hasClass( 'vc_tta-title-text' ) ) {


			        	var headerH = $('#navigation, #navigation-fixed').outerHeight();
			        	var $target = $( $anchor.attr('href') );

			        	if ( $target.length <= 0 ) {

							if( $anchor.attr('href') == '#second' &&  $('#about').length > 0) {
								$target = $('#about');
							} else {
								$target = $('#navigation');
							}

			        	}

			        	var extra;
			        	extra = 0;

			        	if ( $(window).width() < 1000 ) {
			        		headerH = 0;
			        		extra = 0;
			        	}

			        	$('html, body').stop().animate({
	        	            scrollTop : $target.offset().top - headerH + extra + "px"
	        	        }, 1400, 'easeInOutExpo');

	        	        event.preventDefault();

			        }

		        }

		    });

		/* ==============================================
		FEATURES COLLAPSE
		=============================================== */

		    $( ".features-button a.f-button" ).on('click', function() {
		        var collapse = $('.f-collapse')
		        $(collapse).animate({
		            opacity: "toggle",
		            height: "toggle"
		        }, 700);
		    });

		/* ==============================================
		CAROUSEL SLIDER FOR BOXES / 3 ITEMS
		=============================================== */

		if($(".box-carousel.three-items").length > 0) {

		    var owlBox = $(".box-carousel.three-items");
		    var $carouselAutoplay = owlBox.data('autoplay');

            var slideSpeed = 800;

            if( owlBox.data('speed') ) {
                slideSpeed = owlBox.data('speed');
            }

		    // Add .box-carousel class to boxes div
		    owlBox.owlCarousel({
		    	autoPlay : $carouselAutoplay,
		        items : 3,
		        // Responsive Settings
		        itemsDesktop : [1169,3],
		        itemsDesktopSmall : [979,2],
		        itemsTablet : [800,2],
		        itemsTabletSmall : false,
		        itemsMobile : [560,1],
		        // End Responsive Settings
		        mouseDrag : false,
		        pagination : true,
		        navigation : true,
		        touchDrag : true,
                paginationSpeed : slideSpeed
		    });

		    // Arrows
		    $( ".boxes-type-4 .owl-prev" ).addClass( "fa fa-angle-left" );
		    $( ".boxes-type-4 .owl-next" ).addClass( "fa fa-angle-right" );

		}

		if($(".box-carousel.one-item").length > 0) {

		    var owlBox = $(".box-carousel.one-item");
		    var $carouselAutoplay = owlBox.data('autoplay');

            var slideSpeed = 800;

            if( owlBox.data('speed') ) {
                slideSpeed = owlBox.data('speed');
            }

		    // Add .box-carousel class to boxes div
		    owlBox.owlCarousel({
		    	autoPlay : $carouselAutoplay,
		        items : 1,
		        // Responsive Settings
		        itemsDesktop : [1169,1],
		        itemsDesktopSmall : [979,1],
		        itemsTablet : [800,1],
		        itemsTabletSmall : false,
		        itemsMobile : [560,1],
		        // End Responsive Settings
		        mouseDrag : true,
		        pagination : true,
		        navigation : true,
		        touchDrag : true,
                paginationSpeed : slideSpeed
		    });

		    // Arrows
		    $( ".boxes-type-4 .owl-prev" ).addClass( "fa fa-angle-left" );
		    $( ".boxes-type-4 .owl-next" ).addClass( "fa fa-angle-right" );

		}

		/* ==============================================
		CAROUSEL SLIDER FOR BOXES / 3 ITEMS / DRAGABLE
		=============================================== */

		if($(".box-carousel-dragable.three-items").length > 0) {

		    var owlBox = $(".box-carousel-dragable.three-items");

		    var $carouselAutoplay = owlBox.data('autoplay');

		    if( $carouselAutoplay == '' ) {
		    	$carouselAutoplay = true;
		    }

            var slideSpeed = 800;

            if( owlBox.data('speed') ) {
                slideSpeed = owlBox.data('speed');
            }

		    // Add .box-carousel class to boxes div
		    owlBox.owlCarousel({
		    	autoPlay : $carouselAutoplay,
		        items : 3,
		        // Responsive Settings
		        itemsDesktop : [1169,3],
		        itemsDesktopSmall : [979,2],
		        itemsTablet : [600,2],
		        itemsTabletSmall : false,
		        itemsMobile : [560,1],
		        // End Responsive Settings
		        mouseDrag : true,
		        pagination : false,
		        navigation : true,
		        touchDrag : true,
                paginationSpeed : slideSpeed
		    });

		}

		/* ==============================================
		CAROUSEL SLIDER FOR BOXES / 4 ITEMS
		=============================================== */

		if($(".box-carousel.four-items").length > 0) {

		    var owlBox = $(".box-carousel.four-items");

		    var $carouselAutoplay = owlBox.data('autoplay');

            var slideSpeed = 800;

            if( owlBox.data('speed') ) {
                slideSpeed = owlBox.data('speed');
            }

		    // Add .box-carousel class to boxes div
		    owlBox.owlCarousel({
		    	autoPlay : $carouselAutoplay,
		        items : 4,
		        // Responsive Settings
		        itemsDesktop : [1169,3],
		        itemsDesktopSmall : [979,3],
		        itemsTablet : [640,2],
		        itemsTabletSmall : false,
		        itemsMobile : [560,1],
		        // End Responsive Settings
		        mouseDrag : false,
		        pagination : true,
		        navigation : true,
		        touchDrag : true,
                paginationSpeed : slideSpeed
		    });

		}

		/* ==============================================
		CAROUSEL SLIDER FOR BOXES / 4 ITEMS / DRAGABLE
		=============================================== */

		if($(".box-carousel-dragable.four-items").length > 0) {

		    var owlBox = $(".box-carousel-dragable.four-items");

		    var $carouselAutoplay = owlBox.data('autoplay');

            var slideSpeed = 800;

            if( owlBox.data('speed') ) {
                slideSpeed = owlBox.data('speed');
            }

		    // Add .box-carousel class to boxes div
		    owlBox.owlCarousel({
		    	autoPlay : $carouselAutoplay,
		        items : 4,
		        // Responsive Settings
		        itemsDesktop : [1169,3],
		        itemsDesktopSmall : [979,3],
		        itemsTablet : [768,2],
		        itemsTabletSmall : false,
		        itemsMobile : [560,1],
		        // End Responsive Settings
		        mouseDrag : true,
		        pagination : false,
		        navigation : true,
		        touchDrag : true,
                slideSpeed : slideSpeed,
                paginationSpeed : slideSpeed
		    });

		}

		/* ==============================================
		CAROUSEL SLIDER FOR BOXES / 5 ITEMS
		=============================================== */

		if($(".box-carousel.five-items").length > 0) {

		    var owlBox = $(".box-carousel.five-items");

		    var $carouselAutoplay = owlBox.data('autoplay');

            var slideSpeed = 800;

            if( owlBox.data('speed') ) {
                slideSpeed = owlBox.data('speed');
            }

		    // Add .box-carousel class to boxes div
		    owlBox.owlCarousel({
		    	autoPlay : $carouselAutoplay,
		        items : 5,
		        // Responsive Settings
		        itemsDesktop : [1169,5],
		        itemsDesktopSmall : [979,4],
		        itemsTablet : [640,3],
		        itemsTabletSmall : false,
		        itemsMobile : [560,3],
		        // End Responsive Settings
		        mouseDrag : true,
		        pagination : false,
		        navigation : false,
		        touchDrag : true,
                paginationSpeed : slideSpeed
		    });

		}

		/* ==============================================
		CAROUSEL SLIDER FOR BOXES / 6 ITEMS
		=============================================== */

		if($(".box-carousel.six-items").length > 0) {

		    var owlBox = $(".box-carousel.six-items");

		    var $carouselAutoplay = owlBox.data('autoplay');

            var slideSpeed = 800;

            if( owlBox.data('speed') ) {
                slideSpeed = owlBox.data('speed');
            }

		    // Add .box-carousel class to boxes div
		    owlBox.owlCarousel({
		    	autoPlay : $carouselAutoplay,
		        items : 6,
		        // Responsive Settings
		        itemsDesktop : [1169,5],
		        itemsDesktopSmall : [979,4],
		        itemsTablet : [600,3],
		        itemsTabletSmall : false,
		        itemsMobile : [560,2],
		        // End Responsive Settings
		        mouseDrag : false,
		        pagination : true,
		        navigation : true,
		        touchDrag : true,
                paginationSpeed : slideSpeed
		    });

		}

		// Universal Carousel

		$(".vntd-carousel").each(function() {

			var owlBox = $(this);

			var $cols = owlBox.data('cols');

			var $cols_979,$cols_640,$cols_560,$cols_768;
			$cols_979 = $cols_640 = $cols_560 = $cols_768 = $cols;

			if($cols == 8 || $cols == 7 || $cols == 6 || $cols == 5 || $cols == 4) {
				$cols_979 = 4;
				$cols_640 = 3;
				$cols_560 = 2;
			} else if($cols == 2) {
				$cols_768 = 2;
			} else if($cols == 3) {
				$cols_560 = 2;
			}

			var $slideSpeed = 800;

			if( owlBox.data('speed') ) {
				$slideSpeed = owlBox.data('speed');
			}

			var $carouselAutoplay = owlBox.data('autoplay');

			// Add .box-carousel class to boxes div
			owlBox.owlCarousel({
			    items : $cols,
			    autoPlay : $carouselAutoplay,
			    // Responsive Settings
			    itemsDesktop : [1169,$cols],
			    itemsDesktopSmall : [979,$cols_979],
			    itemsTablet : [640,$cols_640],
			    itemsTabletSmall : false,
			    itemsMobile : [560,$cols_560],
			    // End Responsive Settings
			    mouseDrag : true,
			    pagination : owlBox.data('dots'),
			    navigation : false,
			    touchDrag : true,
				paginationSpeed : $slideSpeed
			});

		});

		/* ==============================================
		CAROUSEL SLIDER FOR CATEGORIES AND INNER SLIDER
		=============================================== */

		if($(".double-slider").length > 0) {

		    // Category Tag
		    var owlCategory = $(".double-slider");
		    // Inner Slider Tag

		    var $cols = owlCategory.data('cols');

            var slideSpeed = 800;

            if( owlCategory.data('speed') ) {
                slideSpeed = owlCategory.data('speed');
            }

		    // Categories Slider
		    owlCategory.owlCarousel({
		        items : $cols,
		        // Responsive Settings
		        itemsDesktop : [1170,3],
		        itemsDesktopSmall : [979,3],
		        itemsTablet : [800,2],
		        itemsTabletSmall : false,
		        itemsMobile : [560,1],
		        // End Responsive Settings
		        mouseDrag : false,
		        pagination : false,
		        navigation : true,
		        touchDrag : true,
		        paginationSpeed : slideSpeed,
		        // Top Navigation
		        afterInit : function(elem){
		            var that = this
		            that.owlControls.prependTo(elem)
		        }
		    });

		}

		if($(".inner-slider").length > 0) {

			var owlInnerSlider = $(".inner-slider");

			// Categories - Inner Slider
			owlInnerSlider.owlCarousel({
			      navigation : false, // Show next and prev buttons
			      slideSpeed : 300,
			      transitionStyle : "fade",
			      pagination : true,
			      paginationSpeed : 700,
			      // Will be active on all categories
			      autoPlay: false,
			      singleItem:true,
			      // "singleItem:true" is a shortcut for:
			      //items : 1
			      // itemsDesktop : false,
			      // itemsDesktopSmall : false,
			      // itemsTablet: false,
			      // itemsMobile : false
			});

		}


		/* ==============================================
		TESTIMONIALS
		=============================================== */

		if($('.testimonial-slide').length > 0) {

		    var gridContainer = $('.testimonial-slide'),
		        filtersContainer = $('#filters-container'),
		        wrap, filtersCallback;

		    gridContainer.cubeportfolio({
		        layoutMode: 'slider',
		        drag: true,
		        auto: true,
		        autoTimeout: 4000,
		        autoPauseOnHover: true,
		        showNavigation: false,
		        showPagination: true,
		        rewindNav: false,
		        scrollByPage: false,
		        gridAdjustment: 'responsive',
		        mediaQueries: [{
		            width: 1,
		            cols: 1
		        }],
		        gapHorizontal: 0,
		        gapVertical: 0,
		        caption: 'overlayBottomReveal',
		        displayType: 'lazyLoading',
		        displayTypeSpeed: 100
		    });

		}

		/* ==============================================
		CUSTOM IMAGE SLIDER
		=============================================== */

		if($('.basic_slider').length > 0) {

		    $('.basic_slider').flexslider({
		        animation: "fade",
		        selector: ".image_slider li",
		        controlNav: true,
		        directionNav: true,
		        animationSpeed: 500,
		        slideshowSpeed: 5000,
		        pauseOnHover: true,
		        direction: "vertical",
		        start: function(slider){
		            $('body').removeClass('loading');
		        }
		     });

		}

		if(typeof Swiper != 'undefined') {

		     if(jQuery('.vntd-image-slider').length > 0) {
		     	var swiper = new Swiper('.vntd-image-slider', {
		     		pagination: '.swiper-pagination',
		     		paginationClickable: true,
		     		nextButton: '.swiper-button-next',
		     		prevButton: '.swiper-button-prev',
		     		loop: true,
		     		onInit: function() {
		     			jQuery('.vntd-image-slider li a').each(function() {
		     				jQuery(this).magnificPopup({
		     				  type: 'image',
		     				  gallery: {
		     				     enabled:true
		     				   }
		     					// other options
		     				});
		     			});

		     		}
		     	});
		     }
	     }

		/* ==============================================
		FLEX SLIDER WITH IMAGE PAGINATION
		=============================================== */

		if($('.image-pgn-slider').length > 0) {

		    $('.image-pgn-slider').flexslider({
		        animation: "slide",
		        controlNav: "thumbnails"
		    });

		}

		/* ==============================================
		MAGNIFIC POPUP (LIGHTBOX PLUGIN)
		=============================================== */



		    // Magnific Popup Calling

		    if($('.image-link').length > 0) {
			    $('.image-link').magnificPopup({
			        type:'image',
			        mainClass: 'mfp-with-zoom mfp-img-mobile'
			    });
			}

			if($('.mp-video, mp-map').length > 0) {

			    $('.mp-video, mp-map').magnificPopup({
			        type:'iframe',
			        mainClass: 'mfp-with-zoom mfp-img-mobile'
			    });

			}

			if (typeof magnificPopup === 'function') {

			    //iframe scripts
			    $.extend(true, $.magnificPopup.defaults, {
			        iframe: {
			            patterns: {
			                //youtube videos
			                youtube: {
			                    index: 'youtube.com/',
			                    id: 'v=',
			                    src: 'http://www.youtube.com/embed/%id%?autoplay=1'
			                },
			                //vimeo videos
			                vimeo: {
			                    index: 'vimeo.com/',
			                    id: '/',
			                    src: 'http://player.vimeo.com/video/%id%?autoplay=1'
			                },
			                //google maps
			                gmaps: {
			                    index: '//maps.google.',
			                    src: '%id%&output=embed'
			                }
			            }
			        }
			    });

		    }

		    //for image gallery
		    $('.mp-gallery').each(function() { // the containers for all your galleries
		        $(this).magnificPopup({
		            delegate: 'a', // the selector for gallery item
		            type: 'image',
		            mainClass: 'mfp-with-zoom mfp-img-mobile',
		            gallery: {
		              enabled:true
		            }
		        });
		    });

		/* ==============================================
		VIDEO PLAYER
		=============================================== */

		if($('.player').length > 0) {

		    $(".player").mb_YTPlayer();

		}

		/* ==============================================
		CHANGE BG TONE WITH HOVER
		=============================================== */

		if($('#fullpage .feature-boxes').length > 0) {

		    $("#fullpage .feature-boxes").on('hover', function(){
		        $(".page_bg").animate({"opacity": 0.8}, 400);
		    }, function(){
		        $(".page_bg").animate({"opacity": 1}, 400);
		    });

		}

		/* ==============================================
		FULL SCREEN FEATURES SCRIPTS
		=============================================== */

		    // Translate to Images for FullPage Version Categories
		    jQuery('.translated_image').each(function(){
		        // Get Window Height
		        var wHeight = $(window).height();
		        // Get Image Width
		        var iWidth = $(this).find('img').width();
		        // Add Image Classes
		        $('.translated_image[data-image-position]').each(function() {
		            var $self = $(this);
		            $self.find('img').addClass($self.data('image-position'));
		        });
		        // Make 100% height for image
		        $(this).find('img').css({ 'height' : wHeight + 'px' });
		        $('.translated_image').css({ 'height' : wHeight + 'px' });
		        // Calculate left value for center class
		        $('.translated_image').find('img.center').css({ 'left' : - iWidth / 2 + 'px' });
		    });



		/* ==============================================
			Veented Slider
		=============================================== */

		if($('.veented-slider-fullscreen').length > 0) {

			var $height = $(window).height();
			var $extra = 0;

			if ($('#wpadminbar').length) {
				$extra = $extra + 28;
			}

			if (jQuery('#topbar').length > 0 && !jQuery('#site-navigation').hasClass('style-transparent')) {
				$extra = $extra + jQuery('#topbar').height();
			}

			if (!jQuery('#site-navigation').hasClass('style-transparent')) {
				$extra = $extra + jQuery('#site-navigation').height();
			}

			$('.veented-slider-holder').css('height',$height-$extra);

			jQuery(window).resize(function () {
				var $height = $(window).height();
				if($height > 400) {
					$('.veented-slider-holder').css('height',$height-$extra);
				}
			});
		}

		if($('.veented-slider').length > 0 && typeof Swiper != 'undefined') {

			var previousSlideID = 0;

			var varAutoplay = jQuery('.veented-slider-holder').data('slider-autoplay');
			var varEffect = jQuery('.veented-slider-holder').data('slider-effect');


			var swiper = new Swiper('.swiper-containers', {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				loop: true,
				autoplay: varAutoplay,
				preloadImages: false,
				lazyLoading: true,
				effect: varEffect,
				onInit: function(swiper) {
					swiper.stopAutoplay();
				},
				onLazyImageReady: function(swiper) {

					swiper.startAutoplay();

					if(!$('.veented-slider').hasClass('veented-slider-loaded')) {

						$('.veented-slider').addClass('veented-slider-loaded');

						$.when($('.veented-slider-loader').fadeOut(300)).done(function() {

							var sliderElements = [
								".veented-slide-secondary-heading",
								".veented-slide-heading",
								".veented-slide-paragraph",
								".veented-slide-buttons"
							];

							var delay = 50;

							$.each(sliderElements, function(element, elementClass) {

								if($('.swiper-slide-active '+elementClass).length > 0) {

									setTimeout(function(){

									    $('.swiper-slide-active '+elementClass).addClass( "fadeInUp visible" );

									  }, delay);

									delay += 250;

								}

							});

						});

					}

				},
				onSlideChangeEnd: function() {

					if($('.veented-slider').hasClass('veented-slider-loaded')) {

						var sliderElements = [
							".veented-slide-secondary-heading",
							".veented-slide-heading",
							".veented-slide-paragraph",
							".veented-slide-buttons"
						];

						var delay = 50;

						$.each(sliderElements, function(element, elementClass) {

							if($('.swiper-slide-active '+elementClass).length > 0) {

								setTimeout(function(){

								    $('.swiper-slide-active '+elementClass).addClass( "fadeInUp visible" );

								  }, delay);

								delay += 200;

							}

						});

						$('.swiper-slide').not('.swiper-slide-active').find('.animated').stop().removeClass('visible').removeClass('fadeInUp');

					}


				}
			});
		}

		$('.scroll-after-slider').each(function() {

			$(this).on('click', function(event) {

				event.preventDefault();

				var slider = $(this).closest('.vc_row');
				var scrollTo = slider.next();
				var navHeight = $('.second-nav').outerHeight();

				$('html,body').stop().animate({scrollTop: scrollTo.offset().top - navHeight
				}, 1200, 'easeInOutExpo');

			});

		});

		$('.scroll-after').each(function() { // For Revolution Slider

			$(this).on('click', function(event) {

				event.preventDefault();

				var slider = $(this).closest('.vc_row');
				var scrollTo = slider.next();
				var navHeight = $('.second-nav').outerHeight();

				$('html,body').stop().animate({scrollTop: scrollTo.offset().top - navHeight
				}, 1200, 'easeInOutExpo');

			});

		});

		/* ==============================================
		MOBILE BACKGROUND FOR VIDEO BACKGROUNDS
		=============================================== */


		//

		    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		        $('.mbYTP_wrapper').addClass('mobile-bg');
		        $('section, .parallax, .vc_row-has-fill').addClass('b-scroll');
		        $('.animated').addClass('visible');
		    }
		    else{

		        // Select to link
		        $('a.ex-link').on('click', function(){

		            var Exlink = this.getAttribute('href');
		            var emptyLink = jQuery(this).attr("href");

		            if(emptyLink === "#") {}
		            else{
						var pageLoader = $('#pageloader');

						if( pageLoader.length > 0 ) {
							pageLoader.fadeIn(700, function(){
							    document.location.href = Exlink;
							});
						} else {
							document.location.href = Exlink;
						}


		            }

		          return false;
		        });

		        //ANIMATED ITEMS

		        $('.animated').appear(function() {

		        	if ($(this).hasClass('animatedSlider')) return false;
		            var item = $(this);
		            var animation = item.data('animation');
		            if ( !item.hasClass('visible') ) {
		                var animationDelay = item.data('animation-delay');
		                if ( animationDelay ) {
		                    setTimeout(function(){
		                        item.addClass( animation + " visible" );
		                    }, animationDelay);
		                } else {
		                    item.addClass( animation + " visible" );
		                }
		            }
		        });
		        //alert("heks");

		        $('.vc_label_units').appear(function() {

		        	var item = $(this);
		        	setTimeout(function(){
		        	    item.addClass("progress-bar-label-visible");
		        	}, 30);

		        });

				if($('.parallax').length > 0) {

					$('.parallax').each(function() {
						$(this).parallax("50%", 0.3);
					});

			    }

			    if($('.parallax2').length > 0) {

			    	$('.parallax2').each(function() {
			    		$(this).parallax("30%", 0.15);
			    	});

			    }

			    if($('.parallax3').length > 0) {

			    	$('.parallax3').each(function() {
			    		$(this).parallax("30%", 0.3);
			    	});

			    }

			    if($('.parallax4').length > 0) {

			    	$('.parallax4').each(function() {
			    		$(this).parallax("50%", 0.3);
			    	});

			    }

			    if($('.parallax5').length > 0) {

			    	$('.parallax5').each(function() {
			    		$(this).parallax("50%", 0.3);
			    	});

			    }

			    if($('.parallax6').length > 0) {

			    	$('.parallax6').each(function() {
			    		$(this).parallax("50%", 0.3);
			    	});

			    }

			    if($('.parallax7').length > 0) {

			    	$('.parallax7').each(function() {
			    		$(this).parallax("50%", 0.3);
			    	});

			    }

			    if($('.parallax8').length > 0) {

			    	$('.parallax8').each(function() {
			    		$(this).parallax("50%", 0.3);
			    	});

			    }

			    if($('.parallax9').length > 0) {

			    	$('.parallax9').each(function() {
			    		$(this).parallax("50%", 0.3);
			    	});

			    }

			    if( $('.parallax-bg').length > 0 ) {

	            	$('.parallax-bg').each( function() {

	            		var classNames = $(this).attr('class').split(/\s+/);
	            		var currentItem = $(this);

	            		$.each(classNames, function(index, item) {

	            			if(item.indexOf("parallax-section-") == 0){
	            				$('.' + item).parallax("50%", 0.2);
	            				currentItem = null;
	            			}
	            		});

	            	});


	            }



		    }

		/* ==============================================
		CREXIS MARGIN AND PADDING RULER
		=============================================== */

		    // Calculate Margin Left
		    $('[class*="ml-"]').each(function() {
		        var valueRulerPointOne = $(this).attr('class').split("ml-")[1].split("")[0]
		        var valueRulerPointTwo = $(this).attr('class').split("ml-")[1].split("")[1]
		        $(this).css({'margin-left': valueRulerPointOne + valueRulerPointTwo + 'px'});
		    });
		    // Calculate Margin Top
		    $('[class*="mt-"]').each(function() {
		        var valueRulerPointOne = $(this).attr('class').split("mt-")[1].split("")[0]
		        var valueRulerPointTwo = $(this).attr('class').split("mt-")[1].split("")[1]
		       $(this).css({'margin-top': valueRulerPointOne + valueRulerPointTwo + 'px'});
		    });
		    // Calculate Margin Right
		    $('[class*="mr-"]').each(function() {
		        var valueRulerPointOne = $(this).attr('class').split("mr-")[1].split("")[0]
		        var valueRulerPointTwo = $(this).attr('class').split("mr-")[1].split("")[1]
		       $(this).css({'margin-right': valueRulerPointOne + valueRulerPointTwo + 'px'});
		    });
		    // Calculate Margin Bottom
		    $('[class*="mb-"]').each(function() {
		        var valueRulerPointOne = $(this).attr('class').split("mb-")[1].split("")[0]
		        var valueRulerPointTwo = $(this).attr('class').split("mb-")[1].split("")[1]
		       $(this).css({'margin-bottom': valueRulerPointOne + valueRulerPointTwo + 'px'});
		    });
		    // Calculate Padding Left
		    $('[class*="pl-"]').each(function() {
		        var valueRulerPointOne = $(this).attr('class').split("pl-")[1].split("")[0]
		        var valueRulerPointTwo = $(this).attr('class').split("pl-")[1].split("")[1]
		       $(this).css({'padding-left': valueRulerPointOne + valueRulerPointTwo + 'px'});
		    });
		    // Calculate Padding Top
		    $('[class*="pt-"]').each(function() {
		        var valueRulerPointOne = $(this).attr('class').split("pt-")[1].split("")[0]
		        var valueRulerPointTwo = $(this).attr('class').split("pt-")[1].split("")[1]
		       $(this).css({'padding-top': valueRulerPointOne + valueRulerPointTwo + 'px'});
		    });
		    // Calculate Padding Right
		    $('[class*="pr-"]').each(function() {
		        var valueRulerPointOne = $(this).attr('class').split("pr-")[1].split("")[0]
		        var valueRulerPointTwo = $(this).attr('class').split("pr-")[1].split("")[1]
		       $(this).css({'padding-right': valueRulerPointOne + valueRulerPointTwo + 'px'});
		    });
		    // Calculate Padding Bottom
		    $('[class*="pb-"]').each(function() {
		        var valueRulerPointOne = $(this).attr('class').split("pb-")[1].split("")[0]
		        var valueRulerPointTwo = $(this).attr('class').split("pb-")[1].split("")[1]
		       $(this).css({'padding-bottom': valueRulerPointOne + valueRulerPointTwo + 'px'});
		    });

		/* ==============================================
		CHECK FOR INTERNET EXPLORER
		=============================================== */

		    //Check if browser is IE or not
		    if (navigator.userAgent.search("MSIE") >= 0) {
		        $('br').addClass('iebr');
		        var logoH = $('.logo img').outerHeight();
		        $('.logo').css({"margin-top": - logoH / 2 + 'px'});
		    } else{}

		/* ==============================================
		NAVIGATION TYPE 2 - NAV CLOSE/OPEN
		=============================================== */

		    // Navigation Type 2 Scripts
		    var navt = $('#navigation-type2 .nav-menu');

		    $('#navigation.navigation-style-transparent-hamburger .nav-menu span').on('click', function () {
		        $('#navigation.navigation-style-transparent-hamburger .nav-menu ul').fadeToggle("slow");
		    });
		     $('#navigation.navigation-style-transparent-hamburger .nav-menu a').on('click', function () {
		        $('#navigation.navigation-style-transparent-hamburger .nav-menu ul').fadeOut("slow");
		    });

		/* ==============================================
		CALCULATE HOME INNER HEIGHT
		=============================================== */

		    // Add .vertical-center Class
		    $('.categories_full_screen .boxes .box .texts').addClass('vertical-center');
		    $('.home-inner').addClass('vertical-center');
		    // Calculate Height and Margin
		    $('.vertical-center').each(function(){
		        var itemH = $(this).outerHeight();
		        $(this).css({"margin-top": - itemH / 2 + 'px'});
		    });

		/* ==============================================
		COUNT FACTORS
		=============================================== */

		    jQuery(function() {

	    			jQuery(".vntd-counter").appear(function(){
	    				var dataperc;

	    				jQuery('.vntd-counter').each(function(){

	    			       	dataperc = jQuery(this).data('perc'),

	    					jQuery(this).find('.counter-number').delay(6000).countTo({
	    				        from: 0,
	    				        to: dataperc,
	    				        speed: 3000,
	    				        refreshInterval: 50,

	    	        		});
	    				});
	    			});
	    		});

	    	(function($) {
	    	    $.fn.countTo = function(options) {
	    	        // merge the default plugin settings with the custom options
	    	        options = $.extend({}, $.fn.countTo.defaults, options || {});

	    	        // how many times to update the value, and how much to increment the value on each update
	    	        var loops = Math.ceil(options.speed / options.refreshInterval),
	    	            increment = (options.to - options.from) / loops;

	    	        return jQuery(this).each(function() {
	    	            var _this = this,
	    	                loopCount = 0,
	    	                value = options.from,
	    	                interval = setInterval(vntd_updateTimer, options.refreshInterval);

	    	            function vntd_updateTimer() {
	    	                value += increment;
	    	                loopCount++;
	    	                jQuery(_this).html(value.toFixed(options.decimals));

	    	                if (typeof(options.onUpdate) == 'function') {
	    	                    options.onUpdate.call(_this, value);
	    	                }

	    	                if (loopCount >= loops) {
	    	                    clearInterval(interval);
	    	                    value = options.to;

	    	                    if (typeof(options.onComplete) == 'function') {
	    	                        options.onComplete.call(_this, value);
	    	                    }
	    	                }
	    	            }
	    	        });
	    	    };

	    	    $.fn.countTo.defaults = {
	    	        from: 0,  // the number the element should start at
	    	        to: 100,  // the number the element should end at
	    	        speed: 1000,  // how long it should take to count between the target numbers
	    	        refreshInterval: 100,  // how often the element should be updated
	    	        decimals: 0,  // the number of decimal places to show
	    	        onUpdate: null,  // callback method for every time the element is updated,
	    	        onComplete: null,  // callback method for when the element finishes updating
	    	    };
	    	})(jQuery);

		/* ==============================================
		ANIMATED SKILL BARS
		=============================================== */

		    jQuery('.progress-bar').appear(function(){
		        datavl = $(this).attr('data-value'),
		        // Add Data Value to Width
		        $(this).animate({ "width" : datavl + "%"}, 300);
		        // Create Span
		        $(this).append( "<span></span>" );
		        // Add value to Span
		        $(this).find("span").html( datavl + "%");
		    });

		/* ==============================================
		CATEGORIES FULL SCREEN - DATA TEXT AREAS
		=============================================== */

		    $('.categories_full_screen .box').each(function(){
		        // Find data-text
		        var itemText = $(this).find('a.read_more').data('text');
		        // Add Span with data-text
		        $(this).find('.texts').append('<span>' + itemText + '</span>');
		    });

		/* ==============================================
		FEATURES WITH MOBILE SCRIPTS
		=============================================== */

		    jQuery('.strips').each(function(){
		        var dataWidth = $(this).attr('data-width');
		        var dataHeight = $(this).attr('data-height');

		        // Change Width
		        $(this).css({ "width" : dataWidth + "px"});
		        // Change Height
		        $(this).css({ "height" : dataHeight + "px"});
		    });

		/* ==============================================
		SKROLLR SCRIPT
		=============================================== */

		if (typeof skrollr === 'object') {
			if (typeof skrollr !== 'undefined' && $('.vc_parallax').length < 0 || typeof skrollr !== 'undefined' && $('.veented-slide-inner.skrollable').length > 0) {

			    skrollr.init({
			        forceHeight: false,
			        mobileCheck: function() {
			            //hack - forces mobile version to be off
			            return false;
			        },
			        documentElement : "overflow_scroll_container"
			    });
			}
		}

		/* ==============================================
		TIMELINE
		=============================================== */

		    // Move Timeline Line Strip
		    $( ".timeline_line" ).insertAfter( ".timeline_items_wrapper" );
		    // Add Titles
		    $('#timeline .item').each(function(){
		        var imageTitle = $(this).attr('title')
		        $(this).find('.image-link').attr('title', imageTitle);
		    });
		    // ALL OPTIONS IN js/jquery.timeline.js file

		/* ==============================================
		BACK TO TOP BUTTON
		=============================================== */

		    // hide #back-top first
		    $("#back-top").hide();
		    // fade in #back-top
		    $(window).scroll(function () {
		        if ($(this).scrollTop() > 500) {
		            $('#back-top').fadeIn();
		        } else {
		            $('#back-top').fadeOut();
		        }
		    });
		    // Go to Top
		    $(".back-top").on('click', function() {
		        $("html, body").animate({ scrollTop: 0 }, 1400, 'easeInOutExpo');
		        return false;
		    });


	});

}( jQuery ));
