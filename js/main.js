/*global $*/
$(document).ready(function () {
    "use strict";
    var mainSection = $('.main-section'),
        header = $('header'),
        nav = $('nav'),
        $window = $(window),
        li = $('nav .nav-list .list-item'),
        previousScroll = 0;
     
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
    
    // build a scene 
    var scene1 = new ScrollMagic.Scene({
            triggerElement: '.our-story article',
            duration: '100%',
            triggerHook: .7, // from the top to bottom of the screen 0 - 1
            reverse: true // true is the default .. reverse the animation every scroll
        
        })
            // toggle a class when the scene start
            .setClassToggle('.our-story article', 'x-offset-left')
            // require a plugin .. help in debug
            .addIndicators({
                name: 'x-offset-left',
                colorTrigger: '#f00',
                indent: 200,
                colorStart: '#75c695',
                colorEnd: '#3b579d'
                
            })
            .addTo(controller);
    
});