/* global require, module */
'use strict';

var MQ = require('../../bower_components/on-media-query/js/onmediaquery.js'),
    mqe = require('./mqe.js'),
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

module.exports = {

    init: function() {

        mqe.init({
            mediaqueries: [
                {name: 'smartphone', media: '(max-width: 767px)'},
                {name: 'tablet', media: '(max-width: 1023px) and (min-width: 768px)'},
                {name: 'desktop', media: '(min-width: 1024px)'}
            ]
        });

        $('body').on("mediaQuery:active", function (event) {
            console.log(event);
        });

        /**
         * decide if mobile or not
         * @type {Array}
         */
        var $myNav = $('nav').clone(),
            queries = [{
                context: 'mobile',
                match: function() {
                    $('nav').remove();
                    $myNav.clone().prependTo('header').addClass('mobile-nav').removeClass('desktop-nav').dlmenu();
                    cssButton();
                },
                unmatch: function() {
                }
            },{
                context: 'desktop',
                match: function() {
                    $('nav').remove();
                    $myNav.clone().prependTo('header').removeClass('mobile-nav').addClass('desktop-nav');
                },
                unmatch: function() {
                }
            }];
        MQ.init(queries);
    }
};
