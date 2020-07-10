import BundleAnalyzer from 'webpack-bundle-analyzer'
import CSSExtractPlugin from 'mini-css-extract-plugin'
import cssnano from 'cssnano'

import base from './base.mjs'
import generateOutputFilename from '../lib/generate-output-filename.mjs'
import getPath from '../lib/get-path.mjs'

/**
 * Production webpack configuration
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default function ({ context }) {
  const config = base({ context })

  /* eslint-disable indent */

  config
    .mode('production')
    .devtool('source-map')

  config.output
    .path(getPath({ context }).assets)
    .filename(generateOutputFilename({ type: 'js' }))
    .publicPath('/assets/')

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

  config.plugin('css-extract')
    .use(CSSExtractPlugin, [{
      filename: generateOutputFilename({ type: 'css' })
    }])

  config.plugin('bundle-analyzer')
    .use(BundleAnalyzer.BundleAnalyzerPlugin, [{
      analyzerMode: 'static',
      openAnalyzer: false
    }])

  /* eslint-enable indent */

  return config
}
