/*global $*/

window.$myVars =
{
    // Initialize all the queries you want to use more than once
    nav : $('nav').clone()
};

$(document).ready(function ()
{
    "use strict";

    // my own fade plugin
    $("nav li a").fadeLink("#main");

    // my own extender
    $(".extender").on("click", function () {
        $(".extend").slideToggle();
    });

    /**
     * decide if mobile or not
     * @type {Array}
     */
    var queries = [
        {
            context: 'mobile',
            match: function() {
                $('nav').remove();
                $myVars.nav.clone().prependTo('header').dlmenu();
            },
            unmatch: function() {
            }
        },
        {
            context: 'desktop',
            match: function() {
                $('nav').remove();
                $myVars.nav.clone().prependTo('header').initMenu();
            },
            unmatch: function() {
            }
        }
    ];
    MQ.init(queries);

    /**
     * Lazy Load - jQuery plugin for lazy loading images
     */
    $("img.lazy").lazyload({
        effect : "fadeIn"
    });

    /**
     * Dropdown style all <select> elements
     */
    $('#char_region').dropdown({
        gutter : 5,
        stack : false,
        slidingIn : false,
        zindex: 15
    });

    $('#guild_region').dropdown({
        gutter : 5,
        stack : false,
        slidingIn : false,
        zindex: 10
    });

    $(".imgLiquidFill").imgLiquid({useBackgroundSize: true});

    $("div.more").on("click", function() {
        $.smoothScroll({
            scrollElement: $('body'),
            scrollTarget: '#main',
            easing: 'linear',
            speed: 500,
            offset: -100
        });
        return false;
    });

    /**
     * Photoswipe
     */
    var gallery = $("a.gallery, .gallery_article figure a");
    if (gallery.length > 0) {
        gallery.imageLightbox();
    }

    /**
     * Share Button Config
     */
    new Share('.shareButton', {
        ui: {
            flyout: "top right",
            button_font: "false",
            button_background: "#333",
            button_color: "#fff"
        },
        networks: {
            facebook: {
                app_id: "244426142407482"
            }
        }
    });
});