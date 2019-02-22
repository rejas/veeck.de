const baseConfig = require('./webpack.base.config.js'),
    merge = require('webpack-merge'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    TerserPlugin = require('terser-webpack-plugin');

const webpackconfig = merge(baseConfig, {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true
            })
        ]
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
