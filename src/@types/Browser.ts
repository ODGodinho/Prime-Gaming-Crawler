import { BrowserContextContract, BrowserContextOptionsContract } from './Context';
import { PageContract } from './Page';
import { BrowserTypeContract as BrowserTypeContractEssentials, BrowserContract as BrowserContractEssentials } from "@odg/essentials-crawler-node";
import { LaunchOptions as BrowserLaunchOptions, Browser, BrowserType } from "playwright";

export type BrowserLaunchOptionsContract = { args?: Array<string> } & BrowserLaunchOptions;


type BrowserTypeContractGeneric = {
    launchPersistentContext?: (userDataDir: string, options?: {} | any) => any;
}

export type BrowserTypeContract<PageType extends PageContract> = BrowserType & BrowserTypeContractEssentials<PageType> & BrowserTypeContractGeneric;

export type BrowserContract<PageType extends PageContract> = {
    close(): Promise<any>;
    contexts?: () => Array<BrowserContextContract<PageType>>;
    newContext?: (options?: BrowserContextOptionsContract) => Promise<BrowserContextContract<PageType>>;
    createIncognitoBrowserContext?: () => Promise<BrowserContextContract<PageType>>;
} & Browser & BrowserContractEssentials<PageType>;
