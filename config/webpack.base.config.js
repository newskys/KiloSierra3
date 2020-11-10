const path = require('path')
const alias = require('./alias')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.tsx'), // 직접 코드 수정하는 부분
  },
  output: {
    path: path.resolve(__dirname, '../dist/js/'), //output으로 나올 파일이 저장될 경로
    filename: 'bundle.js',
    chunkFilename: '[name].js',
    publicPath: '/js/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', // css -> js (commonJS)
            options: {
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
              url: true,
            },
          },
          'resolve-url-loader',
          'sass-loader', // sass -> css (using node-sass)
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/bundle.css',
      chunkFilename: '[name].css',
      ignoreOrder: false,
    }),
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '../src')],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json'],
    alias,
  },
}
