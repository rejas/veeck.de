import tinycolor from 'tinycolor2';

function changeColor (color) {
    const root = document.querySelector(':root'),
        htmlStyle = window.getComputedStyle(root),
        ptc = htmlStyle.getPropertyValue('--primaryTextColor'),
        stc = htmlStyle.getPropertyValue('--secondaryTextColor'),
        accentColor = tinycolor(htmlStyle.getPropertyValue('--accentColor'));

    root.style.setProperty('--primaryColor', color.toRgbString());
    root.style.setProperty('--primaryTextColor', tinycolor.mostReadable(color, [ptc]).toRgbString());

    root.style.setProperty('--darkPrimaryColor', color.clone().darken(17.5).toRgbString());
    root.style.setProperty('--lightPrimaryColor', color.clone().lighten(37.5).toRgbString());
    root.style.setProperty('--lightPrimaryColorTransparent', color.clone().lighten(37.5).setAlpha(0.66).toRgbString());

    root.style.setProperty('--accentColor', accentColor.toRgbString());
    root.style.setProperty('--secondaryTextColor', tinycolor.mostReadable(accentColor, [stc]).toRgbString());
}

let Colors = {

    init: () => {
        //TODO Replace with Modernizr-test when it comes out
        if (window.CSS && CSS.supports('color', 'var(--primary)')) {
            const header = document.querySelector('header');

            if (!header) {
                return;
            }

            let newColor = header.getAttribute('data-color');

            //TODO add random use of header or random color
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
