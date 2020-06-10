import webpack from 'webpack'

import createFractalInstance from '../lib/create-fractal-instance.mjs'
import createWebpackOptions from '../webpack/dev.mjs'

const context = process.cwd()

const fractalInstance = createFractalInstance({ context })
const fractalConsole = fractalInstance.cli.console
const fractalServer = fractalInstance.web.server({ sync: true, watch: true })

fractalServer.on('error', error => {
  fractalConsole.error(error.message)
})

fractalServer.start().then(() => {
  fractalConsole.success(`Fractal server running at ${fractalServer.url}`)
})

const webpackOptions = createWebpackOptions({ context }).toConfig()
const webpackCompiler = webpack(webpackOptions)

webpackCompiler.watch(null, (error, stats) => {
  if (error) {
    console.error(error)
  }

  console.log(stats.toString())
})
