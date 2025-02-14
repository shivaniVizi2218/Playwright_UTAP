const { executeStep } = require("../utils/actions");

exports.ProductsPage = class ProductsPage {
  constructor(page, test) {
    this.page = page;
    this.test = test;
    this.containerProductSort = page.locator(".product_sort_container");
    this.optPriceLowToHigh = page.locator("//option[@value='lohi']");
    this.btnAddtoCart = page.locator(
      "(//button[contains(text(), 'Add to cart')])[1]"
    );
    this.iconCart = page.locator(".shopping_cart_link");
    this.btnRemove = page.locator("//button[text()='Remove']");
    this.titleCart = page.locator("//span[text()='Your Cart']");
    this.btnContinueShopping = page.locator("#continue-shopping");
  }

  async sortProducts() {
    //await this.page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    await executeStep(
      this.test,
      this.containerProductSort,
      "ckick",
      "Clicking Sort Container"
    );
    await this.page.waitForTimeout(2000);
    await this.containerProductSort.selectOption("lohi");
  }

  async addToCart() {
    await executeStep(
      this.test,
      this.btnAddtoCart,
      "click",
      "Adding product to cart"
    );
  }

  async navigateToCart() {
    await executeStep(
      this.test,
      this.iconCart,
      "click",
      "Navigating to cart page"
    );
  }

  async addingProductToCart() {
    await this.addToCart();
    await this.navigateToCart();
  }

  async removeFromCart() {
    await executeStep(
      this.test,
      this.btnRemove,
      "click",
      "Removing product from cart"
    );
  }

  async continueShopping() {
    await executeStep(
      this.test,
      this.btnContinueShopping,
      "click",
      "Clicking on Continue Shopping"
    );
  }
};
