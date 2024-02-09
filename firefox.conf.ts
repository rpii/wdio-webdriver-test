import {BaseConfig} from "./base.conf.js";
import * as process from "process";
const currentDirectory = process.cwd();

const FirefoxOptions: WebdriverIO.Config = {
    path: '/',
    services: ['firefox-profile'],

    // @ts-ignore
    firefoxProfile: {
        "app.update.auto": "false",
        "app.update.enabled": "false",
        "app.update.BITS.enabled" : false,
        "browser.cache.disk.enable" : false,
        "browser.ssl_override_behavior": 2,
        "webdriver_accept_untrusted_certs": "true",
        "devtools.errorconsole.enabled": "true",
        "plugin.default.state": 1,
        "plugin.disable_full_page_plugin_for_types" : "application/pdf",
    }
};

const FirefoxConfig = {
    capabilities: [
        {
            // Set maxInstances to 1 if screen recordings are enabled:
            maxInstances: 1,
            browserName  : 'firefox',
            'moz:firefoxOptions': {
                args: [
                ]
            },
            'wdio:geckodriverOptions' :  {
                customGeckoDriverPath: currentDirectory + "/webdrivers/" + "geckodriver",
                log: "debug"
            }   
        }
    ]
};
process.env.TEST_BROWSER="Firefox";
const config = Object.assign({}, BaseConfig, FirefoxOptions, FirefoxConfig);
export  {config, FirefoxOptions, FirefoxConfig} ;

