/**
 *
 */
module.exports = {

    init: function (options) {
        var mqs = options.mediaqueries,
            arrayLength = mqs.length;

        var handleMediaChange = function (mediaQueryList) {
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

        for (var i = 0; i < arrayLength; i++) {
            var mql = window.matchMedia(mqs[i].media);
            mql.addListener(handleMediaChange);
            handleMediaChange(mql);
        }
    }
};
