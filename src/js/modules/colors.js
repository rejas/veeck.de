/* global Modernizr */
import tinycolor from 'tinycolor2';

function changeColor (c) {
    const root = document.querySelector(':root'),
        htmlStyle = window.getComputedStyle(root),
        ptc = htmlStyle.getPropertyValue('--primaryTextColor'),
        stc = htmlStyle.getPropertyValue('--secondaryTextColor'),
        color = tinycolor(c);

    root.style.setProperty('--primaryColor', color.toHexString());
    root.style.setProperty('--primaryTextColor', tinycolor.mostReadable(color, [ptc, stc]).toHexString());

    root.style.setProperty('--darkPrimaryColor', color.darken(30).toHexString());
    root.style.setProperty('--lightPrimaryColor', color.lighten(45).toHexString());

    var splitColor = color.darken(15).splitcomplement();
    root.style.setProperty('--accentColor', splitColor[1].toHexString());
    root.style.setProperty('--secondaryAccentColor', splitColor[2].toHexString());
    root.style.setProperty('--secondaryTextColor', tinycolor.mostReadable(splitColor[1], [ptc, stc]).toHexString());
}

export function init() {
    let newColor = document.querySelector('header').getAttribute('data-color');

    //TODO add random use of header or random color
    //TODO dont generate random color that is too bright or too dark
    //MAYBE tinycolor has a rng method?
    if (!newColor)
        newColor = '000000'.replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});

    if (Modernizr.supports && window.CSS.supports('--primaryColor', 0)) {
        changeColor(newColor);
    }
}
