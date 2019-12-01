import ScrollMagic from 'scrollmagic';
import Smoothscroll from 'smoothscroll-polyfill';

let ButtonBar = {

    init: () => {
        // Used in Back-to-top button
        Smoothscroll.polyfill();

        /**
         * ScrollMagic
         */
        let controller = new ScrollMagic.Controller();
        new ScrollMagic.Scene({
            triggerElement: '.js-button-bar',
            triggerHook: 'onEnter',
            offset: '150'
        })
            .setPin('.js-button-bar')
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
    }
};

export default ButtonBar;
