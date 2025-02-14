const platformKeyMap = {
  web: "web",
  android: "android",
  ios: "ios",
};

/**
 * Wrapper for Playwright's `locator` function that returns a platform-specific selector.
 * @param {import('@playwright/test').Page} page - The Playwright Page object.
 * @param {string | object} selector - The selector string or an object with platform-specific selectors.
 * @return {import('@playwright/test').Locator} The platform-specific locator.
 */
function platformLocator(page, selector) {
  let element;
  if (typeof selector === "string") {
    element = page.locator(selector);
  } else {
    const platformSelector = getSelectorByPlatform(selector);
    
    // Debugging: Log the selector and platform
    console.log("Platform Selector: ", platformSelector);
    
    if (!platformSelector || typeof platformSelector !== "string") {
      throw new Error(`Invalid platform-specific selector: ${platformSelector}`);
    }
    
    element = page.locator(platformSelector);
  }
  return element;
}

/**
 * Wrapper for Playwright's `locator` function that returns a list of platform-specific selectors.
 * @param {import('@playwright/test').Page} page - The Playwright Page object.
 * @param {string | object} selector - The selector string or an object with platform-specific selectors.
 * @return {import('@playwright/test').Locator} The platform-specific locator.
 */
function platformLocators(page, selector) {
  let elements;
  if (typeof selector === "string") {
    elements = page.locator(selector);
  } else {
    elements = page.locator(getSelectorByPlatform(selector));
  }
  return elements;
}

/**
 * Gets platform-specific selector.
 * @param {object} selector - An object containing platform-specific selectors.
 * @return {string} Platform-specific selector.
 */
function getSelectorByPlatform(selector) {
  const platform = getPlatform(); // Ensure this returns a correct platform
  const platformKey = validateAndGetPlatformKey(platform);
  
  // Debugging: Log the platform and selector
  console.log("Platform: ", platform, "Selector: ", selector);
  
  const platformSelector = selector[platformKey];
  
  if (!platformSelector) {
    throw new Error(`Selector not defined for platform: ${platform}`);
  }
  
  return platformSelector;
}


/**
 * Gets the current platform.
 * @return {string} The current platform ('web', 'ios', or 'android').
 */
function getPlatform() {
  // Assuming you're using environment variables to determine the platform in Playwright
  const isMobile = process.env.PLAYWRIGHT_TEST_PLATFORM !== "web";
  if (!isMobile) return "web";
  const isIOS = process.env.PLAYWRIGHT_TEST_PLATFORM === "ios";
  return isIOS ? "ios" : "android";
}

/**
 * Checks if platform-specific selector is set.
 * @param {string} platform - The platform key to validate.
 * @return {string} The platform key.
 */
function validateAndGetPlatformKey(platform) {
  const platformKey = platformKeyMap[platform];
  if (!platformKey) {
    throw new Error(`Selector not set for ${platform} platform.`);
  }
  return platformKey;
}

/**
 * Checks if the current platform is web.
 * @return {boolean} True if the platform is web, otherwise false.
 */
function isWebPlatform() {
  return getPlatform() === "web";
}

module.exports = {
  platformLocator,
  platformLocators,
  isWebPlatform,
};
