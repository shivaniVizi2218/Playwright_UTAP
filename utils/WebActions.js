// test/utils/webActions.js
class WebActions {
    async openUrl(url) {
        await browser.url(url);
    }

    async clickElement(selector) {
        const element = await $(selector);
        await element.click();
    }

    async setInputValue(selector, value) {
        const element = await $(selector);
        await element.setValue(value);
    }

    async getElementText(selector) {
        const element = await $(selector);
        return await element.getText();
    }

    async isElementDisplayed(selector) {
        const element = await $(selector);
        return await element.isDisplayed();
    }
}

module.exports = new WebActions();
