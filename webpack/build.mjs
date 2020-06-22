import CSSExtractPlugin from 'mini-css-extract-plugin'
import cssnano from 'cssnano'
import path from 'path'

import base from './base.mjs'
import generateOutputFilename from '../lib/generate-output-filename.mjs'

export default function ({ context }) {
  const config = base({ context })

  /* eslint-disable indent */

  config
    .mode('production')
    .devtool('source-map')

  config.output
    .path(path.join(context, 'dist'))

  config.optimization
    .splitChunks({
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
          name: 'vendors',
          chunks: 'all'
        }
      }
    })

  // CSS

  config.module.rule('css')
    .use('css-extract-loader')
      .before('css-loader')
      .loader(CSSExtractPlugin.loader)
      .end()
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

  // Plugins

  config
    .plugin('css-extract')
    .use(CSSExtractPlugin, [{
      filename: generateOutputFilename({ type: 'css' })
    }])

  /* eslint-enable indent */

  return config
}
