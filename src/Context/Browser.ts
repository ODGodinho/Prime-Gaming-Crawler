import { BrowserLaunchOptionsContract } from '@odg/essentials-crawler-node';
import BrowserEssentials from '@odg/essentials-crawler-node/Context/Browser';
import ContextEssentials from '@odg/essentials-crawler-node/Context/Context';
import { BrowserContract } from '../@types/Browser';
import { BrowserContextContract } from '../@types/Context';
import { BrowserTypeContract } from '../@types/Browser';
import { PageContract } from '../@types/Page';

class Browser<BrowserType extends BrowserTypeContract<PageType>, PageType extends PageContract> extends BrowserEssentials<BrowserType, PageType, typeof ContextEssentials> {

    declare browserType: BrowserType;
    declare browser?: BrowserContract<PageType> | null;
    public persistentContext?: BrowserContextContract<PageContract>;

    constructor(browserType: BrowserType, context: typeof ContextEssentials) {
        super(browserType, context);
    }

    protected browserOptions(): BrowserLaunchOptionsContract {
        return {
            headless: Boolean(Number(process.env.HEADLESS) || false),
            executablePath: process.env.BROWSER_PATH || undefined,
            args: [
                "--wm-window-animations-disabled",
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-infobars",
                "--disable-blink-features=AutomationControlled",
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process',
                '--allow-running-insecure-content',
                '--mute-audio',
                '--no-xshm',
                '--window-size=1920,1080',
                '--no-default-browser-check',
                '--disable-gpu',
                '--enable-webgl',
                '--ignore-certificate-errors',
                '--lang=en-US,en;q=0.9',
                '--password-store=basic',
                '--disable-gpu-sandbox',
                '--disable-software-rasterizer',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding',
                '--disable-breakpad',
                '--disable-canvas-aa',
                '--disable-2d-canvas-clip-aa',
                '--disable-gl-drawing-for-tests',
                '--enable-low-end-device-mode',
            ],
        };
    }

    async initBrowser() {
        if (process.env.PERSISTENT_BROWSER && this.browserType.launchPersistentContext) {
            this.browser = null;
            this.persistentContext = await this.browserType.launchPersistentContext(process.env.PERSISTENT_BROWSER, this.browserOptions());
            return;
        }
        this.browser = await this.browserType.launch(this.browserOptions());
    }

}

export default Browser;