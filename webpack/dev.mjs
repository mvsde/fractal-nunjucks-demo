import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'

import base from './base.mjs'

/**
 * Development webpack configuration
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default function ({ context }) {
  const config = base({ context })

  /* eslint-disable indent */

  config
    .mode('development')
    .devtool('eval-cheap-module-source-map')

  config.output
    .filename('main.js')

  config.module.rule('css')
    .use('style-loader')
      .before('css-loader')
      .loader('style-loader')
      .end()

  config.plugin('friendly-errors')
    .use(FriendlyErrorsPlugin)

  /* eslint-enable indent */

  return config
}
