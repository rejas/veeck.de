const path = require('path'),
    autoprefixer = require('autoprefixer'),
    cssmqpacker = require('css-mqpacker'),
    objectfit = require('postcss-object-fit-images'),
    sprites = require('postcss-sprites'),
    cssnano = require('cssnano'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackconfig = {
    entry: {
        bundle: path.resolve(__dirname, '../src/js/main.js')
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../dist/')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer(),
                                cssmqpacker(),
                                cssnano(),
                                objectfit(),
                                sprites({
                                    spritePath: 'tmp/',
                                    retina: true
                                })
                            ],
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(webp|png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'css/[hash].[ext]',
                        publicPath: '/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ],
    resolve: {
        modules: ['node_modules']
    }
};

module.exports = webpackconfig;
