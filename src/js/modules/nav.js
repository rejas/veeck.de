/* global MLMenu */
import 'multilevelmenu';

let Nav = {

    init: () => {
        let navEl = document.querySelector('.navigation'),
            menuEl = document.getElementById('ml-menu'),
            btnEles = document.querySelectorAll('.js-btn--hamburger');

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

        btnEles.forEach((element) => {
            element.addEventListener('click', () => {
                navEl.classList.toggle('menu--open');

                btnEles.forEach((element) => {
                    element.classList.toggle('is-active');
                });
            });
        });

        document.addEventListener('click', (event) => {
            if (!navEl.contains(event.target)) {
                navEl.classList.remove('menu--open');

                btnEles.forEach((element) => {
                    element.classList.remove('is-active');
                });
            }
        });
    }
};

export default Nav;
