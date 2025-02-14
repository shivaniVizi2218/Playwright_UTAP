const { executeStep } = require("../utils/actions");
require("dotenv").config();

exports.LoginPage = class LoginPage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.username = page.locator("#user-name");
    this.password = page.locator("//*[@placeholder='Password']");
    this.btnLogin = page.locator("#login-button");
    this.headerProduct = page.locator(".title");
  }

  async launchMainUrl() {
    await executeStep(
      this.test,
      this.page,
      "navigate",
      "Navigating to Swag Labs main page",
      [process.env.BASE_URL]
    );
  }

  async loginApplication(username, password) {
    await executeStep(
      this.test,
      this.username,
      "fill",
      "Entering Username",
      username
    );
    await executeStep(
      this.test,
      this.password,
      "fill",
      "Entering password",
      password
    );
    await executeStep(
      this.test,
      this.btnLogin,
      "click",
      "Clicking login button"
    );
  }
};
