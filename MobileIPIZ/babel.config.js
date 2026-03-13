module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        root: ['./'],
        alias: {
          '@components': './src/components',
          '@atoms': './src/components/atoms',
          '@molecules': './src/components/molecules',
          '@organisms': './src/components/organisms',
          '@base': './src/components/base',
          '@hooks': './src/hooks',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@core': './src/core',
          '@modules': './src/modules',
          '@contexts': './src/contexts',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@features': './src/features',
          '@types': './src/types',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      }],
      'react-native-reanimated/plugin',
    ]
  };
};
