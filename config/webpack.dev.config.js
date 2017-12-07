const baseConfig = require('./webpack.base.config.js'),
    merge = require('webpack-merge'),
    path = require('path');

const webpackconfig = merge(baseConfig, {
    devtool: 'eval',

    output: {
        path: path.resolve(__dirname, '../dist/'),
    }
});

module.exports = webpackconfig;
