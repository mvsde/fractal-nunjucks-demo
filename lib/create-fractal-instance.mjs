import fractal from '@frctl/fractal'
import mandelbrot from '@frctl/mandelbrot'

import getPath from './get-path.mjs'

/**
 * Create Fractal instance
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default function ({ context }) {
  const instance = fractal.create()

  const theme = mandelbrot({
    skin: 'navy'
  })

  const defaultContext = {
    _environment: process.env.NODE_ENV
  }

  instance.set('project.title', 'Pangolin.js Next')
  instance.set('project.author', 'Fynn Becker')
  instance.set('project.version', '0.1.0')

  instance.components.engine('@frctl/nunjucks')
  instance.components.set('ext', '.njk')
  instance.components.set('path', getPath({ context }).components)
  instance.components.set('default.context', defaultContext)

  instance.docs.engine('@frctl/nunjucks')
  instance.docs.set('path', getPath({ context }).docs)

  instance.web.theme(theme)
  instance.web.set('static.path', getPath({ context }).public)
  instance.web.set('builder.dest', getPath({ context }).static)

  return instance
}
