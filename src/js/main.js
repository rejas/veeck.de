/* global require, outdatedBrowser, Modernizr */
'use strict';

var Intro,
    Konami,
    ShareButton,
    Nav,
    Blazy;

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Event listener: DOM ready
function addLoadEvent(func) {
    var oldonload = window.onload;

    if (typeof window.onload !== 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        };
    }
}
// Call plugin function after DOM ready
addLoadEvent(function() {
    if (typeof outdatedBrowser !== 'undefined') {
        outdatedBrowser({
            bgColor: '#f25648',
            color: '#fefefe',
            lowerThan: 'transform',
            languagePath: ''
        });
    }
});

window.$ = window.jquery = window.jQuery = require('../bower_components/jquery/dist/jquery.js');
Blazy = require('../bower_components/bLazy/blazy.js');
Intro = require('./modules/intro.js');
Konami = require('./modules/konami.js');
Nav = require('./modules/nav.js');
ShareButton = require('../bower_components/share-button/share-button.js');

require('../bower_components/imgLiquid/js/imgLiquid.js');
require('../bower_components/imagelightbox2/src/imagelightbox.js');
require('../bower_components/ResponsiveMultiLevelMenu2/js/jquery.dlmenu.js');
require('../bower_components/cookieconsent2/src/cookieconsent.js');
require('../bower_components/slick-carousel/slick/slick.js');

$(document).ready(function() {

    var shareButton,
        gallery,
        bLazy;

    /**
     * ArticelIntroEffect
     */
    Intro.init();

    /**
     * Konami
     */
    Konami.init();

    /**
     * Navigation
     */
    Nav.init();

    /**
     *
     * @type {{message: string, dismiss: string, learnMore: string, link: null, theme: string}}
     */
    window.cookieconsent_options = {
        'message': 'This website uses cookies to ensure you get the best experience on our website',
        'dismiss': 'Got it!',
        'learnMore': 'More info',
        'link': null,
        'theme': 'dark-bottom'
    };

    /**
     * Back to top
     */
    $('.js-to-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
    });

    /**
     * Share Button Config
     */
    shareButton = new ShareButton({
        ui: {
            flyout: 'top left',
            button_font: false,
            icon_font: false
        },
        networks: {
            facebook: {
                app_id: '244426142407482'
            },
            email: {
                enabled: false
            }
        }
    });

    // my own extender
    $('.js-extender').on('click', function(e) {
        e.preventDefault();
        $('.' + $(this).data('toExtend')).slideToggle();
    });

    /**
     * Fill out the background header images
     */
    if (!Modernizr.objectfit) {
        $('.js-img-liquid').imgLiquid({
            useBackgroundSize: true
        });
    }

    /**
     * Lazyload images via blazy
     */
    bLazy = new Blazy({
        selector: '.js-lazyload',
        src: 'data-original',
        error: function(ele, msg) {
            if (msg === 'missing' || msg === 'invalid') {
                $(ele).attr('src', '');
            }
        }
    });

    /**
     * ImageLightBox
     */
    gallery = $('a.gallery, .gallery_article figure a');
    if (gallery.length > 0) {
        gallery.imageLightbox({
            activity:       true,
            caption:        true,
            lockBody:       true,
            navigation:     true,
            overlay:        true
        });
    }

    /**
     * Slider
     */
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '<button type="button" class="btn btn--l btn--comic btn-slick btn-slick-prev icon-font-left"></button>',
        nextArrow: '<button type="button" class="btn btn--l btn--comic btn-slick btn-slick-next icon-font-right"></button>',
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        asNavFor: '.slider-for',
        arrows: false,
        dots: true,
        centerMode: false,
        focusOnSelect: true
    });

    /**
     *
     */
    $.each($('.travel-article .fig_popup'), function( index, value ) {
        value.style.setProperty('--figure-angle-seed', (Math.random() * 8 - 4) + 'deg');
    });
});
