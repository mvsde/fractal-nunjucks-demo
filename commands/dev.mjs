import webpack from 'webpack'

import createFractalInstance from '../lib/create-fractal-instance.mjs'
import createWebpackOptions from '../webpack/dev.mjs'

export default function ({ context }) {
  process.env.NODE_ENV = 'development'
  process.env.PANGOLIN_ENV = 'dev'

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
