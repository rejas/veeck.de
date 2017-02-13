'use strict';

/**
 *
 */
module.exports = {

    init: function init(options) {
        var mqs = options.mediaqueries;

        var handleMediaChange = function handleMediaChange(mediaQueryList) {
            var media = mqs.filter(function (el) {
                return el.media === mediaQueryList.media;
            });

            if (media.length === 0) {
                return;
            }
            media = media[0];

            var event = new CustomEvent('mediaquery', {
                detail: {
                    active: mediaQueryList.matches,
                    media: media.name
                }
            });

            document.dispatchEvent(event);
        };

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = mqs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var mq = _step.value;

                var mql = window.matchMedia(mq.media);
                mql.addListener(handleMediaChange);
                handleMediaChange(mql);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
};