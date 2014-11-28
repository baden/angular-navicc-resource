// Karma configuration
module.exports = function(config) {
  config.set({
    frameworks: [
      'mocha',
      'chai',
      'sinon-chai'
    ],
    files: [
      'test/vendor/angular/angular.js',
      'test/vendor/angular-mocks/angular-mocks.js',
      'src/naviccResource/**/*.js',
      'src/ngNaviccResource.js',
      'test/config.js',
      'test/**/*Spec.js'
    ],
    exclude: [
      '**/*.min.js'
    ],
    reporters: [
      'dots',
      'coverage'
    ],
    preprocessors: {
      'src/**/*.js': 'coverage'
    },
    coverageReporter: {
      dir: 'test/coverage',
      reporters: [
	     { type: 'html', subdir: 'report-html' },
	{ type: 'text', subdir: '.', file: 'text.txt' },
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_DISABLE,
    autoWatch: false,
    browsers: [
      'PhantomJS'
    ],
    singleRun: true
  });
};
