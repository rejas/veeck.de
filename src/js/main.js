'use strict';

// Libraries

import BrowserUpdate    from 'browser-update/update.npm.js';
import HalkaBox         from 'halkabox';
import Konami           from 'konami';
import ScrollMagic      from 'scrollmagic';
import VanillaTilt      from 'vanilla-tilt';

// Modules
import Colors           from './modules/colors';
import Input            from './modules/input';
import Lazy             from './modules/lazy';
import Polyfill         from './modules/polyfill';
// Styles
import '../css/main.scss';

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Check browser version
     */
    BrowserUpdate({
        api: 2018.05,
        insecure: true,
        unsupported: true,
        required: {
            e:12,f:-2,o:-2,s:-2,c:-2
        }
    });

    /**
     * Init all polyfills
     */
    Polyfill.init();

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
     * ScrollMagic
     */
    let controller = new ScrollMagic.Controller();
    new ScrollMagic.Scene({
        triggerElement: '.buttonBar',
        triggerHook: 'onEnter',
        offset: '150'
    })
        .setPin('.buttonBar', { pushFollowers: false })
        .addTo(controller);

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
});
