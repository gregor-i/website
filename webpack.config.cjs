module.exports = (env, options) => {
  const devMode = options.mode !== 'production';

  return {
    entry: {
      mice: './src/main/js/mice-main.js',
      secret: './src/main/js/secret-main.js',
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/build',
    },
    devtool: devMode ? 'source-map' : undefined
  }
}
