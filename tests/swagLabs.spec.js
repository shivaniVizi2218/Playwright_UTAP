const { test, expect, chromium } = require("@playwright/test");
const sections = require("../pages/index");
require("dotenv").config();
let context, page;

test.beforeAll("Setup", async ({ browser }) => {
  browser = await chromium.launch({ slowMo: 1000 });
  context = await browser.newContext();
  page = await context.newPage();
  const loginPage = new sections.LoginPage(page, test);
  await loginPage.launchMainUrl();
});

test.afterAll("Tear down", async () => {
  await page.close();
  await context.close();
});

test("TC_001 - Login with Valid Credentials", async () => {
  const loginPage = new sections.LoginPage(page, test);
  await loginPage.loginApplication(
    [process.env.swagLabs_username],
    [process.env.swagLabs_password]
  );
  await expect(loginPage.headerProduct).toBeVisible();
});

test("TC_002 - Should Add a Product to the Cart and Remove it", async () => {
  const productsPage = new sections.ProductsPage(page, test);
  // await page.pause();
  await productsPage.sortProducts();
  await productsPage.addingProductToCart();
  await productsPage.removeFromCart();
});

test("TC_003 - After Continue Shopping, Should Add a product ", async () => {
  const productsPage = new sections.ProductsPage(page, test);
  const loginPage = new sections.LoginPage(page, test);
  await productsPage.continueShopping();
  await expect(
    loginPage.headerProduct,
    "Validating whether user navigated to Products page or not"
  ).toBeVisible();
  await productsPage.addingProductToCart();
  expect(
    await productsPage.titleCart,
    "Validating whether product is added to cart or not"
  );
});

test("TC_004 - Should Checkout the Cart", async () => {
  const checkoutPage = new sections.CheckoutPage(page, test);
  await checkoutPage.naviagteToCheckout();
  await checkoutPage.fillCheckoutInfo();
  await checkoutPage.proceedCheckout();
  await expect(checkoutPage.msgCheckoutSuccess).toBeVisible();
  //await checkoutPage.navigateBackHome();
});

test("TC_005 - Should Logout the User", async () => {
  const logoutPage = new sections.LogoutPage(page, test);
  await logoutPage.logOut();
});
