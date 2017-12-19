const baseConfig = require('./webpack.base.config.js'),
    merge = require('webpack-merge'),
    webpack = require('webpack'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackconfig = merge(baseConfig, {
    devtool: 'source-map',

    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: '../report.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            warnings: false
        })
    ]
});

module.exports = webpackconfig;
