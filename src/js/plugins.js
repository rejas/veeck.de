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

/*!
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2015 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.5
 *
 */

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : false,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                    /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                    $this.trigger("appear");
                    /* if we found an image we'll load, reset the counter */
                    counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
        settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                    $( '<div class="spinner-loading spinner-absolute"><div></div></div>' ).appendTo( $self.parent());
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            $self.parent().find('.spinner-loading').remove();

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
            !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);

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
