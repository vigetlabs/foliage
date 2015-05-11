module.exports = function(config) {
  config.set({

    browsers: [ 'Firefox', 'Chrome' ],

    frameworks: [ 'mocha', 'sinon-chai' ],

    autoWatchBatchDelay: 400,
    logLevel: config.LOG_ERROR,

    files: [
      'src/**/__tests__/*.js*'
    ],

    preprocessors: {
      'src/**/__tests__/*.js*' : [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'progress', 'coverage' ],

    coverageReporter: {
      type: 'html',
      subdir: '.',
      dir: process.env.CIRCLE_ARTIFACTS || 'coverage'
    },

    webpack: {
      devtool : 'inline-source-map',

      module: {
        loaders: [{
          test    : /\.jsx*$/,
          exclude : /node_modules/,
          loader  : 'babel',
          query   : { optional: ['runtime'] }
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
