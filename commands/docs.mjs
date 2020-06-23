import fs from 'fs'
import webpack from 'webpack'

import createFractalInstance from '../lib/create-fractal-instance.mjs'
import createWebpackOptions from '../webpack/build.mjs'
import getPath from '../lib/get-path.mjs'

/**
 * Create static export
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default function ({ context }) {
  process.env.NODE_ENV = 'production'
  process.env.PANGOLIN_ENV = 'docs'

  const assetsPath = getPath({ context }).assets
  const docsPath = getPath({ context }).docs

  fs.rmdirSync(assetsPath, { recursive: true })
  fs.rmdirSync(docsPath, { recursive: true })

  const fractalInstance = createFractalInstance({ context })
  const fractalConsole = fractalInstance.cli.console
  const fractalBuilder = fractalInstance.web.builder()

  fractalBuilder.on('progress', (completed, total) => {
    fractalConsole.update(`Exported ${completed} of ${total} items.`, 'info')
  })

  fractalBuilder.on('error', error => {
    fractalConsole.error(error.message)
  })

  const webpackOptions = createWebpackOptions({ context }).toConfig()
  const webpackCompiler = webpack(webpackOptions)

  webpackCompiler.run((error, stats) => {
    if (error) {
      console.error(error)
    }

    console.log(stats.toString())

    fractalBuilder.build().then(() => {
      fractalConsole.success('Fractal build completed.')
    })
  })
}
