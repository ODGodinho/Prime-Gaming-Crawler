import { BrowserContextContract } from '@odg/essentials-crawler-node';
import ContextEssentials from '@odg/essentials-crawler-node/Context/Context';
import Browser from './Browser';
import { BrowserTypeContract } from '../@types/Browser';
import { PageContract } from '../@types/Page';

class Context<BrowserType extends BrowserTypeContract<PageType>, PageType extends PageContract> extends ContextEssentials<BrowserType, PageType> {

    constructor(browser: Browser<BrowserType, PageType>, context: BrowserContextContract<PageType>) {
        super(browser, context);
    }

}

export default Context;