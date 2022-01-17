import Browser from './Context/Browser';
import { Page, BrowserType, chromium } from 'playwright';
import ContextEssentials from '@odg/essentials-crawler-node/Context/Context';
import Context from './Context/Context';
import { config } from 'dotenv';
import GamingController from './Controllers/GamingController';
import { BrowserContextOptionsContract } from './@types/Context';
config();

const browser = new Browser<BrowserType, Page>(chromium, Context as typeof ContextEssentials);
let page: Page;
browser.initBrowser()
    .then(async () => {
        const context = await browser.newContext({
            storageState: "./current-state.json"
        } as BrowserContextOptionsContract, browser.persistentContext);
        page = await context.newPage();

        const Crawler = new GamingController(page);
        await Crawler.getGames();

        console.log("Done...");
    })
    .catch(console.log.bind(console))
    .finally(async () => {
        if (!browser.persistentContext) {
            const contextBase = browser.browser?.contexts()[0];
            await contextBase?.storageState({
                path: "./current-state.json"
            }).catch(() => { });
        }
        process.exit();
    });