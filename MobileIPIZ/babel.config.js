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
          '@modules': './src/modules'
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      }]
    ]
  };
};
