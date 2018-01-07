const baseConfig = require('./webpack.base.config.js'),
    merge = require('webpack-merge');

const webpackconfig = merge(baseConfig, {
    devtool: 'eval'
});

module.exports = webpackconfig;
