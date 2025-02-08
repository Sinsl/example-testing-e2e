import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("test check", () => {
    let browser = null;
    let page = null;
    let server = null;
    const baseUrl = "http://localhost:8091";

    beforeAll(async () => {
        server = fork(`${__dirname}/e2e.server.js`);
        await new Promise((resolve, reject) => {
            if (server.connected) {
                process.send('ok');
                resolve()
            } else {
                reject();
            }
        });

        const options = {
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // настройка для сред ci/cd
            slowMo: 100,
            // расскомментировать для локального прогона и закомменитровать для ci/cd
            // headless: false, 
            // devtools: false,
        }

        browser = await puppeteer.launch(options);
        page = await browser.newPage();

    });

    afterAll(async () => {
        await browser.close();
        server.kill();
    });

    test("тест на первый клик, елемент есть на странице", async () => {
        await page.goto(baseUrl);
        const img = await page.$(".img");
        await img.click();
        expect(await page.waitForSelector(".tip-active")).toBeTruthy();
    });

    test("тест на второй клик, елемента нет на странице", async () => {
        await page.goto(baseUrl);
        const img = await page.$(".img");
        await img.click();
        await img.click();
        expect(await page.$(".tip-active")).toBeNull();
    });

    test("тест проверяет текст элемента", async () => {
        await page.goto(baseUrl);
        const img = await page.$(".img");
        await img.click();
        expect(await page.$eval(".tip", (elem) => elem.textContent)).toBe(
            "Всплывающая подсказка",
        );
    });
});
