const baseConfig = require('./webpack.base.config.js'),
    merge = require('webpack-merge'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackconfig = merge(baseConfig, {
    mode: 'production',
    optimization: {
        minimize: true
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: '../report.html'
        })
    ]
});

module.exports = webpackconfig;
