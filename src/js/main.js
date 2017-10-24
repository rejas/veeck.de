/* global Modernizr */
'use strict';

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


import './modules/polyfill';

import 'cookieconsent/src/cookieconsent';
import 'imagelightbox';

import BrowserUpdate    from 'browser-update';
import Konami           from 'konami-code.js';
import objectFitImages  from 'object-fit-images';
import Smoothscroll     from 'smoothscroll-polyfill';

import * as Colors      from './modules/colors';
import * as Input       from './modules/input';
import * as Intro       from './modules/intro';
import * as Lazy        from './modules/lazy';
import * as Nav         from './modules/nav';

import styles_webpack   from '../css/main.less';

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Check browser version
     */
    BrowserUpdate();

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
     * Lazyload images
     */
    Lazy.init();

    /**
     * Navigation
     */
    Nav.init();

    /**
     * Fill out the background header images
     */
    if (!Modernizr.objectfit) {
        objectFitImages();
    }

    /**
     * Back to top
     */
    Smoothscroll.polyfill();

    document.querySelector('.js-to-top').addEventListener('click', () => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    });

    /**
     * ImageLightBox
     */
    $('.js-gallery__image').imageLightbox({
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
    document.querySelectorAll('.travel__article .figure--popup').forEach((figure) => {
        figure.style.setProperty('--figure-angle-seed', (Math.random() * 8 - 4) + 'deg');
    });

    /**
     * Use konami code for css linting
     */
    new Konami(() => {
        document.body.className += ' debug';
    });

    /**
     * Share to facebook
     */
    document.querySelector('.js-share-facebook').addEventListener('click', () => {
        window.open('https://www.facebook.com/sharer/sharer.php?u='
            + encodeURIComponent(document.URL) + '&t='
            + encodeURIComponent(document.URL));
        return false;
    });
});

