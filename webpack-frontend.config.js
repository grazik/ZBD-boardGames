/* eslint-disable */

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const modeConfig = env => require(`./build-utilities/webpack.${env.mode}.js`)(env);
const webpackMerge = require("webpack-merge");

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
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader"
                ]
            }
        ]
    },
    plugins:
        [
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                title: 'Test',
                template: './src/client/index.html',
                hash: true,
            }),

        ]
};

module.exports = ({mode} = {mode: 'production'}) => {
    return webpackMerge(front, modeConfig({mode}).frontend)
};