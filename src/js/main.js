'use strict';

// Libraries

import AOS              from 'aos';
import BrowserUpdate    from 'browser-update/update.npm.js';
import HalkaBox         from 'halkabox';
import Konami           from 'konami';
import VanillaTilt      from 'vanilla-tilt';

// Modules
import Colors           from './modules/colors';
import Input            from './modules/input';
import Lazy             from './modules/lazy';
import Nav              from './modules/nav';
import Polyfill         from './modules/polyfill';

// Styles
import '../css/main.less';

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Check browser version
     */
    BrowserUpdate({
        api: 2018.05,
        insecure: true,
        unsupported: true,
        required: {
            e:11,f:-2,o:-2,s:-2,c:-2
        }
    });

    /**
     * Init all polyfills
     */
    Polyfill.init();

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
     * Header Parallax Scroll
     */
    const header = document.querySelector('header');
    const speed = 0.2;

    function setScrollParallax() {
        header.style.setProperty('--scrollparallax', (document.body.scrollTop || document.documentElement.scrollTop) * speed);
        window.requestAnimationFrame( setScrollParallax );
    }

    if (header) {
        header.style.transform = 'translateY( calc( var(--scrollparallax) * 1px ) )';
        window.requestAnimationFrame( setScrollParallax );
    }
});
