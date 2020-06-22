import fractal from '@frctl/fractal'
import mandelbrot from '@frctl/mandelbrot'
import path from 'path'

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
  instance.components.set('path', path.join(context, 'src', 'components'))
  instance.components.set('default.context', defaultContext)

  instance.docs.engine('@frctl/nunjucks')
  instance.docs.set('path', path.join(context, 'src', 'docs'))

  instance.web.theme(theme)
  instance.web.set('static.path', path.join(context, 'public'))
  instance.web.set('builder.dest', path.join(context, 'dev'))

  return instance
}
