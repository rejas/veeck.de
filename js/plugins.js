// Avoid `console` errors in browsers that lack a console.
(function() {
    "use strict";

    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
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

// Place any jQuery/helper plugins in here.

/*
 * jQuery Responsive menu plugin by Matt Kersley
 * Converts menus into a select elements for mobile devices and low browser widths
 * http://github.com/mattkersley/Responsive-Menu
 */
(function($){
    "use strict";

    //plugin's default options
    var settings = {
            combine: true,	//combine multiple menus into a single select
            groupPageText: 'Main',	//optgroup's aren't selectable, make an option for it
            nested: true,	//create optgroups by default
            prependTo: 'body',	//insert at top of page by default
            switchWidth: 480,	//width at which to switch to select, and back again
            topOptionText: 'Select a page'	//default "unselected" state
        },

        //used to store original matched menus
        $menus,

        //used as a unique index for each menu if no ID exists
        menuCount = 0,

        //used to store unique list items for combining lists
        uniqueLinks = [];

    //go to page
    function goTo(url){
        document.location.href = url;
    }

    //does menu exist?
    function menuExists(){
        return ($('.mnav').length) ? true : false;
    }

    //validate selector's matched list(s)
    function isList($this){
        var pass = true;
        $this.each(function(){
            if(!$(this).is('ul') && !$(this).is('ol')){
                pass=false;
            }
        });
        return pass;
    }//isList()

    //function to decide if mobile or not
    function isMobile(){
        return ($(window).width() < settings.switchWidth);
    }

    //function to get text value of element, but not it's children
    function getText($item){
        return $.trim($item.clone().children('ul, ol').remove().end().text());
    }

    //function to check if URL is unique
    function isUrlUnique(url){
        return !!(($.inArray(url, uniqueLinks) === -1));
    }

    //function to do duplicate checking for combined list
    function checkForDuplicates($menu){

        $menu.find(' > li').each(function(){

            var $li = $(this),
                link = $li.find('a').attr('href'),
                parentLink = function(){
                    if($li.parent().parent().is('li')){
                        return $li.parent().parent().find('a').attr('href');
                    } else {
                        return null;
                    }
                };

            //check nested <li>s before checking current one
            if($li.find(' ul, ol').length){
                checkForDuplicates($li.find('> ul, > ol'));
            }

            //remove empty UL's if any are left by LI removals
            if(!$li.find(' > ul li, > ol li').length){
                $li.find('ul, ol').remove();
            }

            //if parent <li> has a link, and it's not unique, append current <li> to the "unique parent" detected earlier
            if(!isUrlUnique(parentLink(), uniqueLinks) && isUrlUnique(link, uniqueLinks)){
                $li.appendTo(
                    $menu.closest('ul#mmnav').find('li:has(a[href='+parentLink()+']):first ul')
                );
            }
            //otherwise, check if the current <li> is unique, if it is, add it to the unique list
            else if(isUrlUnique(link)){
                uniqueLinks.push(link);
            }

            //if it isn't, remove it. Simples.
            else{
                $li.remove();
            }
        });
    }

    //function to combine lists into one
    function combineLists(){

        //create a new list
        var $menu = $('<ul id="mmnav" />');

        //loop through each menu and extract the list's child items
        //then append them to the new list
        $menus.each(function(){
            $(this).children().clone().appendTo($menu);
        });

        //de-duplicate any repeated items
        checkForDuplicates($menu);

        //return new combined list
        return $menu;

    }//combineLists()

    //function to create options in the select menu
    function createOption($item, $container, text){

        //if no text param is passed, use list item's text, otherwise use settings.groupPageText
        if(!text){
            $('<option value="'+$item.find('a:first').attr('href')+'">'+$.trim(getText($item))+'</option>').appendTo($container);
        } else {
            $('<option value="'+$item.find('a:first').attr('href')+'">'+text+'</option>').appendTo($container);
        }
    }//createOption()

    //function to create option groups
    function createOptionGroup($group, $container){

        //create <optgroup> for sub-nav items
        var $optgroup = $('<optgroup label="'+$.trim(getText($group))+'" />');

        //append top option to it (current list item's text)
        createOption($group,$optgroup, settings.groupPageText);

        //loop through each sub-nav list
        $group.children('ul, ol').each(function(){

            //loop through each list item and create an <option> for it
            $(this).children('li').each(function(){
                createOption($(this), $optgroup);
            });
        });

        //append to select element
        $optgroup.appendTo($container);

    }//createOptionGroup()

    //function to create <select> menu
    function createSelect($menu){

        //create <select> to insert into the page
        var $select = $('<select id="mm'+menuCount+'" role="navigation" class="mnav dont-print" />');
        menuCount++;

        //create default option if the text is set (set to null for no option)
        if(settings.topOptionText){
            createOption($('<li>'+settings.topOptionText+'</li>'), $select);
        }

        //loop through first list items
        $menu.children('li').each(function(){

            var $li = $(this);

            //if nested select is wanted, and has sub-nav, add optgroup element with child options
            if($li.children('ul, ol').length && settings.nested){
                createOptionGroup($li, $select);
            }
            //otherwise it's a single level select menu, so build option
            else {
                createOption($li, $select);
            }
        });

        //add change event and prepend menu to set element
        $select
            .change(function(){goTo($(this).val());})
            .prependTo(settings.prependTo);
    }//createSelect()

    //function to run plugin functionality
    function runPlugin(){

        //menu doesn't exist
        if(isMobile() && !menuExists()){

            //if user wants to combine menus, create a single <select>
            if(settings.combine){
                var $menu = combineLists();
                createSelect($menu);
            }
            //otherwise, create a select for each matched list
            else{
                $menus.each(function(){
                    createSelect($(this));
                });
            }
        }

        //menu exists, and browser is mobile width
        if(isMobile() && menuExists()){
            $('.mnav').show();
            $menus.hide();
        }

        //otherwise, hide the mobile menu
        if(!isMobile() && menuExists()){
            $('.mnav').hide();
            $menus.show();
        }
    }//runPlugin()

    //plugin definition
    $.fn.mobileMenu = function(options){

        //override the default settings if user provides some
        if(options){$.extend(settings, options);}

        //check if user has run the plugin against list element(s)
        if(isList($(this))){
            $menus = $(this);
            runPlugin();
            $(window).resize(function(){runPlugin();});
        }
    };//mobileMenu()
})(jQuery);

/**
 * my own fade plugin
 * @param b
 */
(function($) {
    "use strict";

    $.fn.fadeLink = function(b) {
        $(this).on('click', function (event) {
            var $this = $(this);
            var url = $this.attr('href'); // pick url for redirecting via javascript
            if ((url.indexOf('#') !== 0) && ($this.attr('target') !== '_blank')) {
                event.preventDefault();
                $(b).fadeOut('fast', function () {
                    document.location.href = url;
                });
            }
        });
    };
})(jQuery);

/*
 * Yet Another Jquery Accordion
 *
 * Original work Copyright 2007-2010 Marco van Hylckama Vlieg
 * Modified work Copyright 2013 Michael Veeck
 *
 */
(function($)
{
    "use strict";
    $.fn.initMenu = function(options)
    {
        var settings =
        {
            action : "click"
        };

        if(options)
        {
            if (options.action === 'hover')
            {
                options.action = 'mouseenter';
            }
            $.extend(settings, options);
        }

        return this.each(function ()
        {
            $('.acitem', this).hide();
            $('li.expand > .acitem', this).show();
            $('li.expand > .acitem', this).prev().addClass('active');
            $('li a', this).on (settings.action, function (e)
            {
                e.stopImmediatePropagation();
                var theElement = $(this).next();
                var parent = this.parentNode.parentNode;
                if ($(parent).hasClass('noaccordion'))
                {
                    if (theElement[0] === undefined)
                    {
                        window.location.href = this.href;
                    }
                    $(theElement).slideToggle('normal', function ()
                    {
                        if ($(this).is(':visible')) {
                            $(this).prev().addClass('active');
                        } else {
                            $(this).prev().removeClass('active');
                        }
                    });
                    return false;
                } else {
                    if (theElement.hasClass('acitem') && theElement.is(':visible'))
                    {
                        if ($(parent).hasClass('collapsible'))
                        {
                            $('.acitem:visible', parent).first().slideUp('normal', function ()
                            {
                                $(this).prev().removeClass('active');
                            });
                            return false;
                        }
                        return false;
                    }
                    if (theElement.hasClass('acitem') && !theElement.is(':visible'))
                    {
                        $('.acitem:visible', parent).first().slideUp('normal', function ()
                        {
                            $(this).prev().removeClass('active');
                        });
                        theElement.slideDown('normal', function ()
                        {
                            $(this).prev().addClass('active');
                        });
                        return false;
                    }
                }
                return true;
            });
        });
    };
})(jQuery);

/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.3
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
            skip_invisible  : true,
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

// http://code.google.com/p/resize-crop/
(function($){
    "use strict";

    $.fn.resizecrop = function(opt) {

        var defaults = {
            width:      50,
            height:     50,
            vertical:   "center",
            horizontal: "center",
            wrapper:    "span",
            moveClass:  true,
            moveId:     true,
            className:  "resizecrop",
            zoom:       true,
            wrapperCSS: {}
        };

        var options = $.extend(defaults, opt);

        return this.each(function() {

            var $obj = $(this);
            $obj.css("display","none"); // remove blink transformation
            $obj.removeAttr("width").removeAttr("height"); // remove attribute dimensions

            // Wrapper default CSS
            var wrapper = $(document.createElement(options.wrapper)).css({
                width: options.width,
                height: options.height,
                overflow: "hidden",
                display: "inline-block",
                "vertical-align": "middle",
                "position": "relative"
            }).css(options.wrapperCSS);

            // move Classes from IMG to Wrapper element
            if (options.moveClass) {

                var classAttr = $obj.attr("class");

                if (typeof classAttr !== 'undefined' && classAttr !== false && classAttr !== "") {

                    var classList = classAttr.split(/\s+/);
                    $.each(classList, function(index, className){
                        wrapper.addClass(className);
                    });
                    $obj.removeAttr("class");
                    $obj.addClass(options.className);
                }
            }

            // move Id from IMG to Wrapper element
            if (options.moveId) {
                var idName = $obj.attr("id");
                if (typeof idName !== "undefined" && idName !== false && idName !== "") {
                    $obj.removeAttr("id");
                    wrapper.attr("id", idName);
                }
            }

            $obj.wrap(wrapper);

            function transform(ref) {

                var width_ratio  = options.width  / ref.width();
                var height_ratio = options.height / ref.height();

                if (width_ratio > height_ratio) {

                    if (options.zoom || width_ratio < 1) {
                        ref.width(options.width);
                    }

                    switch(options.vertical) {
                        case "top":
                            ref.css("top", 0);
                            break;
                        case "bottom":
                            ref.css("bottom", 0);
                            break;
                        case "center":
                            ref.css("top", ((ref.height() - options.height) / -2) + "px");
                    }

                    if (options.zoom || width_ratio < 1) {
                        ref.css("left", 0);
                    } else {
                        ref.css("left", ((ref.width() - options.width) / -2) + "px");
                    }
                } else {

                    if (options.zoom || height_ratio < 1) {
                        ref.height(options.height);
                    }

                    switch(options.horizontal) {
                        case "left":
                            ref.css("left", 0);
                            break;
                        case "right":
                            ref.css("right", 0);
                            break;
                        case "center":
                            ref.css("left", ((ref.width() - options.width) / -2) + "px");
                    }

                    if (options.zoom || height_ratio < 1) {
                        ref.css("top", 0);
                    } else {
                        ref.css("top", ((ref.height() - options.height) / -2) + "px");
                    }
                }

                ref.css({position:"relative",display:"block"});
            }

            if(this.complete) { // fix load issue in Opera & IE...
                transform($obj);
            } else {
                $obj.load(function() {
                    transform($(this));
                });
            }
        });
    };
    $.fn.cropresize = $.fn.resizecrop; // -- deprecated, Backward compatibility
})(jQuery);

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
( function( $, window, undefined ) {

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