import { blue, green } from 'kleur/colors'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'

import base from './base.mjs'
import getHostIPs from '../lib/get-host-ips.mjs'

/**
 * Development webpack configuration
 * @param {Object} options Options
 * @param {string} options.context Working directory
 * @param {string} options.host Here it runs
 * @param {number} options.port Where webpack serves files
 * @param {number} options.uiPort Where fractal serves files
 */
export default function ({ context, host, port, uiPort }) {
  const config = base({ context })

  const localIP = host === '0.0.0.0' || host === '::'
    ? 'localhost'
    : host

  const networkIPs = getHostIPs()

  /* eslint-disable indent */

  config
    .mode('development')
    .devtool('eval-cheap-module-source-map')

  config.output
    .filename('main.js')
    .publicPath(`http://${host}:${port}/`)

  config.module.rule('css')
    .use('style-loader')
      .before('css-loader')
      .loader('style-loader')
      .end()

  config.plugin('friendly-errors')
    .use(FriendlyErrorsPlugin, [{
      compilationSuccessInfo: {
        messages: [
          'Pangolin.js dev server running at:',
          '  - Local:   ' + blue(`http://${localIP}:${uiPort}`),
          ...networkIPs.map(ip => '  - Network: ' + blue(`http://${ip}:${uiPort}`))
        ],
        notes: [
          'Note that the development build is not optimized.',
          `To create a production build, run ${green('npm run build')}.`
        ]
      }
    }])

  /* eslint-enable indent */

  return config
}
