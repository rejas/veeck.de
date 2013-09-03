$(document).ready(function () {
    "use strict";

    $('.isotope figure.skyscraper img').resizecrop({
        width:146,
        height:306
    });

    $('.isotope figure.quader img').resizecrop({
        width:306,
        height:306
    });

    $('.isotope figure.wide img').resizecrop({
        width:306,
        height:146
    });

    $('.isotope figure.normal img').resizecrop({
        width:306,
        height:146
    });

    // my own fade plugin
    $("nav li a").fadeLink("#main");

    // http://www.sycha.com/jquery-smooth-scrolling-internal-anchor-links
    var lastNavItem;
    $(".scroll").on("click", function (event) {
        if (lastNavItem) {
            lastNavItem.removeClass("active");
        }
        lastNavItem = $(this).parent();
        lastNavItem.addClass("active");
        event.preventDefault();
        $("html,body").animate({scrollTop: $(this.hash).offset().top}, 500);
    });

    // my own extender
    $(".extender").on("click", function () {
        $(".extend").slideToggle();
    });

    // Run Marco van Hylckama Vlieg's jQuery Menu plugin (see plugins.js)
    $(".menu").initMenu();

    // Run Matt Kersley's jQuery Responsive menu plugin (see plugins.js)
    $("ul#respmenu").mobileMenu({
        combine: false,
        switchWidth: 1007
    });

    // Lazy Load - jQuery plugin for lazy loading images (see plugins.js)
    $("img.lazy").lazyload({
        effect : "fadeIn"
    });

    var $container = $('#container.isotope');
    if ($container.length > 0) {
        $container.isotope({
            // options
            itemSelector : 'figure',
            masonry: {
                columnWidth: 160
            }
        });
    }
});