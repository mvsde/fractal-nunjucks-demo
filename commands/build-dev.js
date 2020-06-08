const createFractalInstance = require('../lib/create-fractal-instance.js')

const fractalInstance = createFractalInstance({ context: process.cwd() })
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
