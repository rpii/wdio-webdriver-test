import {BaseConfig} from "./base.conf.js";
import * as process from "process";
const currentDirectory = process.cwd();

const EdgeHeadlessConfig = {
    capabilities: [
        {
            // Set maxInstances to 1 if screen recordings are enabled:
            maxInstances: 1,
            browserName  : 'MicrosoftEdge',
            'ms:edgeOptions': {
                args: [
                "--acceptInsecureCerts=true", 
                "--ignore-ssl-errors",
                '--headless=new', 
                "--window-size=1920,1080",
                "--remote-debugging-pipe",
                "--ignore-certificate-errors",
            ] },
                 
            'wdio:edgedriverOptions' :  {
                binary: currentDirectory + "/webdrivers/" + "msedgedriver",
                logLevel: "ALL",
                // logPath: "logs",
                // enableChromeLogs: true
            }   
        },      
    ]
};
process.env.TEST_BROWSER="Edge";
const config = Object.assign({}, BaseConfig, EdgeHeadlessConfig);
export  {config} ;

