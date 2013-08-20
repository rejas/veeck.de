$(document).ready(function ()
{
    // my own fade plugin
    $('nav li a').fadeLink('#main');

    // http://www.sycha.com/jquery-smooth-scrolling-internal-anchor-links
    var lastNavItem;
    $('.scroll').on('click', function (event) {
        if (lastNavItem) {
            lastNavItem.removeClass('active');
        }
        lastNavItem = $(this).parent();
        lastNavItem.addClass('active');
        event.preventDefault();
        $('html,body').animate({scrollTop: $(this.hash).offset().top}, 500);
    });

    $(".extender").on('click', function (event) {
        $('.extend').slideToggle();
    });

    // Run Marco van Hylckama Vlieg's jQuery Menu plugin (see plugins.js)
    $('.menu').initMenu();

    // Run Matt Kersley's jQuery Responsive menu plugin (see plugins.js)
    $('ul#respmenu').mobileMenu({
        combine: false,
        switchWidth: 1007                  // width (in px to switch at)
    });

    // Lazy Load - jQuery plugin for lazy loading images (see plugins.js)
    $("img.lazy").lazyload({
        effect : "fadeIn"
    });

    var $container = $('#container.isotope');
    $container.isotope({
        // options
        itemSelector : 'figure',
        layoutMode: "perfectMasonry",
        perfectMasonry: {
            layout: "vertical",      // Set layout as vertical/horizontal (default: vertical)
            columnWidth: 160,        // Set/prefer specific column width (liquid layout tries to prefer said width)
            liquid: false
        }
    })
});