import { Page } from "puppeteer-core";

const setStealthMode = async (page: Page) => {
    // Pass the Webdriver test
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {
            get: () => false,
        });
    });

    // Pass the Chrome Test
    await page.evaluateOnNewDocument(() => {
        // We can mock this in as much depth as we need for the test
        (window as any).navigator.chrome = {
            runtime: {},
        };
    });

    // Pass the Permissions Test
    await page.evaluateOnNewDocument(() => {
        const originalQuery = window.navigator.permissions.query;
        (window.navigator.permissions as any).query = (parameters: any) => (
            parameters.name === 'notifications' ?
                Promise.resolve({ state: Notification.permission }) :
                originalQuery(parameters)
        );
    });

    // Pass the Plugins Length Test
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'plugins', {
            get: () => [1, 2, 3, 4, 5],
        });
    });

    // Pass the Languages Test
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'languages', {
            get: () => ['en-US', 'en'],
        });
    });
};

export { setStealthMode }
