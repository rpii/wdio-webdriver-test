import { BaseConfig } from "./base.conf.js";
import { ChromeConfig } from "./chrome.conf.js";
import process from "process";
const binary = (process.platform === 'win32') ? "chromedriver.exe" : "chromedriver" ;
const currentDirectory = process.cwd();
const ChromeHeadlessConfig = {
    capabilities: [
        {       
            maxInstances: 1,
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    "--acceptInsecureCerts=true", 
                    "--ignore-ssl-errors",
                    '--headless=new', 
                    "--window-size=1920,1080",
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
const config = Object.assign({}, BaseConfig, ChromeHeadlessConfig);
export { config };


