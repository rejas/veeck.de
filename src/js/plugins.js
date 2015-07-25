// Avoid `console` errors in browsers that lack a console.
(function() {
    "use strict";

    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());



/*!
* classie v1.0.1
* class helper functions
* from bonzo https://github.com/ded/bonzo
* MIT license
*
* classie.has( elem, 'my-class' ) -> true/false
* classie.add( elem, 'my-new-class' )
* classie.remove( elem, 'my-unwanted-class' )
* classie.toggle( elem, 'my-class' )
*/

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */

(function( window ) {
    "use strict";

// class helper functions from bonzo https://github.com/ded/bonzo

    function classReg( className ) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ( 'classList' in document.documentElement ) {
        hasClass = function( elem, c ) {
            return elem.classList.contains( c );
        };
        addClass = function( elem, c ) {
            elem.classList.add( c );
        };
        removeClass = function( elem, c ) {
            elem.classList.remove( c );
        };
    }
    else {
        hasClass = function( elem, c ) {
            return classReg( c ).test( elem.className );
        };
        addClass = function( elem, c ) {
            if ( !hasClass( elem, c ) ) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function( elem, c ) {
            elem.className = elem.className.replace( classReg( c ), ' ' );
        };
    }

    function toggleClass( elem, c ) {
        var fn = hasClass( elem, c ) ? removeClass : addClass;
        fn( elem, c );
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

// transport
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( classie );
    } else if ( typeof exports === 'object' ) {
        // CommonJS
        module.exports = classie;
    } else {
        // browser global
        window.classie = classie;
    }

})( window );


/**
 * jquery.dlmenu.js v1.0.1
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
( function( $, window, undefined ) {

    'use strict';

    // global
    var Modernizr = window.Modernizr, $body = $( 'body' );

    $.DLMenu = function( options, element ) {
        this.$el = $( element );
        this._init( options );
    };

    // the options
    $.DLMenu.defaults = {
        // classes for the animation effects
        animationClasses : { classin : 'dl-animate-in-1', classout : 'dl-animate-out-1' },
        // callback: click a link that has a sub menu
        // el is the link element (li); name is the level name
        onLevelClick : function( el, name ) { return false; },
        // callback: click a link that does not have a sub menu
        // el is the link element (li); ev is the event obj
        onLinkClick : function( el, ev ) { return false; },
        backLabel: 'Back',
        useActiveItemAsBackLabel: false
    };

    $.DLMenu.prototype = {
        _init : function( options ) {

            // options
            this.options = $.extend( true, {}, $.DLMenu.defaults, options );
            // cache some elements and initialize some variables
            this._config();

            var animEndEventNames = {
                    'WebkitAnimation' : 'webkitAnimationEnd',
                    'OAnimation' : 'oAnimationEnd',
                    'msAnimation' : 'MSAnimationEnd',
                    'animation' : 'animationend'
                },
                transEndEventNames = {
                    'WebkitTransition' : 'webkitTransitionEnd',
                    'MozTransition' : 'transitionend',
                    'OTransition' : 'oTransitionEnd',
                    'msTransition' : 'MSTransitionEnd',
                    'transition' : 'transitionend'
                };
            // animation end event name
            this.animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ] + '.dlmenu';
            // transition end event name
            this.transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ] + '.dlmenu';
            // support for css animations and css transitions
            this.supportAnimations = Modernizr.cssanimations;
            this.supportTransitions = Modernizr.csstransitions;

            var ua = navigator.userAgent;
            var match = ua.match(/Android\s([0-9\.]*)/);
            if( ua.indexOf("Android") >= 0 )
            {
                var androidversion = parseFloat(match[1], 10);
                if (androidversion < 4)
                {
                    this.supportAnimations = false;
                    this.supportTransitions = false;
                }
            }

            this._initEvents();

        },
        _config : function() {
            this.open = false;
            this.$trigger = this.$el.children( '.dl-trigger' );
            this.$menu = this.$el.children( 'ul.dl-menu' );
            this.$menuitems = this.$menu.find( 'li:not(.dl-back)' );
            this.$el.find( 'ul.dl-submenu' ).prepend( '<li class="dl-back"><a href="#">' + this.options.backLabel + '</a></li>' );
            this.$back = this.$menu.find( 'li.dl-back' );

            if (this.options.useActiveItemAsBackLabel) {
                this.$back.each(function() {
                    var $this = $(this),
                        parentLabel = $this.parents('li:first').find('a:first').text();

                    $this.find('a').html(parentLabel);
                });
            }
        },
        _initEvents : function() {

            var self = this;

            this.$trigger.on( 'click.dlmenu', function() {

                if( self.open ) {
                    self._closeMenu();
                }
                else {
                    self._openMenu();
                }
                return false;

            } );

            this.$menuitems.on( 'click.dlmenu', function( event ) {

                event.stopPropagation();

                var $item = $(this),
                    $submenu = $item.children( 'ul.dl-submenu' );

                if( $submenu.length > 0 ) {

                    var $flyin = $submenu.clone().css( 'opacity', 0 ).insertAfter( self.$menu ),
                        onAnimationEndFn = function() {
                            self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses.classout ).addClass( 'dl-subview' );
                            $item.addClass( 'dl-subviewopen' ).parents( '.dl-subviewopen:first' ).removeClass( 'dl-subviewopen' ).addClass( 'dl-subview' );
                            $flyin.remove();
                        };

                    setTimeout( function() {
                        $flyin.addClass( self.options.animationClasses.classin );
                        self.$menu.addClass( self.options.animationClasses.classout );
                        if( self.supportAnimations ) {
                            self.$menu.on( self.animEndEventName, onAnimationEndFn );
                        }
                        else {
                            onAnimationEndFn.call();
                        }

                        self.options.onLevelClick( $item, $item.children( 'a:first' ).text() );
                    } );

                    return false;
                }
                else {
                    self.options.onLinkClick( $item, event );
                }
            } );

            this.$back.on( 'click.dlmenu', function( event ) {

                var $this = $( this ),
                    $submenu = $this.parents( 'ul.dl-submenu:first' ),
                    $item = $submenu.parent(),

                    $flyin = $submenu.clone().insertAfter( self.$menu );

                var onAnimationEndFn = function() {
                    self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses.classin );
                    $flyin.remove();
                };

                setTimeout( function() {
                    $flyin.addClass( self.options.animationClasses.classout );
                    self.$menu.addClass( self.options.animationClasses.classin );
                    if( self.supportAnimations ) {
                        self.$menu.on( self.animEndEventName, onAnimationEndFn );
                    }
                    else {
                        onAnimationEndFn.call();
                    }

                    $item.removeClass( 'dl-subviewopen' );

                    var $subview = $this.parents( '.dl-subview:first' );
                    if( $subview.is( 'li' ) ) {
                        $subview.addClass( 'dl-subviewopen' );
                    }
                    $subview.removeClass( 'dl-subview' );
                } );

                return false;
            } );
        },
        closeMenu : function() {
            if( this.open ) {
                this._closeMenu();
            }
        },
        _closeMenu : function() {
            var self = this,
                onTransitionEndFn = function() {
                    self.$menu.off( self.transEndEventName );
                    self._resetMenu();
                };

            this.$menu.removeClass( 'dl-menuopen' );
            this.$menu.addClass( 'dl-menu-toggle' );
            this.$trigger.removeClass( 'dl-active' );

            if( this.supportTransitions ) {
                this.$menu.on( this.transEndEventName, onTransitionEndFn );
            }
            else {
                onTransitionEndFn.call();
            }

            this.open = false;
        },
        openMenu : function() {
            if( !this.open ) {
                this._openMenu();
            }
        },
        _openMenu : function() {
            var self = this;
            // clicking somewhere else makes the menu close
            $body.off( 'click' ).on( 'click.dlmenu', function() {
                self._closeMenu() ;
            } );
            this.$menu.addClass( 'dl-menuopen dl-menu-toggle' ).on( this.transEndEventName, function() {
                $( this ).removeClass( 'dl-menu-toggle' );
            } );
            this.$trigger.addClass( 'dl-active' );
            this.open = true;
        },
        // resets the menu to its original state (first level of options)
        _resetMenu : function() {
            this.$menu.removeClass( 'dl-subview' );
            this.$menuitems.removeClass( 'dl-subview dl-subviewopen' );
        }
    };

    var logError = function( message ) {
        if ( window.console ) {
            window.console.error( message );
        }
    };

    $.fn.dlmenu = function( options ) {
        if ( typeof options === 'string' ) {
            var args = Array.prototype.slice.call( arguments, 1 );
            this.each(function() {
                var instance = $.data( this, 'dlmenu' );
                if ( !instance ) {
                    logError( "cannot call methods on dlmenu prior to initialization; " +
                        "attempted to call method '" + options + "'" );
                    return;
                }
                if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
                    logError( "no such method '" + options + "' for dlmenu instance" );
                    return;
                }
                instance[ options ].apply( instance, args );
            });
        }
        else {
            this.each(function() {
                var instance = $.data( this, 'dlmenu' );
                if ( instance ) {
                    instance._init();
                }
                else {
                    instance = $.data( this, 'dlmenu', new $.DLMenu( options, this ) );
                }
            });
        }
        return this;
    };

} )( jQuery, window );



/**
 * jquery.dropdown.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */
( function( $, window, undefined )
{
    'use strict';

    $.DropDown = function( options, element ) {
        this.$el = $( element );
        this._init( options );
    };

    // the options
    $.DropDown.defaults = {
        speed : 300,
        easing : 'ease',
        gutter : 0,
        // initial stack effect
        stack : true,
        // delay between each option animation
        delay : 0,
        // random angle and positions for the options
        random : false,
        // rotated [right||left||false] : the options will be rotated to thr right side or left side.
        // make sure to tune the transform origin in the stylesheet
        rotated : false,
        // effect to slide in the options. value is the margin to start with
        slidingIn : false,
        // z-index in case you have overlay problems with multiple selects
        zindex: 1000,
        //
        onOptionSelect : function(opt) { return false; }
    };

    $.DropDown.prototype = {

        _init : function( options ) {

            // options
            this.options = $.extend( true, {}, $.DropDown.defaults, options );
            this._layout();
            this._initEvents();
        },
        _layout : function() {

            var self = this;
            this.minZIndex = this.options.zindex;
            var value = this._transformSelect();
            this.opts = this.listopts.children( 'li' );
            this.optsCount = this.opts.length;
            this.size = { width : this.dd.width(), height : this.dd.height() };

            var elName = this.$el.attr( 'name' ), elId = this.$el.attr( 'id' ),
                inputName = elName !== undefined ? elName : elId !== undefined ? elId : 'cd-dropdown-' + ( new Date() ).getTime();

            this.inputEl = $( '<input type="hidden" name="' + inputName + '" value="' + value + '"></input>' ).insertAfter( this.selectlabel );

            this.selectlabel.css( 'z-index', this.minZIndex + this.optsCount );
            this._positionOpts();
            if( Modernizr.csstransitions ) {
                setTimeout( function() { self.opts.css( 'transition', 'all ' + self.options.speed + 'ms ' + self.options.easing ); }, 25 );
            }
        },
        _transformSelect : function() {

            var optshtml = '', selectlabel = '', value = -1;
            this.$el.children( 'option' ).each( function() {

                var $this = $( this ),
                    val = isNaN( $this.attr( 'value' ) ) ? $this.attr( 'value' ) : Number( $this.attr( 'value' ) ) ,
                    classes = $this.attr( 'class' ),
                    selected = $this.attr( 'selected' ),
                    label = $this.text();

                if( val !== -1 ) {
                    optshtml +=
                        classes !== undefined ?
                            '<li data-value="' + val + '"><span class="' + classes + '">' + label + '</span></li>' :
                            '<li data-value="' + val + '"><span>' + label + '</span></li>';
                }

                if( selected ) {
                    selectlabel = label;
                    value = val;
                }
            } );

            this.listopts = $( '<ul/>' ).append( optshtml );
            this.selectlabel = $( '<span/>' ).append( selectlabel );
            this.dd = $( '<div class="cd-dropdown"/>' ).append( this.selectlabel, this.listopts ).insertAfter( this.$el );
            this.$el.remove();

            return value;
        },
        _positionOpts : function( anim ) {

            var self = this;

            this.listopts.css( 'height', 'auto' );
            this.opts
                .each( function( i ) {
                    $( this ).css( {
                        zIndex : self.minZIndex + self.optsCount - 1 - i,
                        top : self.options.slidingIn ? ( i + 1 ) * ( self.size.height + self.options.gutter ) : 0,
                        left : 0,
                        marginLeft : self.options.slidingIn ? i % 2 === 0 ? self.options.slidingIn : - self.options.slidingIn : 0,
                        opacity : self.options.slidingIn ? 0 : 1,
                        transform : 'none'
                    } );
                } );

            if( !this.options.slidingIn ) {
                this.opts
                    .eq( this.optsCount - 1 )
                    .css( { top : this.options.stack ? 9 : 0, left : this.options.stack ? 4 : 0, width : this.options.stack ? this.size.width - 8 : this.size.width, transform : 'none' } )
                    .end()
                    .eq( this.optsCount - 2 )
                    .css( { top : this.options.stack ? 6 : 0, left : this.options.stack ? 2 : 0, width : this.options.stack ? this.size.width - 4 : this.size.width, transform : 'none' } )
                    .end()
                    .eq( this.optsCount - 3 )
                    .css( { top : this.options.stack ? 3 : 0, left : 0, transform : 'none' } );
            }

        },
        _initEvents : function() {

            var self = this;

            this.selectlabel.on( 'mousedown.dropdown', function( event ) {
                self.opened ? self.close() : self.open();
                return false;

            } );

            this.opts.on( 'click.dropdown', function() {
                if( self.opened ) {
                    var opt = $( this );
                    self.options.onOptionSelect( opt );
                    self.inputEl.val( opt.data( 'value' ) );
                    self.selectlabel.html( opt.html() );
                    self.close();
                }
            } );

        },
        open : function() {
            var self = this;
            this.dd.toggleClass( 'cd-active' );
            this.listopts.css( 'height', ( this.optsCount + 1 ) * ( this.size.height + this.options.gutter ) );
            this.opts.each( function( i ) {

                $( this ).css( {
                    opacity : 1,
                    top : self.options.rotated ? self.size.height + self.options.gutter : ( i + 1 ) * ( self.size.height + self.options.gutter ),
                    left : self.options.random ? Math.floor( Math.random() * 11 - 5 ) : 0,
                    width : self.size.width,
                    marginLeft : 0,
                    transform : self.options.random ?
                        'rotate(' + Math.floor( Math.random() * 11 - 5 ) + 'deg)' :
                        self.options.rotated ?
                            self.options.rotated === 'right' ?
                                'rotate(-' + ( i * 5 ) + 'deg)' :
                                'rotate(' + ( i * 5 ) + 'deg)'
                            : 'none',
                    transitionDelay : self.options.delay && Modernizr.csstransitions ? self.options.slidingIn ? ( i * self.options.delay ) + 'ms' : ( ( self.optsCount - 1 - i ) * self.options.delay ) + 'ms' : 0
                } );

            } );
            this.opened = true;

        },
        close : function() {

            var self = this;
            this.dd.toggleClass( 'cd-active' );
            if( this.options.delay && Modernizr.csstransitions ) {
                this.opts.each( function( i ) {
                    $( this ).css( { 'transition-delay' : self.options.slidingIn ? ( ( self.optsCount - 1 - i ) * self.options.delay ) + 'ms' : ( i * self.options.delay ) + 'ms' } );
                } );
            }
            this._positionOpts( true );
            this.opened = false;
        }
    };

    $.fn.dropdown = function( options ) {
        var instance = $.data( this, 'dropdown' );
        if ( typeof options === 'string' ) {
            var args = Array.prototype.slice.call( arguments, 1 );
            this.each(function() {
                instance[ options ].apply( instance, args );
            });
        }
        else {
            this.each(function() {
                instance ? instance._init() : instance = $.data( this, 'dropdown', new $.DropDown( options, this ) );
            });
        }
        return instance;
    };

} )( jQuery, window );



/*!
imgLiquid v0.9.944 / 03-05-2013
jQuery plugin to resize images to fit in a container.
Copyright (c) 2012 Alejandro Emparan (karacas) @krc_ale
Dual licensed under the MIT and GPL licenses
https://github.com/karacas/imgLiquid
**/
/*
ex:
	$('.imgLiquid').imgLiquid({fill:true});

	// OPTIONS:

	> js:
			fill: true,
			verticalAlign:		// 'center' //	'top'	//	'bottom' // '50%'  // '10%'
			horizontalAlign:	// 'center' //	'left'	//	'right'  // '50%'  // '10%'

	> CallBacks:
			onStart:		function(){},
			onFinish:		function(){},
			onItemStart:	function(index, container, img){},
			onItemFinish:	function(index, container, img){}

	> hml5 data attr (overwrite all)
			data-imgLiquid-fill='true'
			data-imgLiquid-horizontalAlign='center'
			data-imgLiquid-verticalAlign='center'
*/
//


var imgLiquid = imgLiquid || {VER: '0.9.944'};
imgLiquid.bgs_Available = false;
imgLiquid.bgs_CheckRunned = false;
imgLiquid.injectCss = '.imgLiquid img {visibility:hidden}';

(function ($) {
    // ___________________________________________________________________
    'use strict';
    function checkBgsIsavailable() {
        if (imgLiquid.bgs_CheckRunned) {
            return;
        } else {
            imgLiquid.bgs_CheckRunned = true;
        }

        var spanBgs = $('<span style="background-size:cover" />');
        $('body').append(spanBgs);

        !function () {
            var bgs_Check = spanBgs[0];
            if (!bgs_Check || !window.getComputedStyle) {
                return;
            }
            var compStyle = window.getComputedStyle(bgs_Check, null);
            if (!compStyle || !compStyle.backgroundSize) {
                return;
            }
            imgLiquid.bgs_Available = (compStyle.backgroundSize === 'cover');
        }();

        spanBgs.remove();
    }

    // ___________________________________________________________________

    $.fn.extend({
        imgLiquid: function (options) {

            this.defaults = {
                fill: true,
                verticalAlign: 'center',			//	'top'	//	'bottom' // '50%'  // '10%'
                horizontalAlign: 'center',			//	'left'	//	'right'  // '50%'  // '10%'
                useBackgroundSize: true,
                useDataHtmlAttr: true,

                responsive: true,					/* Only for use with BackgroundSize false (or old browsers) */
                delay: 0,							/* Only for use with BackgroundSize false (or old browsers) */
                fadeInTime: 0,						/* Only for use with BackgroundSize false (or old browsers) */
                removeBoxBackground: true,			/* Only for use with BackgroundSize false (or old browsers) */
                hardPixels: true,					/* Only for use with BackgroundSize false (or old browsers) */
                responsiveCheckTime: 500,			/* Only for use with BackgroundSize false (or old browsers) */ /* time to check div resize */
                timecheckvisibility: 500,			/* Only for use with BackgroundSize false (or old browsers) */ /* time to recheck if visible/loaded */

                // CALLBACKS
                onStart: null,						// no-params
                onFinish: null,						// no-params
                onItemStart: null,					// params: (index, container, img )
                onItemFinish: null,					// params: (index, container, img )
                onItemError: null					// params: (index, container, img )
            };

            checkBgsIsavailable();
            var imgLiquidRoot = this;

            // Extend global settings
            this.options = options;
            this.settings = $.extend({}, this.defaults, this.options);

            // CallBack
            if (this.settings.onStart) {
                this.settings.onStart();
            }

            // ___________________________________________________________________

            return this.each(function ($i) {

                // MAIN >> each for image

                var settings = imgLiquidRoot.settings,
                    $imgBoxCont = $(this),
                    $img = $('img:first',$imgBoxCont);

                if (!$img.length) {
                    onError();
                    return;
                }

                // Extend settings
                if (!$img.data('imgLiquid_settings')) {
                    // First time
                    settings = $.extend({}, imgLiquidRoot.settings, getSettingsOverwrite());
                } else {
                    // Recall
                    // Remove Classes
                    $imgBoxCont.removeClass('imgLiquid_error').removeClass('imgLiquid_ready');
                    settings = $.extend({}, $img.data('imgLiquid_settings'), imgLiquidRoot.options);
                }
                $img.data('imgLiquid_settings', settings);

                // Start CallBack
                if (settings.onItemStart) {
                    settings.onItemStart($i, $imgBoxCont, $img);
                } /* << CallBack */

                // Process
                if (imgLiquid.bgs_Available && settings.useBackgroundSize) {
                    processBgSize();
                } else {
                    processOldMethod();
                }
                // END MAIN <<

                // ___________________________________________________________________

                function processBgSize() {

                    // Check change img src
                    if ($imgBoxCont.css('background-image').indexOf(encodeURI($img.attr('src'))) === -1) {
                        // Change
                        $imgBoxCont.css({'background-image': 'url("' + encodeURI($img.attr('src')) + '")'});
                    }

                    $imgBoxCont.css({
                        'background-size':		(settings.fill) ? 'cover' : 'contain',
                        'background-position':	(settings.horizontalAlign + ' ' + settings.verticalAlign).toLowerCase(),
                        'background-repeat':	'no-repeat'
                    });

                    $('a:first', $imgBoxCont).css({
                        'display':	'block',
                        'width':	'100%',
                        'height':	'100%'
                    });

                    $('img', $imgBoxCont).css({'display': 'none'});

                    if (settings.onItemFinish) {
                        settings.onItemFinish($i, $imgBoxCont, $img);
                    } /* << CallBack */

                    $imgBoxCont.addClass('imgLiquid_bgSize');
                    $imgBoxCont.addClass('imgLiquid_ready');
                    checkFinish();
                }

                // ___________________________________________________________________

                function processOldMethod() {

                    // Check change img src
                    if ($img.data('oldSrc') && $img.data('oldSrc') !== $img.attr('src')) {

                        /* Clone & Reset img */
                        var $imgCopy = $img.clone().removeAttr('style');
                        $imgCopy.data('imgLiquid_settings', $img.data('imgLiquid_settings'));
                        $img.parent().prepend($imgCopy);
                        $img.remove();
                        $img = $imgCopy;
                        $img[0].width = 0;

                        // Bug ie with > if (!$img[0].complete && $img[0].width) onError();
                        setTimeout(processOldMethod, 10);
                        return;
                    }

                    // Reproceess?
                    if ($img.data('imgLiquid_oldProcessed')) {
                        makeOldProcess();
                        return;
                    }

                    // Set data
                    $img.data('imgLiquid_oldProcessed', false);
                    $img.data('oldSrc', $img.attr('src'));

                    // Hide others images
                    $('img:not(:first)', $imgBoxCont).css('display', 'none');

                    // CSSs
                    $imgBoxCont.css({'overflow': 'hidden'});
                    $img.fadeTo(0, 0).removeAttr('width').removeAttr('height').css({
                        'visibility': 'visible',
                        'max-width': 'none',
                        'max-height': 'none',
                        'width': 'auto',
                        'height': 'auto',
                        'display': 'block'
                    });

                    // CheckErrors
                    $img.on('error', onError);
                    $img[0].onerror = onError;

                    // loop until load
                    function onLoad() {
                        if ($img.data('imgLiquid_error') || $img.data('imgLiquid_loaded') || $img.data('imgLiquid_oldProcessed')) {
                            return;
                        }
                        if ($imgBoxCont.is(':visible') && $img[0].complete && $img[0].width > 0 && $img[0].height > 0) {
                            $img.data('imgLiquid_loaded', true);
                            setTimeout(makeOldProcess, $i * settings.delay);
                        } else {
                            setTimeout(onLoad, settings.timecheckvisibility);
                        }
                    }

                    onLoad();
                    checkResponsive();
                }

                // ___________________________________________________________________

                function checkResponsive() {

                    /* Only for oldProcessed method (background-size dont need) */

                    if (!settings.responsive && !$img.data('imgLiquid_oldProcessed')) {
                        return;
                    }
                    if (!$img.data('imgLiquid_settings')) {
                        return;
                    }

                    settings = $img.data('imgLiquid_settings');

                    $imgBoxCont.actualSize = $imgBoxCont.get(0).offsetWidth + ($imgBoxCont.get(0).offsetHeight / 10000);
                    if ($imgBoxCont.sizeOld && $imgBoxCont.actualSize !== $imgBoxCont.sizeOld) {
                        makeOldProcess();
                    }

                    $imgBoxCont.sizeOld = $imgBoxCont.actualSize;
                    setTimeout(checkResponsive, settings.responsiveCheckTime);
                }

                // ___________________________________________________________________

                function onError() {
                    $img.data('imgLiquid_error', true);
                    $imgBoxCont.addClass('imgLiquid_error');
                    if (settings.onItemError) {
                        settings.onItemError($i, $imgBoxCont, $img);
                    } /* << CallBack */
                    checkFinish();
                }

                // ___________________________________________________________________

                function getSettingsOverwrite() {
                    var SettingsOverwrite = {};

                    if (imgLiquidRoot.settings.useDataHtmlAttr) {
                        var dif = $imgBoxCont.attr('data-imgLiquid-fill'),
                            ha =  $imgBoxCont.attr('data-imgLiquid-horizontalAlign'),
                            va =  $imgBoxCont.attr('data-imgLiquid-verticalAlign');

                        if (dif === 'true' || dif === 'false') {
                            SettingsOverwrite.fill = Boolean (dif === 'true');
                        }
                        if (ha !== undefined && (ha === 'left' || ha === 'center' || ha === 'right' || ha.indexOf('%') !== -1)) {
                            SettingsOverwrite.horizontalAlign = ha;
                        }
                        if (va !== undefined && (va === 'top' ||  va === 'bottom' || va === 'center' || va.indexOf('%') !== -1)) {
                            SettingsOverwrite.verticalAlign = va;
                        }
                    }

                    if (imgLiquid.isIE && imgLiquidRoot.settings.ieFadeInDisabled) {
                        SettingsOverwrite.fadeInTime = 0; //ie no anims
                    }
                    return SettingsOverwrite;
                }

                // ___________________________________________________________________

                function makeOldProcess() { /* Only for old browsers, or useBackgroundSize seted false */

                    // Calculate size
                    var w, h, wn, hn, ha, va, hdif, vdif,
                        margT = 0,
                        margL = 0,
                        $imgCW = $imgBoxCont.width(),
                        $imgCH = $imgBoxCont.height();

                    // Save original sizes
                    if ($img.data('owidth')	=== undefined) {
                        $img.data('owidth',	$img[0].width);
                    }
                    if ($img.data('oheight') === undefined) {
                        $img.data('oheight', $img[0].height);
                    }

                    // Compare ratio
                    if (settings.fill === ($imgCW / $imgCH) >= ($img.data('owidth') / $img.data('oheight'))) {
                        w = '100%';
                        h = 'auto';
                        wn = Math.floor($imgCW);
                        hn = Math.floor($imgCW * ($img.data('oheight') / $img.data('owidth')));
                    } else {
                        w = 'auto';
                        h = '100%';
                        wn = Math.floor($imgCH * ($img.data('owidth') / $img.data('oheight')));
                        hn = Math.floor($imgCH);
                    }

                    // Align X
                    ha = settings.horizontalAlign.toLowerCase();
                    hdif = $imgCW - wn;
                    if (ha === 'left') {
                        margL = 0;
                    }
                    if (ha === 'center') {
                        margL = hdif * 0.5;
                    }
                    if (ha === 'right') {
                        margL = hdif;
                    }
                    if (ha.indexOf('%') !== -1) {
                        ha = parseInt (ha.replace('%',''), 10);
                        if (ha > 0) {
                            margL = hdif * ha * 0.01;
                        }
                    }

                    // Align Y
                    va = settings.verticalAlign.toLowerCase();
                    vdif = $imgCH - hn;
                    if (va === 'left') {
                        margT = 0;
                    }
                    if (va === 'center') {
                        margT = vdif * 0.5;
                    }
                    if (va === 'bottom') {
                        margT = vdif;
                    }
                    if (va.indexOf('%') !== -1) {
                        va = parseInt (va.replace('%',''), 10);
                        if (va > 0) {
                            margT = vdif * va * 0.01;
                        }
                    }

                    // Add Css
                    if (settings.hardPixels) {w = wn; h = hn;}
                    $img.css({
                        'width': w,
                        'height': h,
                        'margin-left': Math.floor(margL),
                        'margin-top': Math.floor(margT)
                    });

                    // FadeIn > Only first time
                    if (!$img.data('imgLiquid_oldProcessed')) {
                        $img.fadeTo(settings.fadeInTime, 1);
                        $img.data('imgLiquid_oldProcessed', true);
                        if (settings.removeBoxBackground) {
                            $imgBoxCont.css('background-image', 'none');
                        }
                        $imgBoxCont.addClass('imgLiquid_nobgSize');
                        $imgBoxCont.addClass('imgLiquid_ready');
                    }

                    if (settings.onItemFinish) {
                        settings.onItemFinish($i, $imgBoxCont, $img);
                    } /* << CallBack */
                    checkFinish();
                }

                // ___________________________________________________________________

                function checkFinish() { /* Check callBack */
                    if (($i === imgLiquidRoot.length - 1) && (imgLiquidRoot.settings.onFinish)) {
                        imgLiquidRoot.settings.onFinish();
                    }
                }
            });
        }
    });
})(jQuery);

// Inject css styles ______________________________________________________
!function () {
    'use strict';
    var css = imgLiquid.injectCss,
        head = document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
}();



/*
 * onMediaQuery
 * http://springload.co.nz/love-the-web/
 *
 * Copyright 2012, Springload
 * Released under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: Fri 24 October, 2012
 */

;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function () {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (root.MQ = factory(root, root.MQ || {}));
        });
    } else {
        // Browser globals
        root.MQ = factory(root, root.MQ || {});
    }
}(this, function(mq) {
    /**
     * Initialises the MQ object and sets the initial media query callbacks
     * @returns Void(0)
     */
    mq.init = function(query_array) {

        // Container for all callbacks registered with the plugin
        this.callbacks = [];
        this.context = ''; //current active query
        this.new_context = ''; //current active query to be read inside callbacks, as this.context won't be set when they're called!

        if (typeof(query_array) !== 'undefined' ) {
            for (i = 0; i < query_array.length; i++) {
                var r = this.addQuery(query_array[i]);
            }
        }

        // Add a listener to the window.resize event, pass mq/self as the scope.
        this.addEvent(window, 'resize', mq.listenForChange, mq);

        // Figure out which query is active on load.
        this.listenForChange();
    };

    /**
     * Binds to the window.onResize and checks for media query changes
     * @returns Void(0)
     */
    mq.listenForChange = function() {
        var query_string;

        // Get the value of html { font-family } from the element style.
        if (document.documentElement.currentStyle) {
            query_string = document.documentElement.currentStyle["fontFamily"];
        }

        if (window.getComputedStyle) {
            query_string = window.getComputedStyle(document.documentElement,null).getPropertyValue('font-family');
        }

        // No support for CSS enumeration? Return and avoid errors.
        if (query_string === null) return;

        // Android browsers place a "," after an item in the font family list.
        // Most browsers either single or double quote the string.
        query_string = query_string.replace(/['",]/g, '');

        if (query_string !== this.context) {
            this.new_context = query_string;
            this.triggerCallbacks(this.context, 'unmatch');
            this.triggerCallbacks(this.new_context, 'match');
        }

        this.context = this.new_context;
    };

    /**
     * Attach a new query to test.
     * @param query_object {
     *     context: ['some_media_query','some_other_media_query'],
     *     call_for_each_context: true,
     *     callback: function() {
     *         //something awesome
     *     }
     * }
     * @returns A reference to the query_object that was added
     */
    mq.addQuery = function(query_object) {
        if (query_object === null || query_object === undefined) return;

        this.callbacks.push(query_object);

        // If the context is passed as a string, turn it into an array (for unified approach elsewhere in the code)
        if (typeof(query_object.context) == "string") {
            query_object.context = [query_object.context];
        }

        // See if "call_for_each_context" is set, if not, set a default (for unified approach elsewhere in the code)
        if (typeof(query_object.call_for_each_context) !== "boolean") {
            query_object.call_for_each_context = true; // Default
        }

        // Fire the added callback if it matches the current context
        if (this.context !== '' && this._inArray(this.context, query_object.context)) {
            query_object.match();
        }

        return this.callbacks[ this.callbacks.length - 1];
    };

    /**
     * Remove a query_object by reference.
     * @returns Void(0)
     */
    mq.removeQuery = function(query_object) {
        if (query_object === null || query_object === undefined) return;

        var match = -1;

        while ((match = mq._indexOf(query_object,this.callbacks)) > -1) {
            this.callbacks.splice(match, 1);
        }
    };

    /**
     * Loop through the stored callbacks and execute
     * the ones that are bound to the current context.
     * @returns Void(0)
     */
    mq.triggerCallbacks = function(size, key) {
        var i, callback_function, call_for_each_context;

        for (i = 0; i < this.callbacks.length; i++) {

            // Don't call for each context?
            if(this.callbacks[i].call_for_each_context === false) {
                if ((key === 'match' && this._inArray(this.context, this.callbacks[i].context)) ||
                    (key === 'unmatch' && this._inArray(this.new_context, this.callbacks[i].context))) {
                    // Was previously called, and we don't want to call it for each context
                    continue;
                }
            }

            callback_function = this.callbacks[i][key];
            if (this._inArray(size, this.callbacks[i].context) && callback_function !== undefined) {
                callback_function();
            }

        }
    };

    /**
     * Swiss Army Knife event binding, in lieu of jQuery.
     * @returns Void(0)
     */
    mq.addEvent = function(elem, type, eventHandle, eventContext) {
        if (elem === null || elem === undefined) return;
        // If the browser supports event listeners, use them.
        if (elem.addEventListener) {
            elem.addEventListener(type, function() { eventHandle.call(eventContext); }, false);
        } else if (elem.attachEvent ) {
            elem.attachEvent("on" + type, function() {  eventHandle.call(eventContext); });

            // Otherwise, replace the current thing bound to on[whatever]! Consider refactoring.
        } else {
            elem["on" + type] = function() { eventHandle.call(eventContext); };
        }
    };

    /**
     * Function to return the mediaquery's previous context
     * @returns String returns the current mediaquery's context
     */
    mq.getPreviousContext = function()
    {
        return this.context;
    };

    /**
     * Function to return the mediaquery's current context
     * @returns String returns the current mediaquery's context
     */
    mq.getContext = function()
    {
        return this.new_context;
    };

    /**
     * Internal helper function that checks wether "needle" occurs in "haystack"
     * @param needle Mixed Value to look for in haystack array
     * @param haystack Array Haystack array to search in
     * @returns Boolan True if the needle occurs, false otherwise
     */
    mq._inArray = function(needle, haystack)
    {
        var length = haystack.length;
        for(var i = 0; i < length; i++) {
            if(haystack[i] == needle) return true;
        }
        return false;
    };

    /**
     * IE8 do not supports Array.properties.indexOf
     * copy from jQuery.
     * in lieu of jQuery.
     * @returns int
     */
    mq._indexOf = function( elem, arr, i )
    {
        var len;
        if ( arr ) {
            if ( arr.indexOf ) {
                return arr.indexOf( elem, i );
            }

            len = arr.length;
            i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

            for ( ; i < len; i++ ) {
                // Skip accessing in sparse arrays
                if ( i in arr && arr[ i ] === elem ) {
                    return i;
                }
            }
        }

        return -1;
    }

    // Expose the functions.
    return mq;
}));



/*!
 * animsition v3.5.2
 * http://blivesta.github.io/animsition/
 * Licensed under MIT
 * Author : blivesta
 * http://blivesta.com/
 */
(function($) {
    "use strict";
    var namespace = "animsition";
    var methods = {
        init: function(options) {
            options = $.extend({
                inClass: "fade-in",
                outClass: "fade-out",
                inDuration: 1500,
                outDuration: 800,
                linkElement: ".animsition-link",
                loading: true,
                loadingParentElement: "body",
                loadingClass: "animsition-loading",
                unSupportCss: [ "animation-duration", "-webkit-animation-duration", "-o-animation-duration" ],
                overlay: false,
                overlayClass: "animsition-overlay-slide",
                overlayParentElement: "body"
            }, options);
            var support = methods.supportCheck.call(this, options);
            if (!support) {
                if (!("console" in window)) {
                    window.console = {};
                    window.console.log = function(str) {
                        return str;
                    };
                }
                console.log("Animsition does not support this browser.");
                return methods.destroy.call(this);
            }
            var overlayMode = methods.optionCheck.call(this, options);
            if (overlayMode) {
                methods.addOverlay.call(this, options);
            }
            if (options.loading) {
                methods.addLoading.call(this, options);
            }
            return this.each(function() {
                var _this = this;
                var $this = $(this);
                var $window = $(window);
                var data = $this.data(namespace);
                if (!data) {
                    options = $.extend({}, options);
                    $this.data(namespace, {
                        options: options
                    });
                    $window.on("load." + namespace + " pageshow." + namespace, function() {
                        methods.pageIn.call(_this);
                    });
                    $window.on("unload." + namespace, function() {});
                    $(options.linkElement).on("click." + namespace, function(event) {
                        event.preventDefault();
                        var $self = $(this);
                        var url = $self.attr("href");
                        if (event.which === 2 || event.metaKey || event.shiftKey || navigator.platform.toUpperCase().indexOf("WIN") !== -1 && event.ctrlKey) {
                            window.open(url, "_blank");
                        } else {
                            methods.pageOut.call(_this, $self, url);
                        }
                    });
                }
            });
        },
        addOverlay: function(options) {
            $(options.overlayParentElement).prepend('<div class="' + options.overlayClass + '"></div>');
        },
        addLoading: function(options) {
            $(options.loadingParentElement).append('<div class="' + options.loadingClass + '"></div>');
        },
        removeLoading: function() {
            var $this = $(this);
            var options = $this.data(namespace).options;
            var $loading = $(options.loadingParentElement).children("." + options.loadingClass);
            $loading.fadeOut().remove();
        },
        supportCheck: function(options) {
            var $this = $(this);
            var props = options.unSupportCss;
            var propsNum = props.length;
            var support = false;
            if (propsNum === 0) {
                support = true;
            }
            for (var i = 0; i < propsNum; i++) {
                if (typeof $this.css(props[i]) === "string") {
                    support = true;
                    break;
                }
            }
            return support;
        },
        optionCheck: function(options) {
            var $this = $(this);
            var overlayMode;
            if (options.overlay || $this.data("animsition-overlay")) {
                overlayMode = true;
            } else {
                overlayMode = false;
            }
            return overlayMode;
        },
        animationCheck: function(data, stateClass, stateIn) {
            var $this = $(this);
            var options = $this.data(namespace).options;
            var dataType = typeof data;
            var dataDuration = !stateClass && dataType === "number";
            var dataClass = stateClass && dataType === "string" && data.length > 0;
            if (dataDuration || dataClass) {
                data = data;
            } else if (stateClass && stateIn) {
                data = options.inClass;
            } else if (!stateClass && stateIn) {
                data = options.inDuration;
            } else if (stateClass && !stateIn) {
                data = options.outClass;
            } else if (!stateClass && !stateIn) {
                data = options.outDuration;
            }
            return data;
        },
        pageIn: function() {
            var _this = this;
            var $this = $(this);
            var options = $this.data(namespace).options;
            var thisInDuration = $this.data("animsition-in-duration");
            var thisInClass = $this.data("animsition-in");
            var inDuration = methods.animationCheck.call(_this, thisInDuration, false, true);
            var inClass = methods.animationCheck.call(_this, thisInClass, true, true);
            var overlayMode = methods.optionCheck.call(_this, options);
            if (options.loading) {
                methods.removeLoading.call(_this);
            }
            if (overlayMode) {
                methods.pageInOverlay.call(_this, inClass, inDuration);
            } else {
                methods.pageInBasic.call(_this, inClass, inDuration);
            }
        },
        pageInBasic: function(inClass, inDuration) {
            var $this = $(this);
            $this.trigger("animsition.start").css({
                "animation-duration": inDuration / 1e3 + "s"
            }).addClass(inClass).animateCallback(function() {
                $this.removeClass(inClass).css({
                    opacity: 1
                }).trigger("animsition.end");
            });
        },
        pageInOverlay: function(inClass, inDuration) {
            var $this = $(this);
            var options = $this.data(namespace).options;
            $this.trigger("animsition.start").css({
                opacity: 1
            });
            $(options.overlayParentElement).children("." + options.overlayClass).css({
                "animation-duration": inDuration / 1e3 + "s"
            }).addClass(inClass).animateCallback(function() {
                $this.trigger("animsition.end");
            });
        },
        pageOut: function($self, url) {
            var _this = this;
            var $this = $(this);
            var options = $this.data(namespace).options;
            var selfOutClass = $self.data("animsition-out");
            var thisOutClass = $this.data("animsition-out");
            var selfOutDuration = $self.data("animsition-out-duration");
            var thisOutDuration = $this.data("animsition-out-duration");
            var isOutClass = selfOutClass ? selfOutClass : thisOutClass;
            var isOutDuration = selfOutDuration ? selfOutDuration : thisOutDuration;
            var outClass = methods.animationCheck.call(_this, isOutClass, true, false);
            var outDuration = methods.animationCheck.call(_this, isOutDuration, false, false);
            var overlayMode = methods.optionCheck.call(_this, options);
            if (overlayMode) {
                methods.pageOutOverlay.call(_this, outClass, outDuration, url);
            } else {
                methods.pageOutBasic.call(_this, outClass, outDuration, url);
            }
        },
        pageOutBasic: function(outClass, outDuration, url) {
            var $this = $(this);
            $this.css({
                "animation-duration": outDuration / 1e3 + "s"
            }).addClass(outClass).animateCallback(function() {
                location.href = url;
            });
        },
        pageOutOverlay: function(outClass, outDuration, url) {
            var _this = this;
            var $this = $(this);
            var options = $this.data(namespace).options;
            var thisInClass = $this.data("animsition-in");
            var inClass = methods.animationCheck.call(_this, thisInClass, true, true);
            $(options.overlayParentElement).children("." + options.overlayClass).css({
                "animation-duration": outDuration / 1e3 + "s"
            }).removeClass(inClass).addClass(outClass).animateCallback(function() {
                location.href = url;
            });
        },
        destroy: function() {
            return this.each(function() {
                var $this = $(this);
                $(window).unbind("." + namespace);
                $this.css({
                    opacity: 1
                }).removeData(namespace);
            });
        }
    };
    $.fn.animateCallback = function(callback) {
        var end = "animationend webkitAnimationEnd mozAnimationEnd oAnimationEnd MSAnimationEnd";
        return this.each(function() {
            $(this).bind(end, function() {
                $(this).unbind(end);
                return callback.call(this);
            });
        });
    };
    $.fn.animsition = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist on jQuery." + namespace);
        }
    };
})(jQuery);