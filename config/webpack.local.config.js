const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const DotEnv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const PORT = 7777

module.exports = merge(baseConfig, {
  module: {
    rules: [
      {
        test: /\.(woff2?|otf|ttf|eot)$/,
        exclude: /node_modules|stories/,
        use: [
          {
            loader: 'file-loader',
            options: {
              //   name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DotEnv({
      path: path.resolve(__dirname, './local.env'),
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ],
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'bundle.js',
    publicPath: 'http://localhost:' + PORT + '/',
  },
  devServer: {
    port: PORT,
    host: '127.0.0.1',
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
    inline: true,
  },
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
  },
})
