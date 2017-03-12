/* global require, module */
'use strict';

var mqe = require('../../bower_components/mediaquery-event/dist/mqe.js'),
    $trigger;

function cssButton() {

    // trigger mobile button animation
    $trigger = $('.js-dl-trigger');

    $trigger.on('click', function(ignore) {

        $trigger.toggleClass('is-active');

        if ($trigger.hasClass('is-active')) {

            $('body').off('click').children().on('click', function() {
                $trigger.removeClass('is-active');
            });
        }
    });
}

export function init() {
    const $myNav = $('nav').clone();

    document.addEventListener('mediaquery', function (event) {
        if (!event.detail.active) {
            return;
        }
        if (event.detail.media === 'desktop') {
            $('nav').remove();
            $myNav.clone().prependTo('header').removeClass('mobile-nav').addClass('desktop-nav');
            return;
        }
        if (event.detail.media === 'mobile') {
            $('nav').remove();
            $myNav.clone().prependTo('header').addClass('mobile-nav').removeClass('desktop-nav').dlmenu();
            cssButton();
        }
    });

    mqe.init({
        mediaqueries: [
            {name: 'mobile', media: '(max-width: 1023px)'},
            {name: 'desktop', media: '(min-width: 1024px)'}
        ]
    });
}
