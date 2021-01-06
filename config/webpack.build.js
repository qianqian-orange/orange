const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const baseConfig = require('./webpack.base')

const resolvePath = (...paths) => path.join(__dirname, ...paths)
module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll/**'],
    }),
    new webpack.DllReferencePlugin({
      manifest: resolvePath('../dist', 'dll', 'manifest.json'),
    }),
  ],
  devtool: '#source-map',
})
