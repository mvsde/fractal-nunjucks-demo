import path from 'path'

import base from './base.mjs'

export default function ({ context }) {
  const config = base({ context })

  config.mode('development')

  config.output.path(path.join(context, 'dev', 'assets'))

  return config
}
