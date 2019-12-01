import tinycolor from 'tinycolor2';

let Colors = {

    init: () => {
        if (Modernizr.customproperties) {
            const header = document.querySelector('header');
            let newColor;

            if (header) {
                newColor = header.getAttribute('data-color');
            }

            if (!newColor) {
                newColor = tinycolor.random().toHsl();
            } else {
                newColor = tinycolor('#' + newColor);
            }

            newColor.l = 0.5;

            Colors.changeColor(tinycolor(newColor));
        }
    },

    changeColor: (color) => {
        const root = document.querySelector(':root');

        // Update basic colors
        const rgb = color.toRgb();
        root.style.setProperty('--red', rgb.r);
        root.style.setProperty('--green', rgb.g);
        root.style.setProperty('--blue', rgb.b);

        root.style.setProperty('--darkPrimaryColor', color.clone().darken(33.3).toRgbString());
        root.style.setProperty('--lightPrimaryColor', color.clone().lighten(33.3).toRgbString());
        root.style.setProperty('--lightPrimaryColorTransparent', color.clone().lighten(33.3).setAlpha(0.66).toRgbString());

        // Create an accent color, not used ATM
        const acc = color.clone().spin(180).desaturate(25);
        root.style.setProperty('--accentColor', acc.toRgbString());

        // Update the meta theme color responsible for switching chromes mobile theme
        const metaThemeColor = document.querySelector('meta[name=theme-color]');
        metaThemeColor.setAttribute('content', color.toHexString());

        // Update filter colors
        document.getElementById('funcR').setAttribute('tableValues', '0 ' + acc.toRgb().r / 255);
        document.getElementById('funcG').setAttribute('tableValues', '0 ' + acc.toRgb().g / 255);
        document.getElementById('funcB').setAttribute('tableValues', '0 ' + acc.toRgb().b / 255);
    }
};

export default Colors;
