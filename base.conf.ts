import { HtmlReporter, ReportAggregator } from 'wdio-html-nice-reporter';
import { String } from 'typescript-string-operations';
import { Options } from "@wdio/types";
import { Frameworks } from '@wdio/types';
import { Capabilities } from "@wdio/types";
const debug = process.env.DEBUG
import logger from "@wdio/logger" ;
const log = logger("base.conf") ;
log.setLevel("INFO") ;

let reportAggregator: ReportAggregator;


const BaseConfig: WebdriverIO.Config = {

    execArgv: debug ? ['--inspect'] : [],

    currentDirectory: process.cwd,

    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',

    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        './src/**/*.test.ts'
    ],
    // Patterns to exclude.
    exclude: [],

    suites: {
    },
    //
    // ============
    // Capabilities
    // ============
    capabilities: [
        {
            // Set maxInstances to 1 if screen recordings are enabled:
            maxInstances: 1,
        }
    ],
    maxInstances: 1,

    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'debug',
    outputDir: 'logs',


    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: "https://google.com",
    //
    // Default timeout for all waitFor* commands.
    // not a typo...
    //@ts-ignore
    waitforTimeout: debug ? (24 * 60 * 60 * 1000) : 14000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 160000,
    //
    // Default request retries count
    connectionRetryCount: 3,

    autoCompileOpts: {
        autoCompile: true,
        // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
        // for all available options
        tsNodeOpts: {
            transpileOnly: true,
            project: './tsconfig.json'
        }
    },

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: debug ? (24 * 60 * 60 * 1000) : 120000,
    },

    reporters: [
        'spec',
        // ['video', {
        //     saveAllVideos: true,       // If true, also saves videos for successful test cases
        //     videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
        //     outputDir: './reports/html-reports/screenshots',
        // }],
        ["html-nice", {
            debug: false,
            outputDir: './reports/html-reports/',
            filename: 'report.html',
            reportTitle: 'Webdriverio Webdriver Test Report',
            collapseTests: true,
            collapseSuites: true,
            removeOutput: true,
            linkScreenshots: true,
            useOnAfterCommandForScreenshot: false
        }]
    ],

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config: Options.Testrunner, capabilities: Capabilities.RemoteCapabilities) {
        reportAggregator = new ReportAggregator(
            {
                outputDir: './reports/html-reports/',
                filename: process.env.TEST_BROWSER + '-master-report.html',
                reportTitle: 'WebdriverIO Webdriver Test Report',
                browserName: (process.env.TEST_BROWSER) ? process.env.TEST_BROWSER : 'unspecified',
                showInBrowser: true,
                collapseTests: true,
                linkScreenshots: false,
                useOnAfterCommandForScreenshot: false
            });
        reportAggregator.clean();
    },
    /**
     * Gets executed before a worker process is spawned and can be used to initialize specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialized
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },

    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    beforeSession: function (config: Omit<Options.Testrunner, 'capabilities'>, capabilities: any, specs: string[]) {

    },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before: function (capabilities: any, specs: string[], browser: any) {
    },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },

    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    // beforeTest: function (test) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function () {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function () {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    afterTest: function (test: any, context: any, result: Frameworks.TestResult) {
    },


    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },

    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */

    onComplete: function (exitCode: number, config: Omit<Options.Testrunner, 'capabilities'>, capabilities: Capabilities.RemoteCapabilities, results: any) {
        (async () => {
            log.progress("Start Report Generation") ;
            await reportAggregator.createReport();
            log.progress("Report Generation completed.") ;
        })();
    }

}

export { BaseConfig };
