const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const resolvePath = (...paths) => path.join(__dirname, ...paths)

module.exports = {
  mode: 'production',
  entry: {
    vendors: ['vue', 'vuex', 'vue-router', 'axios'],
  },
  output: {
    filename: '[name].[hash:6].dll.js',
    path: resolvePath('../dist/dll'),
    library: '[name]_dll',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '[name]_dll',
      path: resolvePath('../dist', 'dll', 'manifest.json'),
    }),
  ],
}
