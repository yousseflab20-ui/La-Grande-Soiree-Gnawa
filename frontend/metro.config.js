const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const root = path.resolve(__dirname, '..');
const watchFolders = [root];

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders,
  resolver: {
    nodeModulesPaths: [path.resolve(root, 'node_modules')],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
