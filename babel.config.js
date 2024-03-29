module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: '.',
        alias: {
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@types': './src/types',
          '@domain': './src/domain',
          '@brand': './src/brand',
          '@api': './src/api',
          '@utils': './src/utils',
          '@infra': './src/infra',
          '@services': './src/services',
          '@test': './src/test',
        },
      },
    ],
  ],
};
