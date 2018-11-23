/* eslint-disable */

const path = require('path');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const loadPresets = require('./build-utilities/loadPresets');
const modeConfig = env => require(`./build-utilities/webpack.${env.mode}`)(env);

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
    resolve: {
        alias: {
            db: path.resolve(__dirname, './src/server/db.js'),
            server: path.resolve(__dirname, './src/server'),
        },
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
                            presets: [['@babel/preset-env', { modules: false }]],
                            plugins: ['@babel/plugin-transform-regenerator', '@babel/plugin-transform-runtime']
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(graphql)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'raw-loader'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(path.resolve(__dirname, 'dist/server')),
    ]
};

module.exports = ({ mode = 'production', presets = [] }) => {
    return webpackMerge(
        back,
        modeConfig({
            mode,
            presets
        }).backend,
        loadPresets({
            mode,
            presets
        }),
        { mode },
    );
};