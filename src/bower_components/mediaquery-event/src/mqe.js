/**
 *
 */
export function init (options) {
    let mqs = options.mediaqueries;

    let handleMediaChange = (mediaQueryList)  => {
        let media = mqs.filter(function (el) {
            return el.media === mediaQueryList.media;
        });

        if (media.length === 0) {
            return;
        }
        media = media[0];

        let event = new CustomEvent('mediaquery', {
            detail: {
                active: mediaQueryList.matches,
                media: media.name
            }
        });

        document.dispatchEvent(event);
    };

    for (let mq of mqs) {
        let mql = window.matchMedia(mq.media);
        mql.addListener(handleMediaChange);
        handleMediaChange(mql);
    }
}
