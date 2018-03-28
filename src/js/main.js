'use strict';

// Libraries
import 'cookieconsent';

import AOS              from 'aos';
import BrowserUpdate    from 'browser-update';
import galite           from 'ga-lite';
import HalkaBox         from 'halkabox';
import Konami           from 'konami';
import VanillaTilt      from 'vanilla-tilt';

// Modules
import Colors           from './modules/colors';
import Input            from './modules/input';
import Intro            from './modules/intro';
import Lazy             from './modules/lazy';
import Nav              from './modules/nav';
import Polyfill         from './modules/polyfill';

// Styles
import '../css/main.less';

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Check browser version
     */
    BrowserUpdate();

    /**
     * Init all polyfills
     */
    Polyfill.init();

    /**
     * Cookie Consent
     */
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

    /**
     * AOS
     */
    AOS.init();

    /**
     * Colors
     */
    Colors.init();

    /**
     * Input
     */
    Input.init();

    /**
     * Intro
     */
    Intro.init();

    /**
     * Lazyload images
     */
    Lazy.init();

    /**
     * Navigation
     */
    Nav.init();

    /**
     * Back to top
     */
    let toTop = document.querySelector('.js-to-top');
    if (toTop) {
        toTop.addEventListener('click', () => {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        });
    }

    /**
     * Halka Image Lightbox
     */
    HalkaBox.run('js-gallery__image');

    /**
     * Travel picture transformations
     */
    document.querySelectorAll('.js-travel__picture').forEach((figure) => {
        figure.style.setProperty('--figure-angle-seed', (Math.random() * 8 - 4) + 'deg');
    });

    VanillaTilt.init(document.querySelectorAll('.js-travel__picture'), {
        max: 10,
        scale: 1.1,
        speed: 250
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
    let facebook = document.querySelector('.js-share-facebook');
    if (facebook) {
        facebook.addEventListener('click', () => {
            window.open('https://www.facebook.com/sharer/sharer.php?u='
                + encodeURIComponent(document.URL) + '&t='
                + encodeURIComponent(document.URL));
            return false;
        });
    }

    /**
     * Google Analytics Lite
     */
    galite('create', 'UA-431999-1', 'auto');
    galite('send', 'pageview');

    /**
     * Header Parallax Scroll
     */
    const header = document.querySelector('header');
    const speed = 0.2;
    header.style.transform = 'translateY( calc( var(--scrollparallax) * 1px ) )';

    function setScrollParallax() {
        header.style.setProperty('--scrollparallax', (document.body.scrollTop || document.documentElement.scrollTop) * speed);
        window.requestAnimationFrame( setScrollParallax );
    }

    window.requestAnimationFrame( setScrollParallax );
});
