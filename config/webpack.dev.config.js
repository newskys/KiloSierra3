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

// phase
//  - local -> 개인 컴퓨터, 리액트 관련 서버는 다 로컬에서. 데이터 요청 시 개발망 API 서버를 찌른다.
//  - dev -> dev 개발망 서버. 데이터 요청 시 개발망 API 서버를 찌른다.
//  - qa -> qa 개발망 서버. 데이터 요청 시 개발망 API 서버를 찌른다.
//  - stage -> stage 리얼망 서버. 데이터 요청 시 리얼망 API 서버를 찌른다.
//  - real -> real 리얼망 서버. 데이터 요청 시 리얼망 API 서버를 찌른다.
