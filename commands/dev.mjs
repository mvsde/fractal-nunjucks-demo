import fs from 'fs'
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
  process.env.PANGOLIN_ENV = 'dev'

  const assetsPath = getPath({ context }).assets

  fs.rmdirSync(assetsPath, { recursive: true })

  const fractalInstance = createFractalInstance({ context })
  const fractalConsole = fractalInstance.cli.console

  const fractalServer = fractalInstance.web.server({ sync: true })

  fractalServer.on('error', error => {
    fractalConsole.error(error.message)
  })

  const webpackOptions = createWebpackOptions({ context }).toConfig()
  const webpackCompiler = webpack(webpackOptions)

  webpackCompiler.watch(null, (error, stats) => {
    if (error) {
      console.error(error)
    }

    console.log(stats.toString())

    fractalServer.start().then(() => {
      fractalConsole.success(`Fractal server running at ${fractalServer.url}`)
    })
  })
}
