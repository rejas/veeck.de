const config = require('./grunt.config.js'),
    path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackconfig = {
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
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                }),
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[hash].[ext]',
                    publicPath: './'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    require('autoprefixer')(config.autoprefixer),
                    require('css-mqpacker')(),
                    require('postcss-sprites')({
                        spritePath: 'tmp/'
                    })
                ]
            }
        })
    ],
    resolve: {
        alias: {
            jquery: 'jquery/src/jquery'
        },
        modules: ['src/bower_components', 'node_modules']
    }
};

module.exports = webpackconfig;
