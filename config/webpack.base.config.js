const path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackconfig = {
    entry: {
        bundle: path.resolve(__dirname, '../src/js/main.js')
    },
    output: {
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [
                            ['env', {
                                modules: false,
                                useBuiltIns: true
                            }]
                        ]
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
                            plugins: () => [
                                require('autoprefixer')(),
                                require('css-mqpacker')(),
                                require('postcss-normalize')(),
                                require('postcss-object-fit-images')(),
                                require('postcss-sprites')({
                                    spritePath: 'tmp/'
                                })
                            ],
                            sourceMap: true
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            strictMath: true
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
                        name: 'css/[hash].[ext]',
                        publicPath: '/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css'
        })
    ],
    resolve: {
        alias: {
            jquery: 'jquery/src/jquery'
        },
        modules: ['node_modules']
    }
};

module.exports = webpackconfig;
