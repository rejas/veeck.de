import 'core-js/es6/symbol';
import * as mqe from 'mediaquery-event/dist/mqe';

function cssButton() {
    const trigger = document.querySelector('.js-dl-trigger');

    trigger.onclick = () => {
        trigger.classList.toggle('is-active');

        if (trigger.classList.contains('is-active')) {
            $('body').off('click').children().on('click', function() {
                trigger.classList.remove('is-active');
            });
        }
    };
}

export function init() {
    const $myNav = $('nav').clone();

    document.addEventListener('mediaquery', function (event) {
        const nav = document.querySelector('nav');

        if (!event.detail.active) {
            return;
        }
        if (event.detail.media === 'desktop') {
            nav.parentNode.removeChild(nav);
            $myNav.clone().prependTo('header').removeClass('mobile-nav').addClass('desktop-nav');
            return;
        }
        if (event.detail.media === 'mobile') {
            nav.parentNode.removeChild(nav);
            $myNav.clone().prependTo('header').addClass('mobile-nav').removeClass('desktop-nav').dlmenu();
            cssButton();
        }
    });

    mqe.init({
        mediaqueries: [
            {name: 'mobile', media: 'screen and (max-width: 1023px)'},
            {name: 'desktop', media: 'screen and (min-width: 1024px)'}
        ]
    });
}
