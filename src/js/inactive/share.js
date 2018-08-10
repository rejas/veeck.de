let Share = {
    init: () => {
        /**
         * Share to facebook
         */
        let facebook = document.querySelector('.js-share-facebook');
        if (facebook) {
            facebook.addEventListener('click', () => {
                window.open('https://www.facebook.com/sharer/sharer.php?u='
                    + encodeURIComponent(document.URL) + '&t='
                    + encodeURIComponent(document.URL));
                return false;
            });
        }
    }
};

export default Share;
