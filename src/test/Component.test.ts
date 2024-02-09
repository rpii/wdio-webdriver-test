import { $, expect } from '@wdio/globals'
import ReportEvents from "@rpii/wdio-report-events" ;
import * as path from "path";
import fs from "fs-extra";
let eventReporter = new ReportEvents() ;

async function logMessage(message:string) {
    await eventReporter.logMessage( message)
}

async function takeScreenshot(message:string) {
    fs.ensureDirSync('reports/html-reports/screenshots/');
    const filepath = path.join('reports/html-reports/screenshots/', 'google.png');
    await browser.saveScreenshot(filepath);
    await logMessage(message);
    eventReporter.logScreenshot(filepath) ;
}
describe('WebdriverIO Webdriver Testing', () => {
    it('should be able to get the google home page title', async () => {
        await browser.url("/") ;
        await expect($("//title")).toBePresent();
        // await expect($("//title")).toHaveText("Google") ;
        await takeScreenshot("Navigated to Google") ;
    })
})

