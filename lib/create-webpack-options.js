const Config = require('webpack-chain')
const CSSExtractPlugin = require('mini-css-extract-plugin')
const cssnano = require('cssnano')
const path = require('path')

module.exports = function ({ context }) {
  const config = new Config()

  /* eslint-disable indent */

  config.context(context)

  config.entry('main')
    .add('./src/main.js')
    .add('./src/main.scss')

  config.output
    .path(path.join(context, 'dev', 'assets'))
    .filename('bundle.js')

  config.module.rule('css')
    .test(/\.(css|scss)$/)
    .use('css-extract-loader')
      .loader(CSSExtractPlugin.loader)
      .options({
        esModule: true
      })
      .end()
    .use('css-loader')
      .loader('css-loader')
      .options({
        importLoaders: 3,
        esModule: true,
        sourceMap: true
      })
      .end()
    .use('cssnano-loader')
      .loader('postcss-loader')
      .options({
        sourceMap: true,
        plugins: [cssnano({
          preset: ['default', {
            mergeLonghand: false,
            mergeRules: false
          }]
        })]
      })
      .end()
    .use('postcss-loader')
      .loader('postcss-loader')
      .options({
        sourceMap: true
      })
      .end()
    .use('sass-loader')
      .loader('sass-loader')
      .options({
        implementation: require('sass')
      })

  config
    .plugin('css-extract')
    .use(CSSExtractPlugin, [{
      filename: 'bundle.css'
    }])

  /* eslint-enable indent */

  return config.toConfig()
}
