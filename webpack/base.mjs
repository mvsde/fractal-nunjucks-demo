import Config from 'webpack-chain'
import CSSExtractPlugin from 'mini-css-extract-plugin'
import sass from 'sass'

export default function ({ context }) {
  const config = new Config()

  /* eslint-disable indent */

  config.context(context)

  config.output.filename('bundle.js')

  config.entry('main')
    .add('./src/main.js')
    .add('./src/main.scss')

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

  config
    .plugin('css-extract')
    .use(CSSExtractPlugin, [{
      filename: 'bundle.css'
    }])

  /* eslint-enable indent */

  return config
}
