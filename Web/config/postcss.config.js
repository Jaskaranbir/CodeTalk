const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i

module.exports = {
  parser: 'postcss-scss',
  plugins: {
    'stylelint': {
      defaultSeverity: 'warning',
      extends: [
        'stylelint-config-sass-guidelines'
      ],
      rules: {}
    },

    'postcss-cssnext': {
      browsers: [
        '> 1%',
        'last 2 versions',
        'not ie <= 10'
      ]
    },

    'cssnano': {
      autoprefixer: false,
      safe: true,
      mergeLonghand: false,
      discardComments: {
        remove: comment => !importantCommentRe.test(comment)
      }
    }
  }
}
