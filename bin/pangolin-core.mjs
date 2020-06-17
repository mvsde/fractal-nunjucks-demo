#!/usr/bin/env node

import dev from '../commands/dev.mjs'
import build from '../commands/build.mjs'
import docs from '../commands/docs.mjs'
import inspect from '../commands/inspect.mjs'

const command = process.argv[2]
const context = process.cwd()

if (command === 'dev') {
  dev({ context })
}

if (command === 'build') {
  build({ context })
}

if (command === 'docs') {
  docs({ context })
}

if (command === 'inspect') {
  inspect({ context, command: process.argv[3] })
}
