const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const DotEnv = require('dotenv-webpack')

module.exports = (env) =>
  merge(baseConfig, {
    mode: 'production',
    plugins: [
      new DotEnv({
        path: path.resolve(__dirname, './dev.env'),
      }),
    ],
  })
