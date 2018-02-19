let Intro = {

    init: () => {

        /**
         *
         */
        let imgH = document.querySelector('.header__image');
        if (imgH) {
            imgH.addEventListener('click', () => {
                //console.log(e);
            });
        }

        /*
        // disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179
        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        let keys = [32, 37, 38, 39, 40],
            //wheelIter = 0,
            docElem = document.documentElement,
            scrollVal,
            isRevealed,
            noscroll,
            isAnimating,
            container = document.querySelector('.js-intro-effect-side'),
            trigger = container.querySelector('.js-trigger');

        // detect if IE : from http://stackoverflow.com/a/16657946
        let ie = (function() {
            let undef,
                rv = -1, // Return value assumes failure.
                ua = window.navigator.userAgent,
                msie = ua.indexOf('MSIE '),
                trident = ua.indexOf('Trident/'),
                rvNum = ua.indexOf('rv:');

            if (msie > 0) {
                // IE 10 or older => return version number
                rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            } else if (trident > 0) {
                // IE 11 (or newer) => return version number
                rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
            }

            return ((rv > -1) ? rv : undef);
        }());

        function preventDefault(e) {
            e = e || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }

        function keydown(e) {
            for (let i = keys.length; i--;) {
                if (e.keyCode === keys[i]) {
                    preventDefault(e);
                    return;
                }
            }
        }

        function touchmove(e) {
            preventDefault(e);
        }

        function wheel() {
            // for IE
            // if( ie ) {
            // preventDefault(e);
            // }
        }

        function disableScroll() {
            window.onmousewheel = document.onmousewheel = wheel;
            document.onkeydown = keydown;
            document.body.ontouchmove = touchmove;
        }

        function enableScroll() {
            window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
        }

        function toggle(reveal) {
            isAnimating = true;

            if (reveal) {
                container.classList.add('modify');
            } else {
                noscroll = true;
                disableScroll();
                container.classList.remove('modify');
            }

            // simulating the end of the transition:
            setTimeout(function() {
                isRevealed = !isRevealed;
                isAnimating = false;
                if (reveal) {
                    noscroll = false;
                    enableScroll();
                }
            }, 1200);
        }

        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }

        function scrollPage() {
            scrollVal = scrollY();

            if (isAnimating) {
                return false;
            }

            if (noscroll && !ie) {
                if (scrollVal < 0) {
                    return false;
                }
                // keep it that way
                window.scrollTo(0, 0);
            }

            if (container.classList.contains('notrans')) {
                container.classList.remove('notrans');
                return false;
            }

            if (scrollVal <= 0 && isRevealed) {
                toggle(0);
            } else if (scrollVal > 0 && !isRevealed) {
                toggle(1);
            }
        }

        // refreshing the page...
        let pageScroll = scrollY();

        noscroll = pageScroll === 0;

        disableScroll();

        if (pageScroll) {
            isRevealed = true;
            container.classList.add('notrans');
            container.classList.add('modify');
        }

        window.addEventListener('scroll', scrollPage);
        trigger.addEventListener('click', () => {
            toggle('reveal');
        });
        */
    }
};

export default Intro;
