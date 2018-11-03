/* eslint-disable */

const path = require('path');
const modeConfig = env => require(`./build-utilities/webpack.${env.mode}.js`)(env);
const webpackMerge = require("webpack-merge");

const back = {
    output: {
        filename: 'server.js',
        path: path.join(__dirname, 'dist/server')
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [['env', {modules: false}]],
                            plugins: ['transform-regenerator', 'transform-runtime']
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
};

module.exports = ({mode} = {mode: 'production'}) => {
    return webpackMerge(back, modeConfig({mode}).backend)
};