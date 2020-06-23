import fs from 'fs'
import webpack from 'webpack'

import copyDirSync from '../lib/copy-dir-sync.mjs'
import createWebpackOptions from '../webpack/build.mjs'
import getPath from '../lib/get-path.mjs'

/**
 * Build production files
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default function ({ context }) {
  process.env.NODE_ENV = 'production'
  process.env.PANGOLIN_ENV = 'build'

  const assetsPath = getPath({ context }).assets
  const buildPath = getPath({ context }).build
  const publicPath = getPath({ context }).public

  fs.rmdirSync(assetsPath, { recursive: true })
  fs.rmdirSync(buildPath, { recursive: true })

  const webpackOptions = createWebpackOptions({ context }).toConfig()
  const webpackCompiler = webpack(webpackOptions)

  webpackCompiler.run((error, stats) => {
    if (error) {
      console.error(error)
    }

    console.log(stats.toString())

    copyDirSync(publicPath, buildPath)
  })
}
