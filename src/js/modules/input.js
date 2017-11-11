/**
 *
 */

function onInputFocus (ev) {
    ev.target.parentNode.classList.add('input--filled');
}

function onInputBlur (ev) {
    if (ev.target.value.trim() === '') {
        ev.target.parentNode.classList.remove('input--filled');
    }
}

let Input = {

    init: function () {
        document.querySelectorAll('.js-input__field--manami').forEach((inputEl) => {
            // in case the input is already filled..
            if (inputEl.value.trim() !== '') {
                inputEl.parentNode.classList.add('input--filled');
            }
            // events:
            inputEl.addEventListener('focus', onInputFocus);
            inputEl.addEventListener('blur', onInputBlur);
        });
    }
};

export default Input;
