const os = require('os')
const utils = require('./utils')
const HappyPack = require('happypack')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

// Generate loaders for standalone style files
function getDevStyleLoaders(loaderOptions) {
  // Loaders with loader-specific config
  const loaders = {
    'to-string': {},
    'css': {
      importLoaders: 2
    },
    'sass': {
      outputStyle: 'expanded'
    }
  }
  const loaderConfig = Object.keys(loaders).map(l => (
    {
      path: `${l}-loader`,
      query: {
        ...loaderOptions,
        sourceMap: loaderOptions.sourceMap,
        ...loaders[l]
      }
    }
  ))

  return loaderConfig
}

exports.generateHappyPackSCSS = loaderOptions => new HappyPack({
  id: 'scss',
  threadPool: happyThreadPool,
  loaders: getDevStyleLoaders(loaderOptions)
})

exports.generateHappyPackTS = loaderOptions => {
  const tsLoader = {
    path: 'ts-loader',
    query: {
      ...loaderOptions,
      happyPackMode: true
    }
  }

  return new HappyPack({
    id: 'ts',
    threadPool: happyThreadPool,
    loaders: [ tsLoader, 'angular2-template-loader' ]
  })
}

exports.getProdStyleLoaders = loaderOptions => {
  const loaders = {
    'to-string': {},
    'css': {
      importLoaders: 2
    },
    'postcss': {
      ident: 'postcss',
      config: {
        path: utils.resolvePath('config/postcss.config.js')
      }
    },
    'sass': {
      outputStyle: 'expanded'
    }
  }

  const rules = [
    {
      test: /\.scss$/,
      use: Object.keys(loaders).map(l => (
        {
          loader: `${l}-loader`,
          options: {
            ...loaderOptions,
            sourceMap: loaderOptions.sourceMap,
            ...loaders[l]
          }
        }
      ))
    }
  ]

  return rules
}
