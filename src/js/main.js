/* global outdatedBrowser, Modernizr */
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
        'palette': {
            'popup': {
                'background': '#252e39'
            },
            'button': {
                'background': '#14a7d0'
            }
        },
        'theme': 'classic'
    });
});

import styles_webpack from '../css/main.less';

import 'cookieconsent/src/cookieconsent';
import 'imagelightbox/src/imagelightbox';
import 'imgLiquid/js/imgLiquid';
import 'ResponsiveMultiLevelMenu2/js/jquery.dlmenu';
import 'slick-carousel/slick/slick';
import 'konami-code/src/jquery.konami';

import * as Colors from './modules/colors';
import * as Intro  from './modules/intro';
import * as Nav    from './modules/nav';

import Blazy       from 'blazy';
import ShareButton from 'share-button/dist/share-button';

document.addEventListener('DOMContentLoaded', function () {

    /**
     * ArticleIntroEffect
     */
    Intro.init();

    /**
     * Colors
     */
    Colors.init();

    /**
     * Navigation
     */
    Nav.init();

    /**
     * Back to top
     */
    document.getElementsByClassName('js-to-top')[0].onclick = (event) => {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
    };

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
     */
    if (!Modernizr.objectfit) {
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
        fullscreen:     true,
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
        prevArrow: '<button type="button" class="btn btn--l btn--comic btn-slick btn-slick-prev"></button>',
        nextArrow: '<button type="button" class="btn btn--l btn--comic btn-slick btn-slick-next"></button>',
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
    $.each($('.travel-article figure.fig_popup'), function( index, value ) {
        value.style.setProperty('--figure-angle-seed', (Math.random() * 12 - 6) + 'deg');
    });

    /**
     * Use konami code for css linting
     */
    $( window ).konami({
        cheat: function() {
            $('body').addClass('debug');
        }
    });
});
