;(function () {
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var parallax = function() {
		if ( !isMobile.any()) {
			$(window).stellar();
		}
	};

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#gtco-offcanvas, .js-gtco-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	    	if ( $('body').hasClass('offcanvas') ) {
    			$('body').removeClass('offcanvas');
    			$('.js-gtco-nav-toggle').removeClass('active');
	    	}
	    }
		});

	};



	var header = function() {
		$(window).scroll(function(){
			var st = $(window).scrollTop();
			if (st > 50) {
				$('.gtco-nav').addClass('scrolled');
				$('.nav-scrollable').addClass('scrolled');
			} else {
				$('.gtco-nav').removeClass('scrolled');
				$('.nav-scrollable').removeClass('scrolled');
			}
		});

	};

	var navigation = function() {

		$('body').on('click', '#gtco-offcanvas ul a:not([class="external"]), .main-nav a:not([class="external"])', function(event){
			var section = $(this).data('nav-section');
				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top - 55
			    	}, 500, 'easeInOutExpo');
			   }

			   if ($('body').hasClass('offcanvas')) {
			   	$('body').removeClass('offcanvas');
			   	$('.js-gtco-nav-toggle').removeClass('active');
			   }
		   event.preventDefault();
		   return false;
		});

	};


	var offcanvasMenu = function() {

		$('body').prepend('<div id="gtco-offcanvas" />');
		$('body').prepend('<a href="#" class="js-gtco-nav-toggle gtco-nav-toggle"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#gtco-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#gtco-offcanvas').append(clone2);

		$('#gtco-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#gtco-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-gtco-nav-toggle').removeClass('active');

	    	}
		});
	};


	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('.main-nav > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};

	var burgerMenu = function() {

		$('body').on('click', '.js-gtco-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('offcanvas') ) {
				$('body').removeClass('offcanvas');
			} else {
				$('body').addClass('offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 25);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".gtco-loader").fadeOut("slow");
	};

	
	var engagementTabs = function () {
		var container = $('#engagementTab');

		/**
		 * When a role (the image with hover) was selected
		 *
		 * @param {string} roleName
		 */
		function onRoleSelected(roleName) {
			$('[data-on-role]', container).hide();
			$('[data-on-role*="' + roleName + '"]', container).show();
		}

		function onLoadSelectInitialValue() {
			$('[data-role-initially-selected="true"]', container).click();
		}

		/**
		 * Event bound to images with hover
		 * Checkboxes support
		 */
		$('.engagement-tab').click(function (element) {
			var roleElement = $('[data-role]', element.currentTarget);
			var currentlySelectedRole = roleElement.attr('data-role');

			$('.engagement-checkbox img').prop('src', 'images/icons/checkbox-unchecked.png');
			roleElement.prop('src', 'images/icons/checkbox-checked.png');

			onRoleSelected(currentlySelectedRole);
		});

		onLoadSelectInitialValue();
	};

	var contact = function () {
		/**
		 * Hidding mail contact from bots
		 */
		$('[data-adr]').each(function (index, element) {
			var tagName = element.tagName.toLowerCase();
			element = $(element);

			if (tagName === 'span') {
				element.html(atob(element.attr('data-adr')));
			}

			else if (tagName === 'a') {
				element.attr('href', atob(element.attr('data-adr')));
			}
		});
	};


	$(function(){
		parallax();
		mobileMenuOutsideClick();
		header();
		navigation();
		offcanvasMenu();
		burgerMenu();
		navigationSection();
		contentWayPoint();
		dropdown();
		goToTop();
		loaderPage();
		engagementTabs();
		contact();
	});
}());