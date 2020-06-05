const fractal = require('@frctl/fractal')
const mandelbrot = require('@frctl/mandelbrot')
const path = require('path')

const fractalInstance = fractal.create()

const fractalTheme = mandelbrot({
  skin: 'navy',
  lang: 'en-GB'
})

fractalInstance.set('project.title', 'Fractal Nunjucks Demo')

fractalInstance.components.engine('@frctl/nunjucks')
fractalInstance.components.set('ext', '.njk')
fractalInstance.components.set('path', path.join(__dirname, 'src', 'components'))

fractalInstance.docs.engine('@frctl/nunjucks')
fractalInstance.docs.set('path', path.join(__dirname, 'src', 'docs'))

fractalInstance.web.theme(fractalTheme)
fractalInstance.web.set('builder.dest', path.join(__dirname, 'dev'))

module.exports = fractalInstance
