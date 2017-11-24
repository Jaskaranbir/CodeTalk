require('./check-versions')()

process.env.NODE_ENV = 'production'

const chalk = require('chalk')
const config = require('../config')
const ora = require('ora')
const path = require('path')
const rm = require('rimraf')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('Building for Production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) {
    throw err
  }

  webpackConfig.getProdConfigPromise()
    .then(runWebpackConfig)
    .catch(e => {
      throw e
    })
})

function runWebpackConfig(conf) {
  webpack(conf, (err, stats) => {
    spinner.stop()
    if (err) {
      throw err
    }
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.'))
    console.log(chalk.yellow('  I would wish good luck but that\'d be pointless :)'))
  })
}
