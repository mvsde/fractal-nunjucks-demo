import fs from 'fs'
import path from 'path'

/**
 * Copy directory (similar to `cp -r`)
 * @param {string} src Source path
 * @param {string} dest Destination path
 */
export default function copyDirSync (src, dest) {
  fs.readdirSync(src).forEach(file => {
    const filePath = path.join(src, file)
    const fileDest = path.join(dest, file)

    const fileStats = fs.lstatSync(filePath)

    if (fileStats.isDirectory()) {
      fs.mkdirSync(fileDest, { recursive: true })
      copyDirSync(filePath, fileDest)
    } else {
      fs.copyFileSync(filePath, fileDest)
    }
  })
}
