/* eslint-disable */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const frontend = {
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

};

module.exports = () => {
    return {
        frontend,
        backend,
    };
};