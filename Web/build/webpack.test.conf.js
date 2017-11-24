// This webpack config is used for unit tests.
const baseConfig = require('./webpack.base.conf')
const config = require('../config')
const loaderConfigs  = require('./helpers/loaderConfigs')
const merge = require('webpack-merge')
const webpack = require('webpack')

const webpackConfig = merge(baseConfig, {
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /\.spec\.ts$/,
        loader: 'happypack/loader?id=ts'
      },
      {
        test: /\.scss$/,
        loader: 'happypack/loader?id=scss'
      }
    ]
  },

  devtool: '#inline-source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tsconfig: utils.resolvePath('config/test/tsconfig.test.json'),
      tslint: utils.resolvePath('tslint.json'),
      watch: utils.resolvePath('src')
    }),

    loaderConfigs.generateHappyPackTS({
      errorFormatter: utils.tsConfErrorFormatter,
      happyPackMode : true,
      transpileOnly: true,
      configFile: utils.resolvePath('config/test/tsconfig.test.json')
    }).loaders.unshift(
      'istanbul-instrumenter-loader'
    ),

    loaderConfigs.generateHappyPackSCSS({ sourceMap: config.dev.cssSourceMap }),

    new webpack.DefinePlugin({
      'process.env': require('../config/test/test.env')
    })
  ]
})

// No need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
