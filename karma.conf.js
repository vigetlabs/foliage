module.exports = function(config) {
  config.set({

    browsers: [ 'Firefox', 'Chrome' ],

    frameworks: [ 'mocha', 'sinon-chai' ],

    logLevel: config.LOG_ERROR,

    files: [
      'src/**/__tests__/*.js*'
    ],

    preprocessors: {
      'src/**/__tests__/*.js*' : [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'progress', 'coverage' ],

    coverageReporter: {
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ]
    },

    webpack: {
      devtool : 'inline-source-map',

      resolve : {
        extensions: [ '', '.js', '.jsx', '.json' ],
        modulesDirectories: [ 'web_modules', 'node_modules', 'src' ]
      },

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
