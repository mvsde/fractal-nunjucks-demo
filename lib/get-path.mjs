import path from 'path'

/**
 * Get path
 * @param {Object} options Options
 * @param {string} options.context Working directory
 */
export default function ({ context }) {
  return {
    build: path.join(context, 'dist'),
    public: path.join(context, 'public'),
    assets: path.join(context, 'public', 'assets'),
    docs: path.join(context, 'docs'),
    components: path.join(context, 'src', 'components'),
    docsSource: path.join(context, 'src', 'docs')
  }
}
