
import 'classie/lib/classie.js';
import 'MultiLevelMenu/js/main.js';

(function() {
    var menuEl = document.getElementById('ml-menu'),
        mlmenu = new MLMenu(menuEl, {
            // breadcrumbsCtrl : true, // show breadcrumbs
            // initialBreadcrumb : 'all', // initial breadcrumb text
            backCtrl : false, // show back button
            // itemsDelayInterval : 60, // delay between each menu item sliding animation
            onItemClick: loadDummyData // callback: item that doesn´t have a submenu gets clicked - onItemClick([event], [inner HTML of the clicked item])
        });

    // mobile menu toggle
    var openMenuCtrl = document.querySelector('.action--open'),
        closeMenuCtrl = document.querySelector('.action--close');

    openMenuCtrl.addEventListener('click', openMenu);
    closeMenuCtrl.addEventListener('click', closeMenu);

    function openMenu() {
        classie.add(menuEl, 'menu--open');
    }

    function closeMenu() {
        classie.remove(menuEl, 'menu--open');
    }

    // simulate grid content loading
    var gridWrapper = document.querySelector('.content');

    function loadDummyData(ev, itemName) {
        ev.preventDefault();

        closeMenu();
        gridWrapper.innerHTML = '';
        classie.add(gridWrapper, 'content--loading');
        setTimeout(function() {
            classie.remove(gridWrapper, 'content--loading');
            gridWrapper.innerHTML = '<ul class="products">' + dummyData[itemName] + '<ul>';
        }, 700);
    }
})();

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
