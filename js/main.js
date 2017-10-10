/*global $*/
$(document).ready(function () {
    "use strict";
    var mainSection = $('.main-section'),
        header = $('header'),
        nav = $('nav'),
        $window = $(window),
        li = $('nav .nav-list .list-item'),
        previousScroll = 0;
    
    // start preloader functions 
    
    var span = $('.letter'),
        tlSmell = new TimelineMax({repeat : -1}),
        tlLoading = new TimelineMax({repeat: -1, repeatDelay: 0.5});
        
    tlSmell
        .staggerFromTo($('svg .smell'), 3, {y: 50, autoAlpha: 0.5}, {y: -20, autoAlpha: 1}, 1);
    
    // tween max pol body 
    TweenMax.fromTo($('svg #body'), 3, {x: -1, repeat : -1, yoyo : true}, {x: 1, repeat : -1, yoyo : true}); /* repeatDelay: 1*/
//    TweenMax.fromTo($('svg #cap'), 0.3, {transform: 'rotate(5deg)', repeat : -1, yoyo : true}, {transform: 'rotate(-5deg)', repeat : -1, yoyo : true});
    
    tlLoading
        .staggerFromTo(span, 0.5, {y: -5}, {y : 5}, 0.1);
    
    // end preloader functions 
    
     
    // menu icon i mobile screen
    $('.nav-btn').on('click', function () {
        nav.toggleClass('active');
    });
    
    // menu effects
    $(document).on('click', function (e) {
        var clickOver = $(e.target);
        if (!clickOver.closest(header).length && nav.hasClass('active')) {
            nav.removeClass('active');
        }
    });
    
    // nav links 
    
    li.on('click', function () {
        $('html, body').animate({
            scrollTop : $($(this).data('target')).offset().top
        }, 1000);
    });
    
    // links active on scroll - feature #1 
    
    $(document).on('scroll', function () {
        
        var nextLi = $('nav .nav-list .list-item.active').next(),
            activeLiTarget = $($('nav .nav-list .list-item.active').data('target')).offset().top,
            nextLiTarget = $($('nav .nav-list .list-item.active').next().data('target')),
            newScroll = $(this).scrollTop();
        
        if (newScroll > 0 && newScroll < $(document).height() - $(window).height()) {
            
            // scroll down 
            if (newScroll > previousScroll) {
                
                $('nav .nav-list .list-item.active').each(function () {

                    // if this is first li
                    if (!$(this).is(':last-of-type')) {

                        if ($(document).scrollTop() >= nextLiTarget.offset().top - 10) {
                //            nextLiTarget.addClass('animte'); // add class animate one the div when reaching it 
                            nextLi.addClass('active').prev().removeClass('active');
                        }

                    } else {
                        $(this).addClass('active');

                    }
                });

            } else { // scroll up

                $('nav .nav-list .list-item.active').each(function () {

                    // if this is last li
                    if (!$(this).is(':first-of-type')) {

                        var prevLiTarget = $($('nav .nav-list .list-item.active').prev().data('target')),
                            prevLiTargetVal = parseInt(prevLiTarget.offset().top + prevLiTarget.innerHeight(), 0);

                        if ($(document).scrollTop() < prevLiTargetVal) {
                            $('nav .nav-list .list-item.active').removeClass('active').prev().addClass('active');
                        }

                    } else {
                        $(this).addClass('active');
                    }
                });
            }
            
            previousScroll = newScroll;
        }
        
    });
    
    // add class sticky on scroll
    
    function stickyNav() {
        
        if ($window.scrollTop() >= (mainSection.innerHeight() - header.height())) {
            if (!header.hasClass('sticky')) {
                header.addClass('sticky');
            }
        }

        if ($window.scrollTop() < (mainSection.innerHeight() - header.height())) {
            if (header.hasClass('sticky')) {
                header.removeClass('sticky');
            }
        }
        
        $window.on('scroll', function () {
            if ($window.scrollTop() >= (mainSection.innerHeight() - header.height())) {
                if (!header.hasClass('sticky')) {
                    header.addClass('sticky');
                }
            }

            if ($window.scrollTop() < (mainSection.innerHeight() - header.height())) {
                if (header.hasClass('sticky')) {
                    header.removeClass('sticky');
                }
            }
        });
    }
    
    stickyNav();
    
    //  links active |- background color -|  // i deactivated this because i use feature #1 now
//    $('.nav-list .list-item').on('click', function () {
//        $(this).addClass('active').siblings().removeClass('active');
//    });
    
    // links active |- animated border -|         *** special function :D *** // i disabled this also because i'm using feature 1
    
    function borderMoving() {
        
        var $listItem = $('.nav-list .list-item'),
            $activeItem = $('.nav-list .list-item.active'),
            $border = $('header .nav-list .border'),
            $span = $('nav ul span'),
            $listOffset = $activeItem.offset().left,
            $listWidth = $activeItem.css('width');

        $border.css({
            left : $listOffset,
            width : $listWidth
        });
        
        $listItem.on('click', function () {
            var listOffset = $(this).offset().left,
                listWidth = $(this).css('width');
            
//            $(this).addClass('active').siblings().removeClass('active');

            $span.animate({
                left : listOffset,
                width : listWidth
            }, 150);
        });
        
        $(window).on('resize', function () {
                        
            var listOffset = $('.nav-list .list-item.active').offset().left,
                listWidth = $('.nav-list .list-item.active').css('width');
            
            $span.css({
                left : listOffset,
                width : listWidth
            });
        });

    }
//    borderMoving();
    //                                              remove class active from the navbar in lg screens
    $(window).on('resize', function () {

        var width = $(this).outerWidth();
        
        if (width > 690 && nav.hasClass('active')) {
            nav.removeClass('active');
        }
    });
    
    /*              //              start menu slider           ******/
    
    function menuSlider() {
            
		var $sliderContainer = $('.menu-slider'),
		    $slider = $sliderContainer.find('.slider'),
		    $sliderBanner = $sliderContainer.find('.slider-banner'),
		    $sliderItems = $sliderBanner.find('.item'),
		    itemsLength = $sliderItems.length,
		    $nextBtn = $sliderContainer.find('.next'),
		    $prevBtn = $sliderContainer.find('.prev'),
		    slidesToShow = 3,
		    activeSlides = slidesToShow,
		    itemWidth,
		    itemsWidth;
        var left = 0,
		    itemMove = 0,
		    clicked = false;

		function leftCalc() {
			return parseInt(itemWidth * itemMove, 0);
		}
        
		function responsiveSlides() {
			activeSlides -= slidesToShow;
            
			if ($(window).width() <= 991 && $(window).width() > 550) {
				slidesToShow = 2;
//                itemMove += 1;
//                left = -leftCalc();
//                $sliderBanner.animate({left : left});
//                activeSlides += 1;
			} else if ($(window).width() <= 550) {
				slidesToShow = 1;
//                itemMove += 1;
//                left = -leftCalc();
//                $sliderBanner.animate({left : left});
//                activeSlides += 1;
			} else {
				slidesToShow = 3;
//                itemMove += 1;
//                left = -leftCalc();
//                $sliderBanner.animate({left : left});
//                activeSlides += 1;
			}
			activeSlides += slidesToShow;
		}
        responsiveSlides();

		$sliderItems.outerWidth(parseInt($slider.width() / slidesToShow, 0));
        
		function fixWidth() {
			itemWidth = parseInt($('.menu-slider .item').outerWidth(), 0);
			itemsWidth = parseInt(itemWidth * itemsLength, 0);
			$sliderBanner.width(itemsWidth);
		}
        fixWidth();
        


		$(window).resize(function () {
			responsiveSlides();
			$sliderItems.outerWidth(parseInt($slider.width() / slidesToShow, 0));
			fixWidth();
			leftCalc();
			$sliderBanner.css('left', -leftCalc());
		});

		function checkStatus() {
			if (activeSlides === itemsLength) {
				$nextBtn.addClass('disabled');
			} else {
				$nextBtn.removeClass('disabled');
			}

			if (activeSlides === slidesToShow) {
				$prevBtn.addClass('disabled');
			} else {
				$prevBtn.removeClass('disabled');
			}

		}
        checkStatus();

		

		$nextBtn.on('click', function () {
			if (!clicked) {
				if (activeSlides !== itemsLength) {
					clicked = true;
					itemMove += 1;
					left = -leftCalc();
					$sliderBanner.animate({left : left});
					activeSlides += 1;
					setTimeout(function () {
						clicked = false;
					}, 400);
					checkStatus();
				}
			}
		});


		$prevBtn.on('click', function () {
			if (!clicked) {
				if (activeSlides > slidesToShow) {
					clicked = true;
					itemMove -= 1;
					left = -leftCalc();
					$sliderBanner.animate({left : left});
					activeSlides -= 1;
					setTimeout(function () {
						clicked = false;
					}, 400);
					checkStatus();
				}
			}
		});
	}
    menuSlider();
    
    function chiefSlider() {
            
		var $sliderContainer = $('.chief-slider'),
		    $slider = $sliderContainer.find('.slider'),
		    $sliderBanner = $sliderContainer.find('.slider-banner'),
		    $sliderItems = $sliderBanner.find('.item'),
		    itemsLength = $sliderItems.length,
		    $nextBtn = $sliderContainer.find('.next'),
		    $prevBtn = $sliderContainer.find('.prev'),
		    slidesToShow = 1,
		    activeSlides = slidesToShow,
		    itemWidth,
		    itemsWidth;
        
		$sliderItems.outerWidth(parseInt($slider.width() / slidesToShow, 0));
        
		function fixWidth() {
			itemWidth = parseInt($('.chief-slider .item').outerWidth(), 0);
			itemsWidth = parseInt(itemWidth * itemsLength, 0);
			$sliderBanner.width(itemsWidth);
		}
        fixWidth();
        
        var left = 0,
		    itemMove = 0,
		    clicked = false;

		function leftCalc() {
			return parseInt(itemWidth * itemMove, 0);
		}


		$(window).resize(function () {
//			responsiveSlides();
			$sliderItems.outerWidth(parseInt($slider.width() / slidesToShow, 0));
			fixWidth();
			leftCalc();
			$sliderBanner.css('left', -leftCalc());
		});

		function checkStatus() {
			if (activeSlides === itemsLength) {
				$nextBtn.addClass('disabled');
			} else {
				$nextBtn.removeClass('disabled');
			}

			if (activeSlides === slidesToShow) {
				$prevBtn.addClass('disabled');
			} else {
				$prevBtn.removeClass('disabled');
			}

		}
        checkStatus();

		

		$nextBtn.on('click', function () {
			if (!clicked) {
				if (activeSlides !== itemsLength) {
					clicked = true;
					itemMove += 1;
					left = -leftCalc();
					$sliderBanner.animate({left : left});
					activeSlides += 1;
					setTimeout(function () {
						clicked = false;
					}, 400);
					checkStatus();
				}
			}
		});


		$prevBtn.on('click', function () {
			if (!clicked) {
				if (activeSlides > slidesToShow) {
					clicked = true;
					itemMove -= 1;
					left = -leftCalc();
					$sliderBanner.animate({left : left});
					activeSlides -= 1;
					setTimeout(function () {
						clicked = false;
					}, 400);
					checkStatus();
				}
			}
		});
	}
    chiefSlider();
    
    // scroll magic initialize
    var controller = new ScrollMagic.Controller();
    
    // build a scene - our story scene 1
    var scene1 = new ScrollMagic.Scene({
            triggerElement: '.our-story article',
            duration: '100%',
            triggerHook: 0.5, // from the top to bottom of the screen 0 - 1
            reverse: true // true is the default .. reverse the animation every scroll
        
        })
            // toggle a class when the scene start
            .setClassToggle('.our-story article', 'x-offset-left-fade-in')
            // require a plugin .. help in debug
//            .addIndicators({
//                name: 'x-offset-left',
//                colorTrigger: 'orange',
//                indent: 400,
//                colorStart: '#75c695',
//                colorEnd: '#3b579d'
//            })
            .addTo(controller);


    
    // our story scene 2
    var scene2 = new ScrollMagic.Scene({
            triggerElement: '.our-story .video',
            triggerHook: 0.5
        
        })
            .setClassToggle('.our-story .video', 'x-offset-left-fade-in')
            .addTo(controller);
    
    // menu section scroll magic scene and a gsap time line - amazing 
    // time line max - a tween for the menu section
    
    var tl = new TimelineMax();
    
    tl
        .fromTo('.menu .header .heading', 0.3, {y : -20, autoAlpha : 0}, {y : 0, autoAlpha : 1}, 0.3)
        .fromTo('.cards-group', 0.3, {x : -20, autoAlpha : 0}, {x : 0, autoAlpha : 1}, '+=.15');
        
    // menu section scene 
    
    var menuScene = new ScrollMagic.Scene({
            triggerElement: '.menu',
            triggerHook: 0.2
        
        })
            .setTween(tl)
            .addTo(controller);
    
    // testimonials  section
    // time line max - a tween for the testimonials  section
    
    var tlTestimonials  = new TimelineMax();
    
    tlTestimonials
        .fromTo($('.testimonials .icon'), 0.3, {y : 50, autoAlpha: 0}, {y: 0, autoAlpha: 1})
        .staggerFromTo($('.testimonials .quote .context span'), 0.1,
               {autoAlpha : 0, x : -20},
               {autoAlpha : 1, x : 0}, 0.1)
        .fromTo($('.testimonials .quote .author'), 0.3, {autoAlpha: 0}, {autoAlpha: 1});
        
    // testimonials section scene 
    
    var testimonialsScene = new ScrollMagic.Scene({
            triggerElement: '.testimonials',
            triggerHook: 0.5,
            reverse: false
        
        })
            .setTween(tlTestimonials)
            .addTo(controller);
    
    // review section tween
    
    var reviewTween = TweenMax.to($('#review-sec .chief .ratio-holder'), 1, {y: '90%'});
    
    // review section scene 
    
    var reviewScene = new ScrollMagic.Scene({
            triggerElement: '#review-sec',
            triggerHook: 0,
            duration : 400
        
        })
            .setTween(reviewTween)
            .addIndicators({
                name: 'review-pin',
                colorTrigger: 'orange',
                indent: 400,
                colorStart: '#75c695',
                colorEnd: '#3b579d'
            })
            .addTo(controller);
});

$(window).on('load', function () {
    "use strict";
    
    function loadFunc() {
        if ($('.pace').hasClass('pace-inactive')) {
        // gsap main sec animation 
        
            var tlMain = new TimelineMax();
            
            tlMain
                .to ($('.loading-wrapper'), 1, {y: -100, autoAlpha: 0})
                .to($('.pre-loader'), 1, {autoAlpha: 0})
                .from($('header nav .logo'), 1, {x: -20, autoAlpha: 0})
                .from($('header nav .nav-list'), 1, {x: 20, autoAlpha: 0}, 0)
                .from($('.main-section .heading'), 1, {y: -20, autoAlpha: 0})
                .from($('.main-section .section-info .info'), 1, {y: -20, autoAlpha: 0}, '-=0.5')
                .from($('.main-section .section-info .dish'), 1, {x: -20, autoAlpha: 0}, '-=0.5');
            clearInterval(interval);
        }
    }
    
    var interval = setInterval(loadFunc, 50);
    
});