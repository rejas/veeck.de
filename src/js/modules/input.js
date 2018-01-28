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
         * Links
         */
        document.querySelectorAll('.js-search__icon').forEach((inputEl) => {
            inputEl.addEventListener('click', (event) => {
                event.preventDefault();

                let iform = document.querySelector('.js-links__form'),
                    input = document.querySelector('.js-links__input'),
                    query = document.querySelector('#search__input').value;

                if (query && query !== '') {
                    input.value = query;

                    iform.action = inputEl.dataset.search;
                    iform.submit();
                }

                return false;
            });
        });
    }
};

export default Input;
