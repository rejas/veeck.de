const path = require('path'),
    webpack = require('webpack');

const config = {
    entry: {
        bundle: './src/js/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist/js'),
        filename: '[name].js',
        publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    resolve: {
        alias: {
            jquery: 'jquery/src/jquery'
        },
        modules: ['src/bower_components', 'node_modules']
    }
};

module.exports = config;
