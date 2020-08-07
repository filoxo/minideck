const { chromium } = require("playwright");
const { setup, teardown } = require("jest-process-manager");
const { getDocument, wait, queries } = require("playwright-testing-library");
const { getByText } = queries;

const runTests = async () => {
  // Setup
  await setup({
    command: "yarn start",
    host: "localhost",
    port: 9999,
  });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:9999/");
  let $document = await getDocument(page);

  // First slide
  await wait(() => getByText($document, "Your Presentation Title"));
  // screenshots will serve as snapshot tests to catch visual regressions
  await page.screenshot({ path: `e2e/slide-0.png` });

  // Next slide using keyboard
  await page.keyboard.press("ArrowRight");
  await wait(async () => {
    $document = await getDocument(page);
    return getByText($document, "Code blocks are supported!");
  });
  await page.screenshot({ path: `e2e/slide-1.png` });

  // Navigating to valid page shows correct content
  await page.goto("http://localhost:9999/2");
  await wait(async () => {
    $document = await getDocument(page);
    return getByText($document, "Appear");
  });

  // Appear component shows and hides elements
  await page.keyboard.press("ArrowDown");
  await wait(() => getByText($document, "List item 1"));
  await page.keyboard.press("ArrowDown");
  await wait(() => getByText($document, "List item 2"));
  await page.keyboard.press("ArrowDown");
  await wait(() => getByText($document, "List item 3"));
  await page.screenshot({ path: `e2e/slide-2.png` });
  await page.keyboard.press("ArrowUp");
  await page.waitForSelector('[data-appear="false"]', { state: "hidden" });

  await browser.close();
  await teardown();
};

runTests();
