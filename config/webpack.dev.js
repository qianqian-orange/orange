const { merge } = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base')

const resolvePath = (...paths) => path.join(__dirname, ...paths)

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    hot: true,
    progress: true,
    compress: true,
    clientLogLevel: 'silent',
    contentBase: resolvePath('../dist'),
    overlay: false,
    // proxy: {},
    // historyApiFallback: {}
  },
  devtool: '#cheap-module-eval-source-map',
})