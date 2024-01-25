var allure = require("allure-commandline");
const allureReporter = require("@wdio/allure-reporter").default;
const { removeSync } = require("fs-extra");
const cucumberJson = require("wdio-cucumberjs-json-reporter").default;
const { generate } = require("multiple-cucumber-html-reporter");

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    // WebdriverIO supports running e2e tests as well as unit and component tests.
    runner: 'local',
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // of the configuration file being run.
    //
    // The specs are defined as an array of spec files (optionally using wildcards
    // that will be expanded). The test for each spec file will be run in a separate
    // worker process. In order to have a group of spec files run in the same worker
    // process simply enclose them in an array within the specs array.
    //
    // The path of the spec files will be resolved relative from the directory of
    // of the config file unless it's absolute.
    //
    specs: [
        './features/**/*.feature'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://saucelabs.com/platform/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome'
    }],

    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/appium-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'http://localhost',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    // services: [],
    //
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber',
    
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried spec files should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: ['spec', [
                "allure",
                    {
                        outputDir: "allure-results",
                        disableWebdriverStepsReporting: false,
                        disableWebdriverScreenshotsReporting: false,
                        useCucumberStepReporter: false,
                    },
                ],
                [ 'cucumberjs-json', {
                    jsonFolder: '.tmp/json/',
                    language: 'en',
                    },
                ],
            ],
    

    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        // <string[]> (file/dir) require files before executing features
        require: ['./features/step-definitions/**/*.js'],
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        requireModule: [],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: '',
        // <number> timeout for step definitions
        timeout: 60000,
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false
    },

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
        onPrepare: function (config, capabilities) {
            removeSync("allure-results/");
            removeSync(".tmp/");
        },

        afterStep: async function (step, scenario, result) {
            console.log("==============================================");
            console.log(result);
            console.log("==============================================");
            if (!result.passed) {
            cucumberJson.attach(await browser.takeScreenshot(), "image/png");
            }
          },

        beforeSuite: function (suite) {
            // browser.deleteCookies();
            global.allureReporter = allureReporter;
            allureReporter.addFeature(suite.name);
            allureReporter.addDescription("generating Allure reports " + suite.name);
          },
          afterScenario: async function (world, result, context) {
            await browser.reloadSession();
          },
    
    onComplete: function (exitCode, config, capabilities, results) {
        const reportError = new Error("Could not generate Allure report");
        const generation = allure(["generate", "allure-results", "--clean"]);
        generate({
            // Required
            // This part needs to be the same path where you store the JSON files
            // default = '.tmp/json/'
            jsonDir: ".tmp/json/",
            reportPath: ".tmp/report/",
            // for more options see https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
          });
        return new Promise((resolve, reject) => {
          const generationTimeout = setTimeout(() => reject(reportError), 5000);
          generation.on("exit", function (exitCode) {
            clearTimeout(generationTimeout);
            if (exitCode !== 0) {
              return reject(reportError);
            }
            console.log("Allure report successfully generated");
            resolve();
          });
        });

        
      },

      afterTest: async function (
        test,
        context,
        { error, result, duration, passed, retries }
      ) {
        // if (!passed) {
          // var name = 'ERROR-' + Date.now();
          // await browser.takeScreenshot('./errorShots/' + name + '.png');
          await browser.takeScreenshot();
          //   browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}');
        // } else {
        //   const screenshot = await browser.takeScreenshot();
        //   allureReporter.addAttachment("Screenshot", screenshot, "image/png");
        // }
      },

    
}
