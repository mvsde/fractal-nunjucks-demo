import fs from 'fs'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import createFractalInstance from '../lib/create-fractal-instance.mjs'
import createWebpackOptions from '../webpack/dev.mjs'
import getPath from '../lib/get-path.mjs'
import getPort from '../lib/get-port.mjs'

/**
 * Run development server
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default async function ({ context }) {
  process.env.NODE_ENV = 'development'

  const assetsPath = getPath({ context }).assets

  const webpackHost = 'localhost'
  const webpackPort = await getPort(8080)

  fs.rmdirSync(assetsPath, { recursive: true })

  const webpackOptions = createWebpackOptions({ context }).toConfig()
  webpackOptions.output.publicPath = `http://${webpackHost}:${webpackPort}/`
  const webpackCompiler = webpack(webpackOptions)
  const webpackServer = new WebpackDevServer(webpackCompiler, {
    hot: true,
    contentBase: false,
    sockPort: webpackPort,
    headers: {
      'access-control-allow-origin': '*'
    }
  })

  webpackServer.listen(webpackPort, webpackHost, () => {
    const fractalInstance = createFractalInstance({
      context,
      assetsPath: webpackOptions.output.publicPath
    })

    const fractalConsole = fractalInstance.cli.console

    const fractalServer = fractalInstance.web.server({
      sync: true,
      syncOptions: {
        ghostMode: false,
        logPrefix: 'Pangolin.js',
        watchOptions: {
          // webpack-dev-server already includes reloading, so we ignore
          // everything except Fractal-related files.
          ignored: file => !/\.(njk|yml|json|md)$/.test(file)
        }
      }
    })

    fractalServer.on('error', error => {
      fractalConsole.error(error.message)
    })

    fractalServer.start().then(() => {
      console.log(`  Local URL: ${fractalServer.urls.sync.local}`)
      console.log(`Network URL: ${fractalServer.urls.sync.external}`)
    })
  })
}
