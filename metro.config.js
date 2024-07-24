const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

// const { getDefaultConfig } = require('expo/metro-config'); // Use '@expo/metro-config' for Expo projects
// const defaultConfig = getDefaultConfig(__dirname);

// module.exports = {
//   transformer: {
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//   },
//   resolver: {
//     assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
//     sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
//   },
// };
