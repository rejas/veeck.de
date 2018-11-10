'use strict';

// Libraries

import BrowserUpdate    from 'browser-update/update.npm.js';
import HalkaBox         from 'halkabox';
import Konami           from 'konami';
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
        console.log(
            "%s %c     ",
            "Congratulations, you found me. Have a beer!",
            'background: url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="98" height="100"><path fill="#D9D9D9" d="M85.715 26.547h-7.457c1.711-5.512.539-11.744-3.043-15.975-3.587-4.236-9.158-6.766-14.896-6.766-4.109 0-7.852 1.29-10.733 3.6-3.045-4.6-9.469-7.03-15.613-7.03-7.055 0-14.166 3.225-16.001 10.323a23.42 23.42 0 0 0-3.91-.347c-8.456 0-13.503 5.16-13.846 14.155-.185 4.844 1.047 8.677 3.662 11.394 1.359 1.413 3.049 2.442 4.988 3.094v48.546c0 6.663 5.421 12.083 12.083 12.083h43.364c6.662 0 12.084-5.42 12.084-12.083v-9.373l.002.001c.006 0 .013-.007.018-.008l9.305.004c6.661 0 12.084-5.419 12.084-12.083V38.63c-.007-6.662-5.428-12.083-12.091-12.083z"/><path fill="none" d="M85.715 32.589H75.023v-.178c-2.688 3-6.535 4.606-11.271 4.606-4.216 0-8.304-1.251-10.778-2.189-2.216 2.709-6.748 6.943-13.577 7.167-.236.008-.467.012-.696.012-6.706 0-10.612-3.162-12.737-5.904-2.943 2.091-7.034 3.49-11.06 3.669V87.54c0 3.321 2.719 6.041 6.042 6.041h43.366c3.322 0 6.041-2.72 6.041-6.041v-9.376c0-3.322 2.723-6.041 6.043-6.041h9.318c3.322 0 6.043-2.719 6.043-6.042v-27.45c.001-3.324-2.72-6.042-6.042-6.042z"/><path fill="none" d="M75.042 32.605h10.69c1.653 0 3.156.674 4.25 1.759a6.027 6.027 0 0 0-4.268-1.775H75.041l.001.016zM39.416 42.01c6.829-.225 11.361-4.458 13.576-7.167 2.476.938 6.562 2.188 10.777 2.188 4.727 0 8.567-1.6 11.254-4.588v-.032c-2.688 3-6.535 4.606-11.271 4.606-4.216 0-8.303-1.251-10.778-2.189-2.216 2.709-6.748 6.943-13.577 7.167-.236.008-.467.012-.696.012-4.608 0-7.895-1.493-10.189-3.317 2.295 1.831 5.586 3.332 10.207 3.332.23 0 .461-.004.697-.012zM14.923 87.557V39.788c4.025-.18 8.114-1.577 11.056-3.667l-.014-.018c-2.943 2.091-7.034 3.49-11.06 3.669V87.54a6.02 6.02 0 0 0 1.792 4.281 6.02 6.02 0 0 1-1.774-4.264z"/><path fill="#FF9C08" d="M80.162 59.326V45.717h-4.223V59.33h4.223z"/><path fill="none" d="M75.939 59.33h4.223V45.717h-4.223z"/><g fill="#FF9C08"><path d="M75.939 59.33h4.223V45.717h-4.223z"/><path d="M89.982 34.364a6.025 6.025 0 0 0-4.25-1.759H75.041v-.016h-.018v-.146c-2.687 2.988-6.527 4.588-11.254 4.588-4.215 0-8.302-1.25-10.777-2.188-2.215 2.709-6.747 6.942-13.576 7.167-.236.008-.467.012-.696.012-4.621 0-7.912-1.501-10.207-3.332a15.156 15.156 0 0 1-2.534-2.569c-2.942 2.09-7.031 3.487-11.056 3.667v47.769c0 1.66.68 3.17 1.774 4.265a6.021 6.021 0 0 0 4.25 1.76h43.366c3.322 0 6.041-2.72 6.041-6.041v-9.376c0-3.322 2.723-6.041 6.043-6.041h9.318c3.322 0 6.043-2.719 6.043-6.042v-27.45c0-1.662-.68-3.173-1.776-4.268zM85.6 59.297c.01.526-.062 2.496-1.494 3.98-.656.681-1.832 1.492-3.692 1.492h-7.19a2.722 2.722 0 0 1-2.721-2.72v-19.05a2.72 2.72 0 0 1 2.721-2.719h7.03c1.979 0 3.205.814 3.884 1.498 1.405 1.417 1.467 3.22 1.463 3.567v13.952z"/></g><path opacity=".3" fill="#FFF" d="M28.018 81.221a3.574 3.574 0 0 1-7.148 0 3.574 3.574 0 0 1 3.574-3.574 3.573 3.573 0 0 1 3.574 3.574z"><animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 50;0 -50;" dur="2.8s" repeatCount="indefinite"/></path><path opacity=".3" fill="#FFF" d="M39.018 51.221a3.574 3.574 0 0 1-7.148 0 3.574 3.574 0 0 1 7.148 0z"><animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 50;0 -50;" dur="4s" repeatCount="indefinite"/></path><path opacity=".3" fill="#FFF" d="M65.018 81.221a3.574 3.574 0 0 1-7.147 0 3.573 3.573 0 1 1 7.147 0z"><animateTransform attributeName="transform" attributeType="XML" type="translate" values="2 50;2 -50;" dur="2.2s" repeatCount="indefinite"/></path><path opacity=".3" fill="#FFF" d="M58.018 59.221a3.574 3.574 0 0 1-7.147 0 3.573 3.573 0 1 1 7.147 0z"><animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 50;0 -50;" dur="2.5s" repeatCount="indefinite"/></path><path opacity=".3" fill="#FFF" d="M23.165 61.221a1.72 1.72 0 1 1-3.441 0 1.721 1.721 0 0 1 3.441 0z"><animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 50;0 -50;" dur="3s" repeatCount="indefinite"/></path><path opacity=".3" fill="#FFF" d="M45.165 71.221a3.72 3.72 0 0 1-3.721 3.719 3.72 3.72 0 0 1 0-7.439 3.72 3.72 0 0 1 3.721 3.72z"><animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 50;0 -50;" dur="4s" repeatCount="indefinite"/></path><path opacity=".3" fill="#FFF" d="M43.877 86.221a2.433 2.433 0 0 1-2.434 2.432 2.433 2.433 0 0 1 0-4.866 2.433 2.433 0 0 1 2.434 2.434z"><animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 50;0 -50;" dur="3s" repeatCount="indefinite"/></path><path opacity=".3" fill="#FFF" d="M63.999 42.22a2.554 2.554 0 1 1-5.109 0 2.555 2.555 0 0 1 5.109 0z"><animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 50;0 -50;" dur="3s" repeatCount="indefinite"/></path><path opacity=".3" fill="#FFF" d="M23.109 46.601c0 .709-.575 1.283-1.285 1.283a1.284 1.284 0 0 1 0-2.567c.71 0 1.285.574 1.285 1.284z"><animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 50;0 -50;" dur="2s" repeatCount="indefinite"/></path><path opacity=".3" fill="#FFF" d="M53.075 49.444a1.282 1.282 0 1 1-2.567 0 1.283 1.283 0 1 1 2.567 0z"><animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 50;0 -50;" dur="2.5s" repeatCount="indefinite"/></path><path opacity=".3" fill="#FFF" d="M53.497 74.723c0 .711-.575 1.283-1.284 1.283a1.281 1.281 0 1 1 0-2.564 1.28 1.28 0 0 1 1.284 1.281z"><animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 50;0 -50;" dur="2.2s" repeatCount="indefinite"/></path><path opacity=".3" fill="#FFF" d="M26.061 70.771a1.283 1.283 0 1 1-2.567 0c0-.709.575-1.283 1.283-1.283a1.282 1.282 0 0 1 1.284 1.283z"><animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 50;0 -50;" dur="2s" repeatCount="indefinite"/></path><path opacity=".3" fill="#FFF" d="M65.877 68.221a2.433 2.433 0 0 1-2.434 2.432 2.434 2.434 0 0 1 0-4.866 2.433 2.433 0 0 1 2.434 2.434z"><animateTransform attributeName="transform" attributeType="XML" type="translate" values="-10 50;-10 -50;" dur="5s" repeatCount="indefinite"/></path></svg>\') left top no-repeat; color: #eee; font-size: 460px;'
        );
    });
});
