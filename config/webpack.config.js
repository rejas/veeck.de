const path = require('path');
const webpack = require('webpack');

const VENDOR_LIBS = [
    './src/bower_components/outdated-browser/outdatedbrowser/outdatedbrowser.js',
    './src/js/vendor/modernizr.min.js'
];

const config = {
    entry: {
        bundle: './src/js/main.js',
        vendor: VENDOR_LIBS
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
        /*
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        */
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        },
        modules: ['./src/bower_components', 'node_modules']
    }
};

module.exports = config;
