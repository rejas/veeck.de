import tinycolor from 'tinycolor2';

function changeColor (color) {
    const root = document.querySelector(':root'),
        htmlStyle = window.getComputedStyle(root),
        ptc = htmlStyle.getPropertyValue('--primaryTextColor'),
        stc = htmlStyle.getPropertyValue('--secondaryTextColor'),
        accentColor = tinycolor(htmlStyle.getPropertyValue('--accentColor'));

    root.style.setProperty('--primaryColor', color.toRgbString());
    root.style.setProperty('--primaryTextColor', tinycolor.mostReadable(color, [ptc]).toRgbString());

    root.style.setProperty('--darkPrimaryColor', color.clone().darken(17.75).toRgbString());
    root.style.setProperty('--lightPrimaryColor', color.clone().lighten(37.5).setAlpha(0.66).toRgbString());

    root.style.setProperty('--accentColor', accentColor.toRgbString());
    root.style.setProperty('--secondaryTextColor', tinycolor.mostReadable(accentColor, [stc]).toRgbString());
}

export function init() {
    let newColor = document.querySelector('header').getAttribute('data-color');

    //TODO add random use of header or random color
    if (!newColor) {
        newColor = tinycolor.random().toHsl();
    }
    newColor.l = 0.5;

    //TODO Replace with Modernizr-test when it comes out
    if (window.CSS && CSS.supports('color', 'var(--primary)')) {
        changeColor(tinycolor(newColor));
    }
}
