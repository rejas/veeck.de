/**
 *
 */
let Input = {

    init: () => {
        /**
         * Styled Input Elements
         */
        document.querySelectorAll('.js-input__field--manami').forEach((inputEl) => {
            // in case the input is already filled..
            if (inputEl.value.trim() !== '') {
                inputEl.parentNode.classList.add('input--filled');
            }
            // events:
            inputEl.addEventListener('focus', (event) => {
                event.target.parentNode.classList.add('input--filled');
            });
            inputEl.addEventListener('blur', (event) => {
                if (event.target.value.trim() === '') {
                    event.target.parentNode.classList.remove('input--filled');
                }
            });
        });

        /**
         * Search handling on links page
         */
        document.querySelectorAll('.js-search__button').forEach((inputEl) => {
            inputEl.addEventListener('click', (event) => {
                event.preventDefault();

                let iform = document.querySelector('.js-links__form'),
                    input = document.querySelector('.js-links__input'),
                    query = document.querySelector('#search__input').value,
                    queryName = inputEl.dataset.query;

                if (queryName && queryName !== '') {
                    input.name = queryName;
                } else {
                    input.name = 'q';
                }

                if (query && query !== '') {
                    input.value = query;
                    iform.action = inputEl.dataset.search;
                    iform.submit();
                } else {
                    document.querySelector('#search__input').focus();
                }

                return false;
            });
        });
    }
};

export default Input;
