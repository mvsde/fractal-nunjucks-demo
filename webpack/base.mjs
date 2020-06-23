import Config from 'webpack-chain'
import sass from 'sass'
import webpack from 'webpack'

import getPath from '../lib/get-path.mjs'
import generateOutputFilename from '../lib/generate-output-filename.mjs'

/**
 * Base webpack configuration
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default function ({ context }) {
  const config = new Config()

  /* eslint-disable indent */

  config.context(context)

  config.entry('main')
    .add('./src/main.js')
    .add('./src/main.scss')

  config.output
    .path(getPath({ context }).assets)
    .filename(generateOutputFilename({ type: 'js' }))

  // JS

  config.module.rule('js')
    .test(/\.m?js$/)
    .exclude
      .add(/node_modules/)
      .end()
    .use('babel-loader')
      .loader('babel-loader')
      .end()

  // CSS

  config.module.rule('css')
    .test(/\.s?css$/)
    .use('css-loader')
      .loader('css-loader')
      .options({
        importLoaders: 2,
        sourceMap: true
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
        implementation: sass
      })
      .end()

  // Plugins

  config
    .plugin('env')
    .use(webpack.EnvironmentPlugin, [
      'NODE_ENV'
    ])

  /* eslint-enable indent */

  return config
}
