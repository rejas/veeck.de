import VanillaTilt from 'vanilla-tilt';

/**
 * Travel picture transformations
 */
let TravelImages = {

    init: () => {
        document.querySelectorAll('.js-travel__picture').forEach((figure) => {
            figure.style.setProperty('--figure-angle-seed', (Math.random() * 8 - 4) + 'deg');
        });

        VanillaTilt.init(document.querySelectorAll('.js-travel__picture'), {
            max: 10,
            scale: 1.1,
            speed: 250
        });
    }
};

export default TravelImages;
