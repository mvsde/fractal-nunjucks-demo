import path from 'path'

import base from './base.mjs'

export default function ({ context }) {
  const config = base({ context })

  /* eslint-disable indent */

  config
    .mode('development')
    .devtool('eval-cheap-module-source-map')

  config.output
    .path(path.join(context, 'public', 'assets'))

  config.module.rule('css')
    .use('style-loader')
      .before('css-loader')
      .loader('style-loader')
      .end()

  /* eslint-enable indent */

  return config
}
