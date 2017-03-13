/**
 *
 */
export function init (options) {
    let mqs = options.mediaqueries;

    let handleMediaChange = (mediaQueryList) => {
        let media = mqs.filter(function (el) {
            return mediaQueryList.media.replace(/: /g, ':') === el.media;
        });

        if (media.length === 0) {
            return;
        }
        media = media[0];

        let event = document.createEvent("CustomEvent");
        event.initCustomEvent('mediaquery', false, false, {
            active: mediaQueryList.matches,
            media: media.name
        });

        document.dispatchEvent(event);
    };

    for (let mq of mqs) {
        mq.media = mq.media.replace(/: /g, ':');
        let mql = window.matchMedia(mq.media);
        mql.addListener(handleMediaChange);
        handleMediaChange(mql);
    }
}
