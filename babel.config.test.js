module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    ['@babel/plugin-transform-react-jsx'],
    ['@babel/plugin-transform-modules-commonjs'],
  ],
};
