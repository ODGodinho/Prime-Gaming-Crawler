import { BrowserContextContract as BrowserContextContractEssentials } from '@odg/essentials-crawler-node';
/*§BrowserContextOptionsImport§*/
/*§BrowserContextImport§*/
/*§BrowserImport§*/
import { PageContract } from './Page';

export interface BrowserContextOptionsContract /*§BrowserContextOptionsExtends§*/ {

}

export type BrowserContextContract<PageType extends PageContract> = /*§BrowserContext§*/ /*&*/ BrowserContextContractEssentials<PageType>;