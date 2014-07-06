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
    var activityIndicatorOn = function()
        {
            $( '<div id="ilb-loading" class="spinner-loading spinner-fixed"><div></div></div>' ).appendTo( 'body' );
        },
        activityIndicatorOff = function()
        {
            $( '#ilb-loading' ).remove();
        },
        overlayOn = function()
        {
            $( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
        },
        overlayOff = function()
        {
            $( '#imagelightbox-overlay' ).remove();
        },
        captionOn = function()
        {
            var description = $( 'a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"] img' ).attr( 'alt' );
            if( description !== undefined && description.length > 0 ) {
               $( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
            }
        },
        captionOff = function()
        {
            $( '#imagelightbox-caption' ).remove();
        };

    var gallery = $("a.gallery, .gallery_article figure a");
    if (gallery.length > 0) {
        gallery.imageLightbox(
        {
            onStart: 	 function() { overlayOn(); },
            onEnd:	 	 function() { captionOff(); overlayOff(); activityIndicatorOff(); },
            onLoadStart: function() { captionOff(); activityIndicatorOn(); },
            onLoadEnd:	 function() { captionOn(); activityIndicatorOff(); }
        });
    }

    /**
     * Share Button Config
     */
    new window.Share('.shareButton', {
        ui: {
            flyout: "top right",
            button_font: false,
            icon_font: false
        },
        networks: {
            facebook: {
                app_id: "244426142407482"
            },
            email: {
                enabled: false
            }
        }
    });
});