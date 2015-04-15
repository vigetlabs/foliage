var Webpack = require('webpack')
var Path    = require('path')

module.exports = {
  devtool : 'source-map',

  entry: {
    Foliage : './src/Foliage.js'
  },

  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: Path.join(__dirname, 'dist'),
    devtoolModuleFilenameTemplate: '[resource-path]'
  },

  resolve: {
    extensions: [ '', '.js', '.jsx', '.json' ],
    modulesDirectories: [ 'web_modules', 'node_modules', 'src' ]
  },

  externals: {},

  module: {
    loaders: [{
      test    : /\.jsx*$/,
      exclude : /node_modules/,
      loader  : 'babel',
      query   : {
        stage : 1,
        loose : true,
        blacklist : [ "useStrict" ]
      }
    }]
  }
}
