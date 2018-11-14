/* eslint-disable */

const webpack = require('webpack');
const StartServerPlugin = require('start-server-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const frontend = {
    entry: [
        path.resolve(__dirname, '../src/client/index.js')
    ],
    watch: true,
    devServer: {
        open: true,
        proxy: {
            '/api': 'http://localhost:3000'
        },
        inline: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: 'false',
        })
    ]
};

const backend = {
    entry: [
        'webpack/hot/poll?1000',
        path.resolve(__dirname, '../src/server/index.js')
    ],
    watch: true,
    externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
    plugins: [
        new StartServerPlugin('server.js'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            PRODUCTION: 'false',
        })
    ]
};

module.exports = (env) => {
    return {
        frontend,
        backend,
    };
};