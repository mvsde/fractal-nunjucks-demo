import util from 'util'

import buildConfig from '../webpack/build.mjs'
import devConfig from '../webpack/dev.mjs'

/**
 * Print webpack configuration
 * @param {Object} options Options
 * @param {string} options.context Working directory
 * @param {'dev'|'build'} options.command Command to inspect
 */
export default function ({ context, command }) {
  let config

  if (command === 'dev') {
    config = devConfig
  }

  if (command === 'build') {
    config = buildConfig
  }

  config = config({ context }).toConfig()

  config = util.inspect(config, {
    colors: true,
    depth: null
  })

  console.log(config)
}
