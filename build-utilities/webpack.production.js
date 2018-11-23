/* eslint-disable */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const frontend = {
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader',
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            PRODUCTION: 'true',
        }),
    ],
};

const backend = {
    entry: [
        path.resolve(__dirname, '../src/server/index.js'),
    ],
    externals: [nodeExternals()],
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: 'true',
        }),
    ]


};

module.exports = () => {
    return {
        frontend,
        backend,
    };
};