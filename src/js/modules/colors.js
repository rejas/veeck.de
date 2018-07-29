import tinycolor from 'tinycolor2';

function changeColor (color) {
    const root = document.querySelector(':root'),
        htmlStyle = window.getComputedStyle(root),
        ptc = htmlStyle.getPropertyValue('--primaryTextColor'),
        stc = htmlStyle.getPropertyValue('--secondaryTextColor');

    root.style.setProperty('--primaryColor', color.toRgbString());
    root.style.setProperty('--primaryTextColor', tinycolor.mostReadable(color, [ptc]).toRgbString());

    root.style.setProperty('--darkPrimaryColor', color.clone().darken(33.3).toRgbString());
    root.style.setProperty('--lightPrimaryColor', color.clone().lighten(33.3).toRgbString());
    root.style.setProperty('--lightPrimaryColorTransparent', color.clone().lighten(33.3).setAlpha(0.66).toRgbString());

    const acc = color.clone().darken(33.3).complement();
    root.style.setProperty('--accentColor', acc.toRgbString());
    root.style.setProperty('--secondaryTextColor', tinycolor.mostReadable(acc, [stc]).toRgbString());

    const metaThemeColor = document.querySelector('meta[name=theme-color]');
    metaThemeColor.setAttribute('content', color.toHexString());
}

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

            changeColor(tinycolor(newColor));
        }
    }
};

export default Colors;
