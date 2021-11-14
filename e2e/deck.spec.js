const { test, expect } = require('@playwright/test');

test('Loads the first slide', async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('text=Your Presentation Title').first()).toBeVisible();
  expect(await page.screenshot()).toMatchSnapshot('slide-0.png');
});

test('Navigates to second slide with right arrow key', async ({ page }) => {
  await page.goto("/");
  // Disable css transitions for snapshot stability
  // https://github.com/microsoft/playwright/issues/4055#issuecomment-892568347
  await page.addStyleTag({
    content: `
      *,
      *::before,
      *::after {
        transition: none !important;
      }
    `,
  });
  await page.keyboard.press("ArrowRight");
  await page.waitForSelector('#slide-1');
  await expect(page.locator('text=Code blocks are supported!').first()).toBeVisible(); 
  expect(await page.screenshot()).toMatchSnapshot('slide-1.png');
});

test('Navigating to valid page shows correct content', async ({ page }) => {
  await page.goto("/#/2");
  await page.waitForSelector('#slide-2');
  await expect(page.locator('text=Appear').first()).toBeVisible();
});

test('Appear component shows and hides elements', async ({ page }) => {
  await page.goto("/#/2"); // Change this if order of slides changes
  await page.waitForSelector('text="List item 1"', { state: "hidden" });
  await page.keyboard.press("ArrowDown");
  await page.waitForSelector('text="List item 1"', { state: "visible" });
  await page.keyboard.press("ArrowDown");
  await page.waitForSelector('text="List item 2"', { state: "visible" });
  await page.keyboard.press("ArrowDown");
  await page.waitForSelector('text="List item 3"', { state: "visible" });
  await page.keyboard.press("ArrowUp");
  await page.waitForSelector('text="List item 3"', { state: "hidden" });
  expect(await page.screenshot()).toMatchSnapshot('slide-2.png');
});