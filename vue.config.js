module.exports = {
  pwa: {
   // themeColor: '#E3592A',
   // msTileColor: '#E3592A',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js'
    }
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        implementation: require('sass')
      }
    }
  }
}
