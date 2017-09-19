import tinycolor from 'tinycolor2';

function changeColor (color) {
    const root = document.querySelector(':root'),
        htmlStyle = window.getComputedStyle(root),
        ptc = htmlStyle.getPropertyValue('--primaryTextColor'),
        stc = htmlStyle.getPropertyValue('--secondaryTextColor'),
        splitColor = color.splitcomplement();

    root.style.setProperty('--primaryColor', color.toRgbString());
    root.style.setProperty('--primaryTextColor', tinycolor.mostReadable(color, [ptc, stc]).toRgbString());

    root.style.setProperty('--darkPrimaryColor', color.clone().darken(10).toRgbString());
    root.style.setProperty('--lightPrimaryColor', color.clone().lighten(20).toRgbString());

    root.style.setProperty('--accentColor', splitColor[1].toRgbString());
    root.style.setProperty('--secondaryAccentColor', splitColor[2].toRgbString());
    root.style.setProperty('--secondaryTextColor', tinycolor.mostReadable(splitColor[1], [ptc, stc]).toRgbString());
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
