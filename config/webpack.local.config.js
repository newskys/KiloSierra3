const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const DotEnv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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

// 개발망 이상: 웹서버1 + 스태틱JS(+CSS)
// 로컬: 웹서버1(node) + 로컬에 실시간 번들링 전용으로 해주는 서버 하나 더 만들자 -> webpack-dev-server -> plugins 다음에 설정값들이 많은 이유