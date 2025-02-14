const { test, expect, chromium } = require("@playwright/test");
const sections = require("../pages/index");
const runAccessibility = require("../utils/accessibility");
const fs = require("fs");
require("dotenv").config();
let context, page;

test.beforeAll("Setup", async ({ browser }) => {
  browser = await chromium.launch({ slowMo: 1000 });
  context = await browser.newContext();
  page = await context.newPage();
  const reportDir = "accessibility-reports";
  if (fs.existsSync(reportDir)) {
    fs.rmdirSync(reportDir, { recursive: true });
    console.log("Deleted existing reports before test run");
  }
  const loginPage = new sections.LoginPage(page, test);
  await loginPage.launchMainUrl();
});

test.afterAll("Tear down", async () => {
  const logoutPage = new sections.LogoutPage(page, test);
  await logoutPage.logOut();
  await page.close();
  await context.close();
});

test("TC_01 - Login Page - Should Not have any Automatically detectable Accessibility Issues", async () => {
  const loginPage = new sections.LoginPage(page, test);
  await runAccessibility(page, "loginPage");
  await loginPage.loginApplication(
    [process.env.swagLabs_username],
    [process.env.swagLabs_password]
  );
  await expect(loginPage.headerProduct).toBeVisible();
});

test("TC_02 - Products Page - Should Not have any Automatically detectable Accessibility Issues", async () => {
  const productsPage = new sections.ProductsPage(page, test);
  await runAccessibility(page, "productsPage");
  await productsPage.sortProducts();
  await productsPage.addingProductToCart();
  await productsPage.removeFromCart();
});

test("TC_03 - Cart Page - Should Not have any Automatically detectable Accessibility Issues", async () => {
  const productsPage = new sections.ProductsPage(page, test);
  await productsPage.continueShopping();
  await productsPage.addingProductToCart();
  expect(
    await productsPage.titleCart,
    "Validating whether product is added to cart or not"
  );
  await runAccessibility(page, "cartPage");
});
