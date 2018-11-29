/* eslint-disable */

const webpack = require('webpack');
const StartServerPlugin = require('start-server-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const frontend = {
    watch: true,
    devServer: {
        open: true,
        proxy: [{
            context: ['/api', '/login'],
            target: 'http://localhost:3000',
        }],

        inline: true,
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
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