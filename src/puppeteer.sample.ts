import Browser from './Context/Browser';
import puppeteer from 'puppeteer';
import ExampleGoogleCrawlerController from './Controllers/ExampleGoogleCrawlerController';
import { PageContract } from './@types/Page';
import ContextEssentials from '@odg/essentials-crawler-node/Context/Context';
import Context from './Context/Context';
import { config } from 'dotenv';
config();

const browser = new Browser<typeof puppeteer, PageContract>(puppeteer, Context as typeof ContextEssentials);

browser.initBrowser()
.then(async () => {
        const context = await browser.newContext(undefined, browser.persistentContext);
        const page = await context.newPage();

        const Crawler = new ExampleGoogleCrawlerController(page);
        await Crawler.exampleSearch();

        console.log("Done...");
        process.exit();
});