const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
            },
            {
                test: /\.less$/,
                //use: ['style-loader', 'css-loader']
                loader: ExtractTextPlugin.extract({
                    loader:[ 'css-loader', 'less-loader' ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 40000 }
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/style.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
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
