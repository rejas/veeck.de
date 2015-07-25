/**
 * Created by veeck on 19.05.15.
 */

var Share = require('../components/share-button/build/share.js');

require ('../components/imgLiquid/js/imgLiquid.js');
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
});
