import path from 'path'

import build from './build.mjs'

export default function ({ context }) {
  const config = build({ context })

  config.output.path(path.join(context, 'dev', 'assets'))

  return config
}
