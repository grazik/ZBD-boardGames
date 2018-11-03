/* eslint-disable */

const webpack = require('webpack');
const StartServerPlugin = require('start-server-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

console.log(path.resolve(__dirname, '../src/client'));

const frontend = {
    mode: 'development',
    watch: true,
    devServer: {
        open: true,
        proxy: {
            '/api': 'http://localhost:3000'
        }
    },
};

const backend = {
    mode: 'development',
    entry: ['webpack/hot/poll?1000', path.resolve(__dirname, '../src/server/index.js')],
    watch: true,
    externals: [nodeExternals({whitelist: ['webpack/hot/poll?1000']})],
    plugins: [
        new StartServerPlugin('server.js'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
};

module.exports = (env) => {
    console.log(env);
    return {
        frontend,
        backend,
    }
};