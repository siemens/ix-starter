// Karma configuration file for headless testing
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],

    customLaunchers: {
      ChromeHeadlessCustom: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--remote-debugging-port=9222'
        ]
      },
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-dev-shm-usage',
          '--disable-extensions',
          '--remote-debugging-port=9222'
        ]
      }
    },
    singleRun: true,
    concurrency: Infinity,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 60000,
    captureTimeout: 60000,
    retryLimit: 3
  });

  if (process.env.CI) {
    config.set({
      browsers: ['ChromeHeadlessCI'],
      singleRun: true,
      autoWatch: false,
      concurrency: 1
    });
  }
};
