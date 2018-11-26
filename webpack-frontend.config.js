/* eslint-disable */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge');
const loadPresets = require('./build-utilities/loadPresets');
modeConfig = env => require(`./build-utilities/webpack.${env.mode}.js`)(env);

const front = {
    entry: {
        index: path.resolve(__dirname, 'src/client/index.js'),
        loginPage: path.resolve(__dirname, 'src/client/loginPage.js'),
    },
    target: 'web',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/client'),
    },
    resolve: {
        alias: {
            images: path.resolve(__dirname, './src/client/images'),
            components: path.resolve(__dirname, 'src/client/components'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: ['/node_modules/'],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: ['@babel/plugin-syntax-dynamic-import'],
                            presets: [['@babel/preset-env', { modules: false }]],
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g|webp|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            context: path.resolve(__dirname, './src/client'),
                            name: '[path][name].[ext]',
                            publicPath(url) {
                                return `${path.dirname(url)}/${path.basename(url)}`;
                            },
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        interpolate: true,
                    },
                }],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?$|$)/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        context: path.resolve(__dirname, './src/client'),
                        name: '[path][name].[ext]',
                        publicPath(url) {
                            return url.replace('\\', '/');
                        },
                    },
                }],
            },
        ],
    },
    plugins:
        [
            new CleanWebpackPlugin(path.resolve(__dirname, 'dist/client')),
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                title: 'Login',
                template: './src/client/templates/loginPage.html',
                hash: true,
                filename: 'loginPage.html',
                chunks: ['loginPage'],
            }),
            new HtmlWebpackPlugin({
                title: 'BoardGames World',
                template: './src/client/templates/index.html',
                hash: true,
                filename: 'index.html',
                chunks: ['index'],

            }),
        ]
};


module.exports = ({ mode = 'production', presets = [] }) => {
    console.log(path.resolve(__dirname, './src/client'));
    return webpackMerge(
        front,
        modeConfig({
            mode,
            presets
        }).frontend,
        loadPresets({
            mode,
            presets
        }),
        { mode },
    );
};