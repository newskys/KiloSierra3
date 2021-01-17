const path = require('path')
const alias = require('./alias')

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
        test: /\.scss$/,
        use: [
          "style-loader", // Creates `style` nodes from JS strings
          "css-loader",   // Translates CSS into CommonJS
          "postcss-loader",
          {
            loader: "sass-loader",   // Compiles Sass to CSS
            options: {
              sourceMap: true,
              sassOptions: {
                // includePaths: ["absolute/path/a", "absolute/path/b"],
                outPutStyle: "compressed"
              }
            }
          }
          
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
