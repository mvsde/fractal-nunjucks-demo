import webpack from 'webpack'

import createWebpackOptions from '../webpack/build.mjs'

export default function ({ context }) {
  process.env.NODE_ENV = 'production'
  process.env.PANGOLIN_ENV = 'build'

  const webpackOptions = createWebpackOptions({ context }).toConfig()
  const webpackCompiler = webpack(webpackOptions)

  webpackCompiler.run((error, stats) => {
    if (error) {
      console.error(error)
    }

    console.log(stats.toString())
  })
}
