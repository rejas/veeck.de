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
import 'responsivemultilevelmenu/js/jquery.dlmenu';
import 'slick-carousel/slick/slick';

import * as Colors from './modules/colors';
import * as Input  from './modules/input';
import * as Intro  from './modules/intro';
import * as Nav    from './modules/nav';
import * as TNS    from 'tiny-slider/src/tiny-slider';

import Blazy            from 'blazy';
import Konami           from 'konami-code.js';
import objectFitImages  from 'object-fit-images';
import Smoothscroll     from 'smoothscroll-polyfill';
import ShareButton      from 'share-button/dist/share-button';

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
     * Input
     */
    Input.init();

    /**
     * Navigation
     */
    Nav.init();

    /**
     * Back to top
     */
    Smoothscroll.polyfill();

    document.querySelector('.js-to-top').onclick = () => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
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
        objectFitImages();
    }

    /**
     * Lazyload images via blazy
     */
    new Blazy({
        selector: '.js-lazyload',
        src: 'data-original',
        error: function(element, message) {
            if (message === 'missing' || message === 'invalid') {
                element.setAttribute('src', '');
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
     */
    TNS.tns({
        container: document.querySelector('.slider-for'),
        navContainer: document.querySelector('.slider-nav'),
        items: 1,
        slideBy: 'page'
    });

    /**
     * Travel picture angle randomization
     */
    Array.prototype.forEach.call(document.getElementsByClassName('js-travel_figure'), function(figure) {
        figure.style.setProperty('--figure-angle-seed', (Math.random() * 8 - 4) + 'deg');
    });

    /**
     * Use konami code for css linting
     */
    new Konami(function() {
        document.body.className += ' debug';
    });
});
