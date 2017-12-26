'use strict';

import 'cookieconsent/src/cookieconsent';

import BrowserUpdate    from 'browser-update';
import HalkaBox         from 'halkabox';
import Konami           from 'konami-code.js';
import VanillaTilt      from 'vanilla-tilt';

import Colors           from './modules/colors';
import Input            from './modules/input';
import Intro            from './modules/intro';
import Lazy             from './modules/lazy';
import Nav              from './modules/nav';
import Polyfill         from './modules/polyfill';

import styles_webpack   from '../css/main.less';

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
     * Back to top
     */
    document.querySelector('.js-to-top').addEventListener('click', () => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    });

    /**
     * Halka Image Lightbox
     */
    HalkaBox.run('js-gallery__image');

    /**
     * Travel picture transformations
     */
    document.querySelectorAll('.travel__article .figure--popup').forEach((figure) => {
        figure.style.setProperty('--figure-angle-seed', (Math.random() * 8 - 4) + 'deg');
    });

    VanillaTilt.init(document.querySelectorAll('.travel__article .figure--popup'), {
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
    document.querySelector('.js-share-facebook').addEventListener('click', () => {
        window.open('https://www.facebook.com/sharer/sharer.php?u='
            + encodeURIComponent(document.URL) + '&t='
            + encodeURIComponent(document.URL));
        return false;
    });
});
