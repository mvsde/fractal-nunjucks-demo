import fractal from '@frctl/fractal'
import mandelbrot from '@frctl/mandelbrot'
import path from 'path'

import getDirname from './get-dirname.mjs'
import getPath from './get-path.mjs'

/**
 * Create Fractal instance
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default function ({ context }) {
  const dirname = getDirname(import.meta.url)

  const componentsPath = getPath({ context }).components
  const docsPath = getPath({ context }).docs
  const publicPath = getPath({ context }).public
  const staticPath = getPath({ context }).static

  const instance = fractal.create()

  const theme = mandelbrot({
    skin: 'navy',
    panels: ['notes', 'info', 'html', 'view', 'context'],
    labels: {
      version: 'Version'
    }
  })

  theme.addLoadPath(path.join(dirname, '..', 'theme', 'views'))

  const defaultContext = {
    _environment: process.env.NODE_ENV
  }

  instance.set('project.title', 'Pangolin.js Next')
  instance.set('project.author', 'Fynn Becker')
  instance.set('project.version', '0.1.0')

  instance.components.engine('@frctl/nunjucks')
  instance.components.set('ext', '.njk')
  instance.components.set('path', componentsPath)
  instance.components.set('default.context', defaultContext)

  instance.docs.engine('@frctl/nunjucks')
  instance.docs.set('path', docsPath)

  instance.web.theme(theme)
  instance.web.set('static.path', publicPath)
  instance.web.set('builder.dest', staticPath)

  return instance
}
