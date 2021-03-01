const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const resolvePath = (...paths) => path.join(__dirname, ...paths)
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: resolvePath('../src/index.js'),
  output: {
    filename: '[name].[hash:6].js',
    path: resolvePath('../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        use: 'eslint-loader',
        include: resolvePath('../src'),
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        include: resolvePath('../src'),
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        include: resolvePath('../src'),
      },
      {
        test: /\.(c|le)ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              prependData: '@import "~@/less/index.less";',
            },
          },
        ]
      },
      {
        test: /\.(png|jpg|jpeg|webp|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            limit: 1024 * 10, // 10kb
            outputPath: 'static/image',
            name: '[name].[hash:6].[ext]',
          },
        },
        include: resolvePath('../src'),
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            esMoudle: false,
            outputPath: 'static/font',
            name: '[name].[hash:6].[ext]',
          },
        },
        include: resolvePath('../src'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolvePath('../public/index.html'),
      // minify: {
      //   collapseWhitespace: false,
      // },
      config: {
        isDev,
      },
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash:6].css',
    }),
    new VueLoaderPlugin(),
    new StyleLintPlugin({
      context: resolvePath('../src'),
      files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
    }),
  ],
  resolve: {
    modules: [resolvePath('../src'), resolvePath('../node_modules')],
    alias: {
      '@': resolvePath('../src'),
      'ruler': resolvePath('../src/components/ruler'),
      'vue': resolvePath('../node_modules/vue/dist/vue.esm.js'),
    },
    extensions: ['.js', '.vue'],
  },
}
