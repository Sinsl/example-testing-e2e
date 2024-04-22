import puppetteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("test check", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:8087";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) =>
      server.connected ? resolve() : reject(),
    );

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 200,
      devtools: false, // show devTools
      // args: [`--window-size=1000,1000`],
      defaultViewport: {
        width: 1000,
        height: 1000,
      },
    });

    page = await browser.newPage();
    await page.goto(baseUrl);
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test("тест на первый клик, елемент есть на странице", async () => {
    const img = await page.$(".img");
    await img.click();
    expect(await page.waitForSelector(".tip-active")).toBeTruthy();
  });

  test("тест на второй клик, елемента нет на странице", async () => {
    const img = await page.$(".img");
    await img.click();
    expect(await page.$(".tip-active")).toBeNull();
  });
  
  test("тест проверяет текст элемента", async () => {
    const img = await page.$(".img");
    await img.click();
    expect(await page.$eval(".tip", (elem) => elem.textContent)).toBe(
      "Всплывающая подсказка",
    );
  });
});