const path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

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
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    loader: "css-loader!postcss-loader!less-loader"
                }),
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    require('autoprefixer')()
                ]
            }
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
