import { BaseConfig } from "./base.conf.js";
import * as process from "process";

const binary = (process.platform === 'win32') ? "chromedriver.exe" : "chromedriver" ;
const currentDirectory = process.cwd();

const ChromeConfig = {
    capabilities: [
        {
            // Set maxInstances to 1 if screen recordings are enabled:
            maxInstances: 1,
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    "--ignore-ssl-errors",
                    "--window-size=1600,1200",
                    "--ignore-certificate-errors",
                    ]
            },
            'wdio:chromedriverOptions':  {
                binary: currentDirectory + "/webdrivers/" + binary,
                logLevel: "ALL",
                // enableChromeLogs:true,
                // logPath:"logs"
            } 
        }
    ]
};

process.env.TEST_BROWSER = "Chrome";
const config = Object.assign({}, BaseConfig,  ChromeConfig);
export { config, ChromeConfig };
