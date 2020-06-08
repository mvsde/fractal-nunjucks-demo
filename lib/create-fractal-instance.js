const fractal = require('@frctl/fractal')
const mandelbrot = require('@frctl/mandelbrot')
const path = require('path')

module.exports = function ({ context }) {
  const instance = fractal.create()

  const theme = mandelbrot({
    skin: 'navy',
    lang: 'en-GB'
  })

  instance.set('project.title', 'Fractal Nunjucks Demo')

  instance.components.engine('@frctl/nunjucks')
  instance.components.set('ext', '.njk')
  instance.components.set('path', path.join(context, 'src', 'components'))

  instance.docs.engine('@frctl/nunjucks')
  instance.docs.set('path', path.join(context, 'src', 'docs'))

  instance.web.theme(theme)
  instance.web.set('static.path', path.join(context, 'dev', 'assets'))
  instance.web.set('builder.dest', path.join(context, 'dev'))

  return instance
}
