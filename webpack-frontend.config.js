/* eslint-disable */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge');
const loadPresets = require('./build-utilities/loadPresets');
modeConfig = env => require(`./build-utilities/webpack.${env.mode}.js`)(env);

const front = {
    entry: path.resolve(__dirname, 'src/client/index.js'),
    target: 'web',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/client'),
    },
    module: {
        rules: [
            {
                test: /\.(gif|png|jpe?g|webp|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            context: path.resolve(__dirname, './src/client'),
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            }
        ],
    },
    plugins:
        [
            new CleanWebpackPlugin(path.resolve(__dirname, 'dist/client')),
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                title: 'Test',
                template: './src/client/index.html',
                hash: true,
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