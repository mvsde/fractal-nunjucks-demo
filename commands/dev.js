const webpack = require('webpack')

const createFractalInstance = require('../lib/create-fractal-instance.js')
const createWebpackOptions = require('../lib/create-webpack-options.js')

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

const webpackOptions = createWebpackOptions({ context })
const webpackCompiler = webpack(webpackOptions)

webpackCompiler.watch({}, (error, stats) => {
  console.log(error)
  console.log(stats.toString())
})
