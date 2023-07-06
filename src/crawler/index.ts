import puppeteer, { Browser, Page } from "puppeteer-core";
import { setStealthMode } from "./crawler-utils";

class Crawler {
  constructor(private readonly browser: Browser, private readonly url: string) {}

	static async init(url: string, headless = true) {
		const browser = await puppeteer.launch({ channel: 'chrome', headless })
		return new this(browser, url);
	}

	async getHtml() {
    const page = await this.page();

		await page.goto(this.url);

    await this.sleepRand();

		const html = await page.content();
		return html;
	}

  async close() {
    await this.browser.close();
  }

  private async page() {
    const page = await this.browser.newPage();

    await page.setViewport({ width: 800, height: 600 });
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36');

    await this.stealthMode(page)

    return page
  }

  private async sleepRand() {
    return new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 10000) + 5000));
  }

  private async stealthMode(page: Page) {
    await setStealthMode(page);
  }
}

export { Crawler }