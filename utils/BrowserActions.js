// test/utils/browserActions.js
class BrowserActions {
    async switchToFrame(frameSelector) {
        const frame = await $(frameSelector);
        await browser.switchToFrame(frame);
    }

    async switchToParentFrame() {
        await browser.switchToParentFrame();
    }

    async maximizeWindow() {
        await browser.maximizeWindow();
    }

    async getCurrentUrl() {
        return await browser.getUrl();
    }
}

module.exports = new BrowserActions();
