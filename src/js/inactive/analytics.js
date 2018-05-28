/**
 * Analytics Code, deactivated now until DSVGO is sorted out
 *
 * import '~cookieconsent/build/cookieconsent.min.css';
 */

import 'cookieconsent';
import galite from 'ga-lite';

let Analytics = {

    init: () => {

        /**
         * Cookie Consent
         */
        window.cookieconsent.initialise({
            'palette': {
                'popup': {
                    'background': '#252e39'
                },
                'button': {
                    'background': '#14a7d0'
                }
            },
            'theme': 'classic'
        });

        /**
         * Google Analytics Lite
         */
        galite('create', 'UA-431999-1', 'auto');
        galite('send', 'pageview');
    }
};

export default Analytics;
