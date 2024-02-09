import {BaseConfig} from "./base.conf.js";
import * as process from "process";
const currentDirectory = process.cwd();

const EdgeConfig = {
    capabilities: [
        {
            // Set maxInstances to 1 if screen recordings are enabled:
            maxInstances: 1,
            browserName  : 'MicrosoftEdge',
            'ms:edgeOptions': {
                args: [
                "--verbose",                     
                "--acceptInsecureCerts=true", 
                "--ignore-ssl-errors",
                "--window-size=1600,1200",
                "--ignore-certificate-errors",
            ] },
            'wdio:edgedriverOptions' :  {
                binary: currentDirectory + "/webdrivers/" + "msedgedriver",
                // logPath: "logs",
                // enableChromeLogs: true,
            }   
        },      
    ]
};
process.env.TEST_BROWSER="Edge";
const config = Object.assign({}, BaseConfig, EdgeConfig);
export  {config} ;

