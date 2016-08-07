/* global require, outdatedBrowser, Modernizr */
'use strict';

var Intro,
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

window.$ = window.jQuery = require('../bower_components/jquery/dist/jquery.js');
Blazy = require('../bower_components/bLazy/blazy.js');
Intro = require('./modules/intro.js');
Nav = require('./modules/nav.js');
ShareButton = require('../bower_components/share-button/share-button.js');

require('../bower_components/imgLiquid/js/imgLiquid.js');
require('../bower_components/imagelightbox2/src/imagelightbox.js');
require('../bower_components/ResponsiveMultiLevelMenu2/js/jquery.dlmenu.js');
require('../bower_components/cookieconsent2/cookieconsent.js');

$(document).ready(function() {

    /**
     *    CSS provides HSL color mode that controls Hue, Saturation, Luminosity(Lightness) and optionaly Opacity
     *
     *    color: hsla(50, 80%, 20%, 0.5);
     *    background-color: hsl(120, 100%, 50%);
     *
     *    hex —> hex color value such as “#abc” or “#123456″ (the hash is optional)
     *    lum —> luminosity factor: -0.1 is 10% darker, 0.2 is 20% lighter
     */
    function convertColorLuminance(hex, lum) {
        var rgb = '#', c, i;

        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ('00' + c).substr(c.length);
        }

        return rgb;
    }

    /**
     * Change custom colors if brwoser supports it
     */
    if (window.CSS && window.CSS.supports && window.CSS.supports('--primaryColor', 0)) {
        // CSS custom properties supported.
        var root = document.querySelector(':root');
        var htmlStyle = window.getComputedStyle(root);

        htmlStyle.getPropertyValue('--primaryColor');
        root.style.setProperty('--primaryColor', '#ffeb3b');
        root.style.setProperty('--lightPrimaryColor', convertColorLuminance('ffeb3b', 0.15));
        root.style.setProperty('--darkPrimaryColor', convertColorLuminance('ffeb3b', -0.15));
    }

    /**
     * ArticelIntroEffect
     */
    Intro.init();

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
    var shareButton = new ShareButton({
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
    var bLazy = new Blazy({
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
    var gallery = $('a.gallery, .gallery_article figure a');
    if (gallery.length > 0) {
        gallery.imageLightbox({
            activity:       true,
            caption:        true,
            navigation:     true,
            overlay:        true
        });
    }
});
