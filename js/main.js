/*global $*/
$(document).ready(function () {
    "use strict";

    $('.isotope figure.skyscraper img').resizecrop({
        width:136,
        height:286
    });

    $('.isotope figure.quader img').resizecrop({
        width:286,
        height:286
    });

    $('.isotope figure.wide img').resizecrop({
        width:286,
        height:136
    });

    $('.isotope figure.normal img').resizecrop({
        width:286,
        height:136
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

    // decide if mobile or not
    if ($(window).width() < 1024)
    {
        $('#mobilemenu').dlmenu();
    } else {
        $("#desktopmenu").initMenu();
    }

    // Lazy Load - jQuery plugin for lazy loading images (see plugins.js)
    $("img.lazy").lazyload({
        effect : "fadeIn"
    });

    // Style all <select> elements
    $( '#char_region' ).dropdown( {
        gutter : 5,
        stack : false,
        slidingIn : 100
    } );
    // Style all <select> elements
    $( '#guild_region' ).dropdown( {
        gutter : 5,
        stack : false,
        slidingIn : 100
    } );


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

    var addthis_config = addthis_config||{};
    addthis_config.pubid = 'ra-4f4bb62e22bbd641';
    addthis_config.data_track_addressbar = true;
    addthis.init();
});