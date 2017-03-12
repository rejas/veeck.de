const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, '../dist/js'),
        filename: 'main.bundled.js',
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
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    resolve: {
        modules: ['./src/bower_components', 'node_modules']
    }
};

module.exports = config;
