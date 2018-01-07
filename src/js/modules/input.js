/**
 *
 */

let Input = {

    init: () => {
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
    }
};

export default Input;
