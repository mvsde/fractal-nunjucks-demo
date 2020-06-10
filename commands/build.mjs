import webpack from 'webpack'

import createWebpackOptions from '../webpack/build.mjs'

const context = process.cwd()

const webpackOptions = createWebpackOptions({ context }).toConfig()
const webpackCompiler = webpack(webpackOptions)

webpackCompiler.run((error, stats) => {
  if (error) {
    console.error(error)
  }

  console.log(stats.toString())
})
