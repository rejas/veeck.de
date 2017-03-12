'use strict';

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

    window.cookieconsent.initialise({
        "palette": {
            "popup": {
                "background": "#252e39"
            },
            "button": {
                "background": "#14a7d0"
            }
        },
        "theme": "classic"
    })
});

import 'cookieconsent2/src/cookieconsent';
import 'imagelightbox2/src/imagelightbox';
import 'imgLiquid/js/imgLiquid.js';
import 'ResponsiveMultiLevelMenu2/js/jquery.dlmenu';
import 'slick-carousel/slick/slick';

import * as Konami from './modules/konami';
import * as Intro  from './modules/intro';
import * as Nav    from './modules/nav';

import Blazy       from 'bLazy';
import ShareButton from 'share-button/share-button';

$(document).ready(function() {

    /**
     * ArticleIntroEffect
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
     * Back to top
     */
    $('.js-to-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
    });

    /**
     * my own extender
     * TODO replace with :target?
     */
    $('.js-extender').on('click', function(e) {
        e.preventDefault();
        $('.' + $(this).data('toExtend')).slideToggle();
    });

    /**
     * Share Button Config
     */
    new ShareButton({
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

    /**
     * Fill out the background header images
     * TODO remove and replace with simpler fallback
     */
    if (Modernizr.objectfit) {
        $('.js-img-liquid').imgLiquid({
            useBackgroundSize: true
        });
    }

    /**
     * Lazyload images via blazy
     */
    new Blazy({
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
    $('a.gallery, .gallery_article figure a').imageLightbox({
        activity:       true,
        caption:        true,
        lockBody:       true,
        navigation:     true,
        overlay:        true
    });

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
     * Travel picture angle randomization
     */
    $.each($('.travel-article .fig_popup'), function( index, value ) {
        value.style.setProperty('--figure-angle-seed', (Math.random() * 8 - 4) + 'deg');
    });
});
