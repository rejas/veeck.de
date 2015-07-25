/**
 * Created by veeck on 19.05.15.
 */

var Share = require('../components/share-button/build/share.js');


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
});
