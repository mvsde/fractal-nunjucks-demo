#!/usr/bin/env node

import build from '../commands/build.mjs'
import dev from '../commands/dev.mjs'
import inspect from '../commands/inspect.mjs'

const command = process.argv[2]
const context = process.cwd()

if (command === 'dev') {
  dev({ context })
}

if (command === 'build') {
  build({ context })
}

if (command === 'inspect') {
  inspect({ context, command: process.argv[3] })
}
