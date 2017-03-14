const path = require('path');
const webpack = require('webpack');

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
