/* global MLMenu */
import 'multilevelmenu/js/main.js';

export function init() {
    let navEl = document.querySelector('.navigation'),
        menuEl = document.getElementById('ml-menu'),
        btnEles = document.querySelectorAll('.js-btn--hamburger');

    new MLMenu(menuEl, {
        breadcrumbsCtrl: true,          // show breadcrumbs
        initialBreadcrumb: 'menu',      // initial breadcrumb text
        // itemsDelayInterval: 60,      // delay between each menu item sliding animation
        // onItemClick: loadDummyData,  // callback: item that doesn´t have a submenu gets clicked - onItemClick([event], [inner HTML of the clicked item])
        backCtrl: false                 // show back button
    });


    btnEles.forEach(function(element) {
        element.addEventListener('click', openMenu);
    });

    function openMenu() {
        document.body.classList.toggle('body--locked');
        navEl.classList.toggle('menu--open');

        btnEles.forEach(function(element) {
            element.classList.toggle('is-active');
        });
    }
}
