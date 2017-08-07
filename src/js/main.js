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
import 'imagelightbox';
import 'responsivemultilevelmenu/js/jquery.dlmenu';

import * as Colors from './modules/colors';
import * as Input  from './modules/input';
import * as Intro  from './modules/intro';
import * as Nav    from './modules/nav';

import Blazy            from 'blazy';
import browserUpdate    from 'browser-update';
import Konami           from 'konami-code.js';
import Smoothscroll     from 'smoothscroll-polyfill';

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Check browser version
     */
    browserUpdate();

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
    $('.gallery__image > a, .js-travel_figure > a').imageLightbox({
        activity:       true,
        caption:        true,
        fullscreen:     true,
        lockBody:       true,
        navigation:     true,
        overlay:        true
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

    /**
     * Share to facebook
     */
    document.querySelector('.js-btn-share').onclick = () => {
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL) + '&t=' + encodeURIComponent(document.URL));
        return false;
    };
});
