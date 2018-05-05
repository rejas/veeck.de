const baseConfig = require('./webpack.base.config.js'),
    merge = require('webpack-merge');

const webpackconfig = merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map'
});

module.exports = webpackconfig;
