/**
 *
 */

var Share = require('../components/share-button/build/share.js');

require ('../components/animsition/dist/js/jquery.animsition.js');
require ('../components/imgLiquid/js/imgLiquid.js');
require ('../components/imagelightbox2/dist/imagelightbox.min.js');
require ('../components/jquery.lazyload/jquery.lazyload.js');

$(document).ready(function () {
    "use strict";

    /**
     * Share Button Config
     */
    new Share ('.shareButton', {
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

    /**
     * Fill out the background header images
     */
    $(".js-img-liquid").imgLiquid({
        useBackgroundSize: true
    });

    /**
     * Lazy Load - jQuery plugin for lazy loading images
     */
    $("img.lazy").lazyload({
        effect : "fadeIn"
    });

    /**
     * Animsitions
     */
    $(".js-animsition").animsition({

        inClass               :   'zoom-in-sm',
        outClass              :   'zoom-out-sm',
        inDuration            :    1500,
        outDuration           :    800,
        linkElement           :   '.animsition-link',
        // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
        loading               :    true,
        loadingParentElement  :   'body', //animsition wrapper element
        loadingClass          :   'animsition-loading',
        unSupportCss          : [ '-webkit-animation-duration',
                                  '-o-animation-duration',
                                  'animation-duration'
        ],
        //"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
        //The default setting is to disable the "animsition" in a browser that does not support "animation-duration".

        overlay               :   false,

        overlayClass          :   'animsition-overlay-slide',
        overlayParentElement  :   'body'
    });

    /**
     * ImageLightBox
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
});
