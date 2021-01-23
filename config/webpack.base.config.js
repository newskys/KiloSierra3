const path = require('path')
const alias = require('./alias')
const autoprefixer = require('autoprefixer')

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
        test: /\.(css|scss)$/,
        use: [
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]_[local]_[hash:base64:5]"
              },
            },
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  flexbox: "no-2009"
                })
              ],
            },
          },
          {
            loader: "sass-loader",   // Compiles Sass to CSS
            options: {
            }
          },
        ],
      },
    ],
  },
  plugins: [
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '../src')],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.json'],
    alias,
  },
}
