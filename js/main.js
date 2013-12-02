$(document).ready(function ()
{
    "use strict";

    var $tc = $('#textContainer');
    var $tc2 = $('<div class="cb"></div>');
    $("body").append($tc2);

    while ($tc.overflown()) {
        $tc.children().last().prependTo($tc2);
    }

    var addthis_config = addthis_config||{};
    addthis_config.pubid = 'ra-4f4bb62e22bbd641';
    addthis.init();
});