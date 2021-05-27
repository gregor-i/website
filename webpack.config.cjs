module.exports = (env, options) => {
  const devMode = options.mode !== 'production';

  return {
    entry: {
      app: ['./src/main/js/index.js']
    },
    output: {
      filename: '../build/mice.js',
      publicPath: '/'
    },
    devtool: devMode ? 'source-map' : undefined
  }
}
