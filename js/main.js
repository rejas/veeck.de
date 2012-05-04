/* Author:

*/
// Code from http://www.browser-update.org/
var $buoop = {vs: {i: 8, f: 3.6, o: 10.6, s: 3.2, n: 9}};
$buoop.ol = window.onload;
window.onload = function () {
    try {if ($buoop.ol) {$buoop.ol(); } } catch (ex) {}
    var e = document.createElement("script");
    e.setAttribute("type", "text/javascript");
    e.setAttribute("src", "http://browser-update.org/update.js");
    document.body.appendChild(e);
};

$(document).ready(function () {

    // my own fade plugin
    if ($.fn.fadeLink) {
        $('nav li a').fadeLink('#main');
    }

    // http://www.sycha.com/jquery-smooth-scrolling-internal-anchor-links
    var lastNavItem;
    $('.scroll').on('click', function (event) {
        if (lastNavItem) {
            lastNavItem.removeClass('active');
        }
        lastNavItem = $(this).parent();
        lastNavItem.addClass('active');
        event.preventDefault();
        $('html,body').animate({scrollTop: $(this.hash).offset().top}, 500);
    });

    $(".extender").on('click', function (event) {
        $('.extend').slideToggle();
    });

	// Run Marco van Hylckama Vlieg's jQuery Menu plugin (see plugins.js)
    if ($.fn.initMenu) {
        $('.menu').initMenu();
    }

	// Run Matt Kersley's jQuery Responsive menu plugin (see plugins.js)
	if ($.fn.mobileMenu) {
		$('ul#respmenu').mobileMenu({
			switchWidth: 1007,                   // width (in px to switch at)
			topOptionText: 'Choose a page',     // first option text
			indentString: '&nbsp;&nbsp;&nbsp;'  // string for indenting nested items
		});
	}

    // Lazy Load - jQuery plugin for lazy loading images (see plugins.js)
    $("img.lazy").lazyload({
        effect : "fadeIn"
    });
});




