$(document).ready(function ()
{
    "use strict";

    var $tc = $('#textContainer');
    var $tc2 = $('<div class="cb"></div>');
    $("body").append($tc2);

    while ($tc.overflown()) {
        $tc.children().last().prependTo($tc2);
    }
});

$.fn.overflown=function()
{
    var e = this[0];
    return e.scrollHeight>e.clientHeight||e.scrollWidth>e.clientWidth;
}