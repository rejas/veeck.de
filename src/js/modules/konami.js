/* global require, module */
'use strict';

require('../../bower_components/konami-code/src/jquery.konami.js');

/**
 *    CSS provides HSL color mode that controls Hue, Saturation, Luminosity(Lightness) and optionaly Opacity
 *
 *    color: hsla(50, 80%, 20%, 0.5);
 *    background-color: hsl(120, 100%, 50%);
 *
 *    hex —> hex color value such as “#abc” or “#123456″ (the hash is optional)
 *    lum —> luminosity factor: -0.1 is 10% darker, 0.2 is 20% lighter
 */
function convertColorLuminance(hex, lum) {
    var rgb = '#', c, i;

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ('00' + c).substr(c.length);
    }

    return rgb;
}

module.exports = {

    init: function() {

        $( window ).konami({

            cheat: function() {
                /**
                 * Change custom colors if browser supports it
                 */
                if (window.CSS && window.CSS.supports && window.CSS.supports('--primaryColor', 0)) {
                    // CSS custom properties supported.
                    var root = document.querySelector(':root'),
                        htmlStyle = window.getComputedStyle(root);

                    htmlStyle.getPropertyValue('--primaryColor');
                    root.style.setProperty('--primaryColor', '#ffeb3b');
                    root.style.setProperty('--lightPrimaryColor', convertColorLuminance('ffeb3b', 0.15));
                    root.style.setProperty('--darkPrimaryColor', convertColorLuminance('ffeb3b', -0.15));
                }
            }
        });
    }
};
