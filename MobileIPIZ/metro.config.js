const { getDefaultConfig } = require('expo/metro-config');

// keep the default config — avoid advanced requires that can trigger ESM/Windows loader issues
const config = getDefaultConfig(__dirname);

module.exports = config;
