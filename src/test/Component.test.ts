import { $, expect } from '@wdio/globals'

describe('WebdriverIO Component Testing', () => {
    it('should be able to get the google home page title', async () => {
        await browser.url("/") ;
        await expect($("//title")).toBePresent();
        // await expect($("//title")).toHaveText("Google") ;
    })
})
