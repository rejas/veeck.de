/* global Modernizr */
import tinycolor from 'tinycolor2';

function changeColor (c) {
    const root = document.querySelector(':root'),
        htmlStyle = window.getComputedStyle(root),
        color = tinycolor(c),
        stc = htmlStyle.getPropertyValue('--secondaryTextColor');

    if (color.isLight()) {
        root.style.setProperty('--primaryTextColor', stc);
        //TODO adjust secondaryTextColor accordingly
    }

    root.style.setProperty('--primaryColor', color.toHexString());
    root.style.setProperty('--darkPrimaryColor', color.darken(30).toHexString());
    root.style.setProperty('--lightPrimaryColor', color.lighten(45).toHexString());
    //TODO make accent color calculation same as in less code
    root.style.setProperty('--accentColor', color.darken(15).complement().toHexString());
    root.style.setProperty('--darkAccentColor', color.darken(30).toHexString());
    root.style.setProperty('--lightAccentColor', color.lighten(45).toHexString());
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
