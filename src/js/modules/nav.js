import 'MultiLevelMenu/js/main.js';

export function init() {
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
        menuEl.classList.add('menu--open');
    }

    function closeMenu() {
        menuEl.classList.remove('menu--open');
    }

    // simulate grid content loading
    var gridWrapper = document.querySelector('.content');

    function loadDummyData(ev, itemName) {
        ev.preventDefault();

        closeMenu();
        gridWrapper.innerHTML = '';
        gridWrapper.classList.add('content--loading');
        setTimeout(function() {
            gridWrapper.classList.remove('content--loading');
            gridWrapper.innerHTML = '<ul class="products">' + dummyData[itemName] + '<ul>';
        }, 700);
    }
}
