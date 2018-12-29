import tinycolor from 'tinycolor2';

let Colors = {

    init: () => {
        //TODO Replace with Modernizr-test when it comes out
        if (window.CSS && CSS.supports('color', 'var(--primary)')) {
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
        const root = document.querySelector(':root'),
            htmlStyle = window.getComputedStyle(root),
            ptc = htmlStyle.getPropertyValue('--primaryTextColor'),
            stc = htmlStyle.getPropertyValue('--secondaryTextColor');

        root.style.setProperty('--primaryColor', color.toRgbString());
        root.style.setProperty('--primaryTextColor', tinycolor.mostReadable(color, [ptc]).toRgbString());

        root.style.setProperty('--darkPrimaryColor', color.clone().darken(33.3).toRgbString());
        root.style.setProperty('--lightPrimaryColor', color.clone().lighten(33.3).toRgbString());
        root.style.setProperty('--lightPrimaryColorTransparent', color.clone().lighten(33.3).setAlpha(0.66).toRgbString());

        const acc = color.clone().spin(180).desaturate(25);
        root.style.setProperty('--accentColor', acc.toRgbString());
        root.style.setProperty('--secondaryTextColor', tinycolor.mostReadable(acc, [stc]).toRgbString());

        const metaThemeColor = document.querySelector('meta[name=theme-color]');
        metaThemeColor.setAttribute('content', color.toHexString());

        document.getElementById('funcR').setAttribute('tableValues', '0 ' + acc.toRgb().r / 255);
        document.getElementById('funcG').setAttribute('tableValues', '0 ' + acc.toRgb().g / 255);
        document.getElementById('funcB').setAttribute('tableValues', '0 ' + acc.toRgb().b / 255);
    }
};

export default Colors;
