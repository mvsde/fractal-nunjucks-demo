import BundleAnalyzer from 'webpack-bundle-analyzer'
import CSSExtractPlugin from 'mini-css-extract-plugin'
import cssnano from 'cssnano'

import generateOutputFilename from '../lib/generate-output-filename.mjs'
import getConfig from '../lib/get-config.mjs'
import getPath from '../lib/get-path.mjs'
import webpackBaseConfig from './base.mjs'

/**
 * Production webpack configuration
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default async function ({ context }) {
  const config = await getConfig({ context })
  const webpackConfig = webpackBaseConfig({ context })

  /* eslint-disable indent */

  webpackConfig
    .mode('production')
    .devtool('source-map')

  webpackConfig.output
    .path(getPath({ context }).assets)
    .filename(generateOutputFilename({ type: 'js' }))
    .publicPath(config.base + 'assets/')

  webpackConfig.optimization
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

  webpackConfig.module.rule('css')
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

  webpackConfig.plugin('css-extract')
    .use(CSSExtractPlugin, [{
      filename: generateOutputFilename({ type: 'css' })
    }])

  webpackConfig.plugin('bundle-analyzer')
    .use(BundleAnalyzer.BundleAnalyzerPlugin, [{
      analyzerMode: 'static',
      openAnalyzer: false
    }])

  /* eslint-enable indent */

  return webpackConfig.toConfig()
}
