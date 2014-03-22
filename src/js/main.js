/*global $*/

window.$myVars =
{
    // Initialize all the queries you want to use more than once
    nav : $('nav').clone()
};

$(document).ready(function ()
{
    "use strict";

    // my own fade plugin
    $("nav li a").fadeLink("#main");

    // my own extender
    $(".extender").on("click", function () {
        $(".extend").slideToggle();
    });

    /**
     * decide if mobile or not
     * @type {Array}
     */
    var queries = [
        {
            context: 'mobile',
            match: function() {
                $('nav').remove();
                $myVars.nav.clone().prependTo('header').dlmenu();
            },
            unmatch: function() {
            }
        },
        {
            context: 'desktop',
            match: function() {
                $('nav').remove();
                $myVars.nav.clone().prependTo('header').initMenu();
            },
            unmatch: function() {
            }
        }
    ];
    MQ.init(queries);

    /**
     * Lazy Load - jQuery plugin for lazy loading images
     */
    $("img.lazy").lazyload({
        effect : "fadeIn"
    });

    /**
     * Dropdown style all <select> elements
     */
    $('#char_region').dropdown({
        gutter : 5,
        stack : false,
        slidingIn : 100,
        zindex: 15
    });
    $('#guild_region').dropdown({
        gutter : 5,
        stack : false,
        slidingIn : 100,
        zindex: 10
    });

    var grid = function(el, opts)
    {
        if (!el) {
            return;
        }

        var itemSize, rowWidth,
            options = {
                margin: 5,
                aspectRatio : 1,
                initialSize : 150,
                minSize : 100
            };

        options = $.extend({}, options, opts);

        window.onresize = function(){
            calc();
        };
        calc();

        function calc(rowItemsNum)
        {
            rowWidth = el.offsetWidth;

            rowItemsNum = rowItemsNum || (rowWidth / (options.initialSize - options.margin*2)).toFixed() || 0;

            itemSize = (rowWidth - options.margin * (rowItemsNum+1)) / rowItemsNum - 0.5;

            // check if new size is less than the minimum allowed
            // if so, show less item's per-row
            if( itemSize < options.minSize ){
                if( rowItemsNum > 1 ){
                    rowItemsNum--;
                    itemSize = (rowWidth - options.margin * (rowItemsNum+1)) / rowItemsNum;
                } else {
                    return;
                }
            }

            // resize items
            var len = el.children.length;
            for (var i = 0; i < len; i++) {
                el.children[i].style.cssText = "width:" + itemSize + 'px;' +
                    "height:" + itemSize * options.aspectRatio + 'px';
            }
        }
    };

    // call it
    grid( document.querySelector('.rowGrid'), {
        margin: 10,
        aspectRatio : 9/9,
        initialSize : 252,
        minSize : 188
    });

    $(".imgLiquidFill").imgLiquid({});

    $('div.more').on('click', function() {
        $.smoothScroll({
            scrollElement: $('body'),
            scrollTarget: '#main',
            easing: 'linear',
            speed: 500,
            offset: -100
        });
        return false;
    });

    /**
     * AddThis Config
     * @type {*|{}}
     */
    var addthis_config = addthis_config||{};
    addthis_config.pubid = 'ra-4f4bb62e22bbd641';
    addthis_config.data_track_addressbar = true;
    addthis.init();
});