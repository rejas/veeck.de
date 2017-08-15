import 'core-js/es6/promise';

const config = {
    // If the image gets within 50px in the Y axis, start the download.
    rootMargin: '50px 0px',
    threshold: 0.01
};

const images = document.querySelectorAll('.js-lazyload');
let imageCount = images.length;
let observer;

/**
 * Fetchs the image for the given URL
 * @param {string} url
 */
function fetchImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = resolve;
        image.onerror = reject;
    });
}

/**
 * Preloads the image
 * @param {object} image
 */
function preloadImage(image) {
    const src = image.dataset.original;
    if (!src) {
        return;
    }

    return fetchImage(src).then(() => { applyImage(image, src) });
}

/**
 * Load all of the images immediately
 * @param {array} images
 */
function loadImagesImmediately(images) {
    Array.from(images).forEach(image => preloadImage(image));
}

/**
 * Disconnect the observer
 */
function disconnect() {
    if (!observer) {
        return;
    }

    observer.disconnect();
}

/**
 * On intersection
 * @param {array} entries
 */
function onIntersection(entries) {
    // Disconnect if we've already loaded all of the images
    if (imageCount === 0) {
        observer.disconnect();
    }

    // Loop through the entries
    entries.forEach(entry => {
        // Are we in viewport?
        if (entry.intersectionRatio > 0) {
            imageCount--;

            // Stop watching and load the image
            observer.unobserve(entry.target);
            preloadImage(entry.target);
        }
    });
}

/**
 * Apply the image
 * @param {object} img
 * @param {string} src
 */
function applyImage(img, src) {
    // Prevent this from being lazy loaded a second time.
    img.classList.add('js-lazyload--handled');
    img.src = src;
}

export function init() {
    // If we don't have support for intersection observer, loads the images immediately
    if (!('IntersectionObserver' in window)) {
        Array.prototype.forEach.call(images, (image) => preloadImage(image));
    } else {
        // It is supported, load the images
        observer = new IntersectionObserver(onIntersection, config);

        Array.prototype.forEach.call(images, (image) => {
            if (image.classList.contains('js-lazyload--handled')) {
                return;
            }
            observer.observe(image);
        });
    }
}
