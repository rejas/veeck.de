import classie from 'classie/lib/classie';

function onInputFocus( ev ) {
    classie.add( ev.target.parentNode, 'input--filled' );
}

function onInputBlur( ev ) {
    if( ev.target.value.trim() === '' ) {
        classie.remove( ev.target.parentNode, 'input--filled' );
    }
}

export function init() {
    [].slice.call( document.querySelectorAll( 'input.input__field--manami' ) ).forEach( function( inputEl ) {
        // in case the input is already filled..
        if( inputEl.value.trim() !== '' ) {
            classie.add( inputEl.parentNode, 'input--filled' );
        }
        // events:
        inputEl.addEventListener( 'focus', onInputFocus );
        inputEl.addEventListener( 'blur', onInputBlur );
    } );
}
