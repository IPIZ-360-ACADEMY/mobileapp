const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

// keep the default config — avoid advanced requires that can trigger ESM/Windows loader issues
const config = getDefaultConfig(__dirname);

// add alias resolution for metro bundler
const extraNodeModules = {
  '@components': path.resolve(__dirname, 'src/components'),
  '@atoms': path.resolve(__dirname, 'src/components/atoms'),
  '@molecules': path.resolve(__dirname, 'src/components/molecules'),
  '@organisms': path.resolve(__dirname, 'src/components/organisms'),
  '@base': path.resolve(__dirname, 'src/components/base'),
  '@hooks': path.resolve(__dirname, 'src/hooks'),
  '@theme': path.resolve(__dirname, 'src/theme'),
  '@utils': path.resolve(__dirname, 'src/utils'),
  '@assets': path.resolve(__dirname, 'src/assets'),
  '@core': path.resolve(__dirname, 'src/core'),
  '@modules': path.resolve(__dirname, 'src/modules'),
  '@contexts': path.resolve(__dirname, 'src/contexts'),
  '@navigation': path.resolve(__dirname, 'src/navigation'),
  '@screens': path.resolve(__dirname, 'src/screens'),
  '@features': path.resolve(__dirname, 'src/features'),
  '@types': path.resolve(__dirname, 'src/types'),
};

config.resolver = {
  ...config.resolver,
  extraNodeModules,
};

config.watchFolders = [
  path.resolve(__dirname, 'src'),
];

module.exports = config;
