// test/utils/waitActions.js
class WaitActions {
    async waitForElementVisible(selector, timeout = 5000) {
        await browser.waitUntil(async () => {
            const element = await $(selector);
            return await element.isDisplayed();
        }, { timeout, timeoutMsg: 'Element not visible after wait' });
    }

    async wait(seconds) {
        await browser.pause(seconds * 1000);
    }
}

module.exports = new WaitActions();
