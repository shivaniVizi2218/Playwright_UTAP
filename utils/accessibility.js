const { expect } = require("@playwright/test");
const { AxeBuilder } = require("@axe-core/playwright");
const { createHtmlReport } = require("axe-html-reporter");
require("dotenv").config();

async function runAccessibility(page, pageName) {
  let currentURL = await page.url();
  await page.goto(currentURL);
  await page.waitForTimeout(parseInt(process.env.MEDIUM_WAIT));
  const results = await new AxeBuilder({ page }).analyze();     // Scanning an entire page
  // const results = await new AxeBuilder({ page })
  //   .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  //   .analyze(); // Scanning for WCAG violations
  //console.log("results page ----->", results);
  createHtmlReport({
    results: results,
    options: {
      projectKey: "SwagLabs",
      outputDir: "accessibility-reports",
      reportFileName:`${pageName}Report.html`,
    },
  });
  expect(results.violations).not.toEqual([]);
}

module.exports = runAccessibility;
 