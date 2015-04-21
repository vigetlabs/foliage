var Webpack = require('webpack')
var webpack_config = require('./webpack.config')

module.exports = function(config) {
  config.set({

    browsers: [ 'Firefox' ],

    singleRun: process.env.CONTINUOUS_INTEGRATION === 'true',

    frameworks: [ 'mocha', 'sinon-chai' ],

    logLevel: config.LOG_ERROR,

    files: [
      'src/**/__tests__/*.js*'
    ],

    preprocessors: {
      'src/**/__tests__/*.js*' : [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'spec', 'coverage' ],

    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ]
    },

    webpack: {
      devtool : 'inline-source-map',
      plugins : webpack_config.plugins,
      resolve : webpack_config.resolve,

      module: {
        loaders: [{
          test    : /\.jsx*$/,
          exclude : /node_modules/,
          loader  : 'babel',
          query   : {
            stage: 1,
            loose: true,
            optional: ['runtime']
          }
        }],
        postLoaders: [{
          test: /\.jsx*$/,
          exclude: /(__tests__|node_modules)\//,
          loader: 'istanbul-instrumenter'
        }]
      }
    },

    webpackServer: {
      noInfo: true
    }
  });
};
