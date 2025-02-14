const { executeStep } = require("../utils/actions");
const { faker } = require("@faker-js/faker");

exports.CheckoutPage = class CheckoutPage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.btnCheckOut = page.locator("#checkout");
    this.titleCheckoutInfomation = page.locator(
      "//span[contains(text(),'Checkout')]"
    );
    this.inputFirstName = page.locator("#first-name");
    this.inputLastName = page.locator("#last-name");
    this.inputZipCode = page.locator("#postal-code");
    this.btnContinue = page.locator("#continue");
    this.btnFinish = page.locator("#finish");
    this.msgCheckoutSuccess = page.locator(".complete-header");
    this.btnBackHome = page.locator("#back-to-products");
  }

  async naviagteToCheckout() {
    await executeStep(
      this.test,
      this.btnCheckOut,
      "click",
      "Click on Checkout button"
    );
  }

  async fillCheckoutInfo() {
    await executeStep(
      this.test,
      this.inputFirstName,
      "fill",
      "Entering first name in checkout info",
      [faker.person.firstName()]
    );
    await executeStep(
      this.test,
      this.inputLastName,
      "fill",
      "Entering last name in checkout info",
      [faker.person.lastName()]
    );
    await executeStep(
      this.test,
      this.inputZipCode,
      "fill",
      "Entering zipcode",
      [faker.location.zipCode("####")]
    );
  }

  async proceedCheckout() {
    await executeStep(
      this.test,
      this.btnContinue,
      "click",
      "Clicking Continue button"
    );
    await executeStep(this.test, this.btnFinish, "click", "Finishing checkout");
  }

  async navigateBackHome() {
    await executeStep(
      this.test,
      this.btnBackHome,
      "click",
      "Navigating Back to Home page"
    );
  }
};
