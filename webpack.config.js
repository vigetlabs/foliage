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

  plugins: [
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code : true,
        unsafe    : true,
        warnings  : true
      },
      mangle: {}
    })
  ],

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
        loose : true
      }
    }]
  }
}
