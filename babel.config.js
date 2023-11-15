module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@envs': './envs',
          '@assets': './src/assets',
          '@data': './src/data',
          '@domain': './src/domain',
          '@presentation': './src/presentation',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
