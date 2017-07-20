const config = require('./grunt.config.js'),
    path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackconfig = {
    entry: {
        bundle: path.resolve(__dirname, '../src/js/main.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }]
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')(),
                                    require('css-mqpacker')(),
                                    require('postcss-normalize')(),
                                    require('postcss-object-fit-images')(),
                                    require('postcss-sprites')({
                                        spritePath: 'tmp/'
                                    })
                                ]
                            },
                            sourceMap: true
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'css/[hash].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '/css/[name].css'
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../src/assemble/layouts/default.hbs'),
            template: path.resolve(__dirname, '../src/assemble/layouts/default_template.hbs')
        }),
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

module.exports = webpackconfig;
