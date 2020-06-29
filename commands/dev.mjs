import fs from 'fs'
import path from 'path'
import webpack from 'webpack'

import createFractalInstance from '../lib/create-fractal-instance.mjs'
import createWebpackOptions from '../webpack/dev.mjs'
import getPath from '../lib/get-path.mjs'

/**
 * Run development server
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default function ({ context }) {
  process.env.NODE_ENV = 'development'

  const assetsPath = getPath({ context }).assets

  fs.rmdirSync(assetsPath, { recursive: true })

  const fractalInstance = createFractalInstance({ context })
  const fractalConsole = fractalInstance.cli.console

  const fractalServer = fractalInstance.web.server({
    sync: true,
    syncOptions: {
      ghostMode: false,
      logPrefix: 'Pangolin.js',
      watchOptions: {
        // Prevent "double reload": once for the source files and a second time
        // for the generated assets.
        ignored: path.resolve(context, assetsPath, '**', '*')
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

  const webpackOptions = createWebpackOptions({ context }).toConfig()
  const webpackCompiler = webpack(webpackOptions)

  webpackCompiler.watch(null, (error, stats) => {
    if (error) {
      console.error(error)
    }

    console.log(stats.toString())
  })
}
