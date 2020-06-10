import cssnano from 'cssnano'
import path from 'path'

import base from './base.mjs'

export default function ({ context }) {
  const config = base({ context })

  /* eslint-disable indent */

  config.mode('production')

  config.output.path(path.join(context, 'dist', 'assets'))

  config.module.rule('css')
    .use('cssnano-loader')
      .after('css-loader')
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

  /* eslint-enable indent */

  return config
}
