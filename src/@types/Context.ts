import { BrowserContextContract as BrowserContextContractEssentials } from '@odg/essentials-crawler-node';
import { BrowserContextOptions } from "playwright-core";
import { BrowserContext } from "playwright-core";
/*§BrowserImport§*/
import { PageContract } from './Page';

export interface BrowserContextOptionsContract extends BrowserContextOptions {

}

export type BrowserContextContract<PageType extends PageContract> = BrowserContext & BrowserContextContractEssentials<PageType>;