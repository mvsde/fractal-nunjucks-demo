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
    process: {
      env: {
        NODE_ENV: process.env.NODE_ENV,
        PANGOLIN_ENV: process.env.PANGOLIN_ENV
      }
    }
  }

  instance.set('project.title', 'Fractal Nunjucks Demo')

  instance.components.engine('@frctl/nunjucks')
  instance.components.set('ext', '.njk')
  instance.components.set('path', getPath({ context }).components)
  instance.components.set('default.context', defaultContext)

  instance.docs.engine('@frctl/nunjucks')
  instance.docs.set('path', getPath({ context }).docsSource)

  instance.web.theme(theme)
  instance.web.set('static.path', getPath({ context }).public)
  instance.web.set('builder.dest', getPath({ context }).docs)

  return instance
}
