module.exports.register = function (Handlebars) {
    'use strict';

    Handlebars.registerHelper('markdown', require('helper-markdown')());
    Handlebars.registerHelper('md', require('helper-md').sync);
};
