import webpack from 'webpack'

import createFractalInstance from '../lib/create-fractal-instance.mjs'
import createWebpackOptions from '../webpack/build.mjs'

const context = process.cwd()

const fractalInstance = createFractalInstance({ context })
const fractalConsole = fractalInstance.cli.console
const fractalBuilder = fractalInstance.web.builder()

fractalBuilder.on('progress', (completed, total) => {
  fractalConsole.update(`Exported ${completed} of ${total} items.`, 'info')
})

fractalBuilder.on('error', error => {
  fractalConsole.error(error.message)
})

fractalBuilder.build().then(() => {
  fractalConsole.success('Fractal build completed.')
})

const webpackOptions = createWebpackOptions({ context }).toConfig()
const webpackCompiler = webpack(webpackOptions)

webpackCompiler.run((error, stats) => {
  if (error) {
    console.error(error)
  }

  console.log(stats.toString())
})
