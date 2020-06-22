import webpack from 'webpack'

import createFractalInstance from '../lib/create-fractal-instance.mjs'
import createWebpackOptions from '../webpack/docs.mjs'

export default function ({ context }) {
  process.env.NODE_ENV = 'production'
  process.env.PANGOLIN_ENV = 'docs'

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
