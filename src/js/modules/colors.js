import tinycolor from 'tinycolor2';

function changeColor (color) {
    const root = document.querySelector(':root'),
        htmlStyle = window.getComputedStyle(root),
        ptc = htmlStyle.getPropertyValue('--primaryTextColor'),
        stc = htmlStyle.getPropertyValue('--secondaryTextColor'),
        accentColor = tinycolor(htmlStyle.getPropertyValue('--accentColor'));

    console.log(color);
    console.log(accentColor);

    root.style.setProperty('--primaryColor', color.toHexString());
    root.style.setProperty('--primaryTextColor', tinycolor.mostReadable(color, [ptc, stc]).toHexString());

    root.style.setProperty('--darkPrimaryColor', color.clone().darken(10).toHexString());
    root.style.setProperty('--lightPrimaryColor', color.clone().lighten(20).toHexString());

    console.log(ptc);
    console.log(stc);

    root.style.setProperty('--accentColor', accentColor.toRgbString());
    root.style.setProperty('--secondaryTextColor', tinycolor.mostReadable(accentColor, [ptc, stc]).toRgbString());
}

export function init() {
    let newColor = document.querySelector('header').getAttribute('data-color');

    //TODO add random use of header or random color
    if (!newColor) {
        newColor = tinycolor.random().toHsl();
        if (newColor.l < 0.33) newColor.l = 0.33;
        if (newColor.l > 0.66) newColor.l = 0.66;
    }

    //TODO Replace with Modernizr-test when it comes out
    if (window.CSS && CSS.supports('color', 'var(--primary)')) {
        changeColor(tinycolor(newColor));
    }
}
