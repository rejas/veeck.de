// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

// place any jQuery/helper plugins in here, instead of separate, slower script files.

/*
 * jQuery Responsive menu plugin by Matt Kersley
 * Converts menus into a select elements for mobile devices and low browser widths
 * http://github.com/mattkersley/Responsive-Menu
 */
(function (b) {
    var c = 0;
    b.fn.mobileMenu = function (g) {
        function f(a) {
            return a.attr("id") ? b("#mobileMenu_" + a.attr("id")).length > 0 : (c++, a.attr("id", "mm" + c), b("#mobileMenu_mm" + c).length > 0);
        }

        function h(a) {
            a.hide();
            b("#mobileMenu_" + a.attr("id")).show();
        }

        function k(a) {
            if (a.is("ul, ol")) {
                var e = '<select id="mobileMenu_' + a.attr("id") + '" class="mobileMenu">';
                e += '<option value="">' + d.topOptionText + "</option>";
                a.find("li").each(function () {
                    var a = "", c = b(this).parents("ul, ol").length;
                    for (var i = 1; i < c; i++) {
                        a += d.indentString;
                    }
                    c = b(this).find("a:first-child").attr("href");
                    a += b(this).clone().children("ul, ol").remove().end().text();
                    e += '<option value="' + c + '">' + a + "</option>";
                });
                e += "</select>";
                a.parent().append(e);
                b("#mobileMenu_" + a.attr("id")).change(function () {
                    var a = b(this);
                    if (a.val() !== null)document.location.href = a.val();
                });
                h(a);
            } else {
                alert("mobileMenu will only work with UL or OL elements!");
            }
        }

        function j(a) {
            b(window).width() < d.switchWidth && !f(a) ? k(a) : b(window).width() < d.switchWidth && f(a) ? h(a) : !(b(window).width() < d.switchWidth) &&
                f(a) && (a.show(), b("#mobileMenu_" + a.attr("id")).hide());
        }

        var d = {switchWidth:768, topOptionText:"Select a page", indentString:"&nbsp;&nbsp;&nbsp;"};
        return this.each(function () {
            g && b.extend(d, g);
            var a = b(this);
            b(window).resize(function () {
                j(a);
            });
            j(a);
        });
    };
})(jQuery);

/**
 * my own fade plugin
 * @param b
 */
jQuery.fn.fadeLink = function (b) {
    $(this).on('click', function (event) {
        var $this = $(this);
        var url = $this.attr('href'); // pick url for redirecting via javascript
        if ((url.indexOf('#') != 0) && ($this.attr('target') != '_blank')) {
            event.preventDefault();
            $(b).fadeOut('fast', function () {
                document.location.href = url;
            });
        }
    });
};

/*
 * Simple JQuery menu. Copyright 2007-2010 by Marco van Hylckama Vlieg
 * web: http://www.i-marco.nl/weblog/
 * email: marco@i-marco.nl
 * http://www.i-marco.nl/weblog/archive/2010/02/27/yup_yet_another_jquery_accordi
 */
jQuery.fn.initMenu = function () {
    return this.each(function () {
        var theMenu = $(this).get(0);
        $('.acitem', this).hide();
        $('li.expand > .acitem', this).show();
        $('li.expand > .acitem', this).prev().addClass('active');
        $('li a', this).click(function (e) {
            e.stopImmediatePropagation();
            var theElement = $(this).next();
            var parent = this.parentNode.parentNode;
            if ($(parent).hasClass('noaccordion')) {
                if (theElement[0] === undefined) {
                    window.location.href = this.href;
                }
                $(theElement).slideToggle('normal', function () {
                    if ($(this).is(':visible')) {
                        $(this).prev().addClass('active');
                    } else {
                        $(this).prev().removeClass('active');
                    }
                });
                return false;
            } else {
                if (theElement.hasClass('acitem') && theElement.is(':visible')) {
                    if ($(parent).hasClass('collapsible')) {
                        $('.acitem:visible', parent).first().slideUp('normal', function () {
                            $(this).prev().removeClass('active');
                        });
                        return false;
                    }
                    return false;
                }
                if (theElement.hasClass('acitem') && !theElement.is(':visible')) {
                    $('.acitem:visible', parent).first().slideUp('normal', function () {
                        $(this).prev().removeClass('active');
                    });
                    theElement.slideDown('normal', function () {
                        $(this).prev().addClass('active');
                    });
                    return false;
                }
            }
        });
    });
};

/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2012 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.8.0
 *
 */
(function($, window) {
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
            load            : null
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
            $container.bind(settings.event, function(event) {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {
                            $self
                                .hide()
                                .attr("src", $self.data(settings.data_attribute))
                                [settings.effect](settings.effect_speed);
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
                        .attr("src", $self.data(settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function(event) {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function(event) {
            update();
        });

        /* Force initial check if images should appear. */
        update();
        
        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.height() + $window.scrollTop();
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
         return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && 
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() */

    $.extend($.expr[':'], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return !$.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window);