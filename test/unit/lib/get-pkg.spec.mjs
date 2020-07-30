import test from 'ava'

import getDirname from '../../../lib/get-dirname.mjs'
import getPkg from '../../../lib/get-pkg.mjs'

test('gets package.json', t => {
  const dirname = getDirname(import.meta.url)
  const result = getPkg({ context: dirname + '/helpers' })
  t.snapshot(result)
})
