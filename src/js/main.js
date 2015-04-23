/*global $*/

window.$myVars =
{
    // Initialize all the queries you want to use more than once
    nav : $('nav').clone()
};

$(document).ready(function ()
{
    "use strict";

    // replace no-js class if the browsers supports js
    document.documentElement.className =
        document.documentElement.className.replace("no-js","js");

    // my own extender
    $(".extender").on("click", function () {
        $(".extend").slideToggle();
    });

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


(function() {

    // detect if IE : from http://stackoverflow.com/a/16657946
    var ie = (function(){
        var undef,rv = -1; // Return value assumes failure.
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');

        if (msie > 0) {
            // IE 10 or older => return version number
            rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        } else if (trident > 0) {
            // IE 11 (or newer) => return version number
            var rvNum = ua.indexOf('rv:');
            rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
        }

        return ((rv > -1) ? rv : undef);
    }());


    // disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = [32, 37, 38, 39, 40], wheelIter = 0;

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function keydown(e) {
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                preventDefault(e);
                return;
            }
        }
    }

    function touchmove(e) {
        preventDefault(e);
    }

    function wheel(e) {
        // for IE
        //if( ie ) {
        //preventDefault(e);
        //}
    }

    function disable_scroll() {
        window.onmousewheel = document.onmousewheel = wheel;
        document.onkeydown = keydown;
        document.body.ontouchmove = touchmove;
    }

    function enable_scroll() {
        window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
    }

    var docElem = window.document.documentElement,
        scrollVal,
        isRevealed,
        noscroll,
        isAnimating,
        container = document.getElementById( 'container' ),
        trigger = container.querySelector( 'button.trigger' );

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    function scrollPage() {
        scrollVal = scrollY();

        if( noscroll && !ie ) {
            if( scrollVal < 0 ) return false;
            // keep it that way
            window.scrollTo( 0, 0 );
        }

        if( classie.has( container, 'notrans' ) ) {
            classie.remove( container, 'notrans' );
            return false;
        }

        if( isAnimating ) {
            return false;
        }

        if( scrollVal <= 0 && isRevealed ) {
            toggle(0);
        }
        else if( scrollVal > 0 && !isRevealed ){
            toggle(1);
        }
    }

    function toggle( reveal ) {
        isAnimating = true;

        if( reveal ) {
            classie.add( container, 'modify' );
        }
        else {
            noscroll = true;
            disable_scroll();
            classie.remove( container, 'modify' );
        }

        // simulating the end of the transition:
        setTimeout( function() {
            isRevealed = !isRevealed;
            isAnimating = false;
            if( reveal ) {
                noscroll = false;
                enable_scroll();
            }
        }, 1200 );
    }

    // refreshing the page...
    var pageScroll = scrollY();
    noscroll = pageScroll === 0;

    disable_scroll();

    if( pageScroll ) {
        isRevealed = true;
        classie.add( container, 'notrans' );
        classie.add( container, 'modify' );
    }

    window.addEventListener( 'scroll', scrollPage );
    trigger.addEventListener( 'click', function() { toggle( 'reveal' ); } );
})();