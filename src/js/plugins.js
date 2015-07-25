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
 * ResponsiveMultiLevelMenu v1.0.2
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;( function( $, window, undefined ) {

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
        // Change to "true" to use the active item as back link label.
        useActiveItemAsBackLabel: false,
        // Change to "true" to add a navigable link to the active item to its child
        // menu.
        useActiveItemAsLink: false,
        // On close reset the menu to root
        resetOnClose: true
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
            if( ua.indexOf("Android") > -1 && ua.indexOf("Chrome") === -1 && ua.indexOf("Firefox") === -1)  {
                var androidversion = parseFloat(match[1], 10);
                if (androidversion < 4) {
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
            this.$menu.hide();
            this.$el.css('z-index', '9999');
            this.$el.find( 'ul.dl-submenu' ).prepend( '<li class="dl-back"><a href="#">' + this.options.backLabel + '</a></li>' );

            // Set the label text for the back link.
            if (this.options.useActiveItemAsBackLabel) {
                this.$menu.find( 'li.dl-back' ).each(function() {
                    var $this = $(this),
                        parentLabel = $this.parents('li:first').find('a:first').text();

                    $this.find('a').html(parentLabel);
                });
            }
            // If the active item should also be a clickable link, create one and put
            // it at the top of our menu.
            if (this.options.useActiveItemAsLink) {
                this.$el.find( 'ul.dl-submenu' ).prepend(function() {
                    var parentli = $(this).parents('li:not(.dl-back):first').find('a:first');
                    return '<li class="dl-parent"><a href="' + parentli.attr('href') + '">' + parentli.text() + '</a></li>';
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
                    // clicking somewhere else makes the menu close
                    $body.off( 'click' ).children().on( 'click.dlmenu', function() {
                        self._closeMenu() ;
                    } );
                }
                return false;
            } );

            this.$menu.on( 'click.dlmenu', 'li:not(.dl-back)', function( event ) {

                event.stopPropagation();

                var $item = $(this),
                    $submenu = $item.children( 'ul.dl-submenu' );

                // Only go to the next menu level if one exists AND the link isn't the
                // one we added specifically for navigating to parent item pages.
                if( ($submenu.length > 0) && !($(event.currentTarget).hasClass('dl-subviewopen'))) {

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

            this.$menu.on( 'click.dlmenu', 'li.dl-back', function( event ) {

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
                    if( self.options.resetOnClose ){
                        self._resetMenu();
                    }
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
            this.$menu.hide();

            this.open = false;
        },
        openMenu : function() {
            if( !this.open ) {
                this._openMenu();
            }
        },
        _openMenu : function() {
            var self = this;

            this.$menu.show();

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
            this.$menu.find( 'li:not(.dl-back)' ).removeClass( 'dl-subview dl-subviewopen' );
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
