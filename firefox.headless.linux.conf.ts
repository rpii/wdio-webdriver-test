import {BaseConfig} from "./base.conf.js";
import {FirefoxOptions,FirefoxConfig} from "./firefox.conf.js";
const currentDirectory = process.cwd();

const FirefoxHeadlessConfig = {
    capabilities: [
        {
            services: ['firefox-profile'],
            browserName  : 'firefox',
            'moz:firefoxOptions': {
                args: [
                "-headless", 
                ]
            },
            'wdio:geckodriverOptions' :  {
                customGeckoDriverPath: currentDirectory + "/webdrivers/" + "geckodriver",
                log: "debug"
            }          
        }
    ]
};
const config = Object.assign({}, BaseConfig, FirefoxOptions, FirefoxConfig, FirefoxHeadlessConfig);
export  {config} ;


