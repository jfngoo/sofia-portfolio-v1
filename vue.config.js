var path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        '~': resolve('src/assets'),
        'lib': resolve('src/lib'),
        'data': resolve('src/data'),
        'components': resolve('src/components')
      }
    }
  }
}
