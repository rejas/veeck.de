/* global MLMenu */
import 'multilevelmenu';

let Nav = {
    init: () => {
        let navEl = document.querySelector('.navigation'),
            menuEl = document.getElementById('ml-menu'),
            btnClose = document.querySelector('.js-close-menu'),
            btnOpen = document.querySelector('.js-open-menu');

        if (!menuEl) {
            return;
        }

        new MLMenu(menuEl, {
            breadcrumbsCtrl: true,          // show breadcrumbs
            initialBreadcrumb: 'menu',      // initial breadcrumb text
            // itemsDelayInterval: 60,      // delay between each menu item sliding animation
            // onItemClick: loadDummyData,  // callback: item that doesn´t have a submenu gets clicked - onItemClick([event], [inner HTML of the clicked item])
            backCtrl: false                 // show back button
        });

        btnClose.addEventListener('click', () => {
            navEl.classList.remove('menu--open');
            btnOpen.classList.toggle('is-active');
        });

        btnOpen.addEventListener('click', (event) => {
            event.stopImmediatePropagation();

            navEl.classList.toggle('menu--open');
            btnOpen.classList.toggle('is-active');
        });

        document.addEventListener('click', (event) => {
            if (navEl.classList.contains('menu--open') && !navEl.contains(event.target)) {
                navEl.classList.remove('menu--open');
                btnOpen.classList.toggle('is-active');
            }
        });
    }
};

export default Nav;
