/* global Modernizr */
import tinycolor from 'tinycolor2';

function changeColor (c) {
    const root = document.querySelector(':root'),
        htmlStyle = window.getComputedStyle(root),
        color = tinycolor(c);

    htmlStyle.getPropertyValue('--primaryColor');
    root.style.setProperty('--primaryColor', color.toHexString());
    root.style.setProperty('--lightPrimaryColor', color.darken(15));
    root.style.setProperty('--darkPrimaryColor', color.darken(-15));
    root.style.setProperty('--accentColor', color.darken(35));

    if (color.getBrightness() < 40) {
        root.style.setProperty('--secondaryTextColor', '#fcfcfc');
    }
}

export function init() {
    let newColor = document.querySelector('header').getAttribute('data-color');

    if (!newColor)
        newColor = '000000'.replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});

    if (Modernizr.supports && window.CSS.supports('--primaryColor', 0)) {
        changeColor(newColor);
    }
}
