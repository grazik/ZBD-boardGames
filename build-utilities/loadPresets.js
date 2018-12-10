const webpackMerge = require('webpack-merge');

const loadPresets = (env = { presets: [] }) => {
    const presets = env.presets || [],

        mergedPresets = [].concat(...[presets]),
        mergedConfigs = mergedPresets.map((presetName) => {
            return require(`./presets/webpack.${presetName}`)(env);
        });

    return webpackMerge({}, ...mergedConfigs);
};

module.exports = loadPresets;
