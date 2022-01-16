#!/bin/bash

read -p "Crawler :
1 - playwright (Recommended)
2 - puppeteer
" crawler_id

case "$crawler_id" in
    1)
        name="playwright";
        rm -rf ./src/puppeteer.sample.ts;
        mv ./src/playwright.sample.ts ./src/index.ts;
        sed -i "s/\/\*§BrowserType§\*\//BrowserType/g" ./src/\@types/Browser.ts;
        sed -i "s/\/\*§BrowserContextImport§\*\//import { BrowserContext } from \"$name-core\";/g" ./src/\@types/Context.ts;
        sed -i "s/\/\*§BrowserContextOptionsImport§\*\//import { BrowserContextOptions } from \"$name-core\";/g" ./src/\@types/Context.ts;
        sed -i "s/\/\*§BrowserLaunchOptionImport§\*\//import { LaunchOptions as BrowserLaunchOptions, Browser, BrowserType } from \"$name\";/g" ./src/\@types/Browser.ts;;

    2)
        name="puppeteer";
        rm -rf ./src/playwright.sample.ts;
        mv ./src/puppeteer.sample.ts ./src/index.ts;
        sed -i "s/\/\*§BrowserType§\*\//typeof BrowserType/g" ./src/\@types/Browser.ts;
        sed -i "s/\/\*§BrowserContextImport§\*\//import { BrowserContext } from \"$name\";/g" ./src/\@types/Context.ts;
        sed -i "s/\/\*§BrowserContextOptionsImport§\*\//import { BrowserContextOptions } from \"$name\";/g" ./src/\@types/Context.ts;
        sed -i "s/\/\*§BrowserLaunchOptionImport§\*\//import BrowserType, { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Browser } from \"$name\"\ntype BrowserLaunchOptions = (LaunchOptions \& BrowserLaunchArgumentOptions \& BrowserConnectOptions);/g" ./src/\@types/Browser.ts;;
    *) echo "Invalid type"; exit;;
esac

yarn add "$name" "$name-core"

sed -i "s/\/\*§BrowserContextOptionsExtends§\*\//extends BrowserContextOptions/g" ./src/\@types/Context.ts
sed -i "s/\/\*§PageImport§\*\//import { Page } from '$name';/g" ./src/\@types/Context.ts
sed -i "s/\/\*§PageExtends§\*\//extends Page/g" ./src/\@types/Context.ts
sed -i "s/\/\*§PageImport§\*\//import { Page } from '$name';/g" ./src/\@types/Page.ts
sed -i "s/\/\*§Page§\*\//Page/g" ./src/\@types/Page.ts
sed -i "s/\/\*&\*\//\&/g" ./src/\@types/Browser.ts
sed -i "s/\/\*&\*\//\&/g" ./src/\@types/Context.ts
sed -i "s/\/\*&\*\//\&/g" ./src/\@types/Instances.ts
sed -i "s/\/\*&\*\//\&/g" ./src/\@types/Page.ts
sed -i "s/\/\*&\*\//\&/g" ./src/\@types/Selectors.ts
sed -i "s/\/\*,\*\//\,/g" ./src/\@types/Browser.ts
sed -i "s/\/\*,\*\//\,/g" ./src/\@types/Context.ts
sed -i "s/\/\*,\*\//\,/g" ./src/\@types/Instances.ts
sed -i "s/\/\*,\*\//\,/g" ./src/\@types/Page.ts
sed -i "s/\/\*,\*\//\,/g" ./src/\@types/Selectors.ts
sed -i "s/\/\*(\*\//\(/g" ./src/\@types/Browser.ts
sed -i "s/\/\*(\*\//\(/g" ./src/\@types/Context.ts
sed -i "s/\/\*(\*\//\(/g" ./src/\@types/Instances.ts
sed -i "s/\/\*(\*\//\(/g" ./src/\@types/Page.ts
sed -i "s/\/\*(\*\//\(/g" ./src/\@types/Selectors.ts
sed -i "s/\/\*)\*\//\)/g" ./src/\@types/Browser.ts
sed -i "s/\/\*)\*\//\)/g" ./src/\@types/Context.ts
sed -i "s/\/\*)\*\//\)/g" ./src/\@types/Instances.ts
sed -i "s/\/\*)\*\//\)/g" ./src/\@types/Page.ts
sed -i "s/\/\*)\*\//\)/g" ./src/\@types/Selectors.ts
sed -i "s/\/\*§BrowserContext§\*\//\BrowserContext/g" ./src/\@types/Browser.ts
sed -i "s/\/\*§BrowserContext§\*\//\BrowserContext/g" ./src/\@types/Context.ts
sed -i "s/\/\*§BrowserContext§\*\//\BrowserContext/g" ./src/\@types/Instances.ts
sed -i "s/\/\*§BrowserContext§\*\//\BrowserContext/g" ./src/\@types/Page.ts
sed -i "s/\/\*§BrowserContext§\*\//\BrowserContext/g" ./src/\@types/Selectors.ts
sed -i "s/§crawler§/$name/g" ./src/\@types/Page.ts
sed -i "s/§crawler-core§/$name-core/g" ./src/\@types/Context.ts
sed -i "s/\/\*§BrowserLaunchOptionExtends\*\//extends BrowserLaunchOptions/g" ./src/\@types/Browser.ts
sed -i "s/\/\*§BrowserLaunchOptionName§\*\//BrowserLaunchOptions/g" ./src/\@types/Browser.ts
sed -i "s/\/\*§Browser§\*\//Browser/g" ./src/\@types/Browser.ts
sed -i "s/\/\*§Browser§\*\//Browser/g" ./src/\@types/Context.ts

