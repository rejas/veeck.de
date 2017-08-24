import 'MultiLevelMenu/js/main.js';

export function init() {
    let menuEl = document.getElementById('ml-menu'),
        mlmenu = new MLMenu(menuEl, {
            breadcrumbsCtrl: true,         // show breadcrumbs
            initialBreadcrumb: 'menu',    // initial breadcrumb text
            // itemsDelayInterval: 60,      // delay between each menu item sliding animation
            // onItemClick: loadDummyData,  // callback: item that doesn´t have a submenu gets clicked - onItemClick([event], [inner HTML of the clicked item])
            backCtrl: false                 // show back button
        }),
        openMenuCtrl = document.querySelector('.action--open'),
        closeMenuCtrl = document.querySelector('.action--close');

    openMenuCtrl.addEventListener('click', openMenu);
    closeMenuCtrl.addEventListener('click', closeMenu);

    function openMenu() {
        menuEl.classList.add('menu--open');
    }

    function closeMenu() {
        menuEl.classList.remove('menu--open');
    }
}
