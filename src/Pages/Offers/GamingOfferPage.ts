
import { Locator, Page } from 'playwright-core';
import { PageContract } from '../../@types/Page';
import BasePage from '../BasePage';

export default class GamingOfferPage<PageType extends PageContract> extends BasePage<PageType> {

    public readonly $s = this.$$s.GamingOfferSelector;

    public currentOffer?: Locator;

    public position: number = 0;

    public offersAvailable: number = 0;

    public popup?: Page;

    public constructor(page: PageType) {
        super(page);
    }

    public async start(): Promise<this> {
        await this.goto();
        await this.waitOffersLoad();
        await this.scrollAllOffers().catch(() => { });
        await this.loadOffers();
        await this.countOffers();
        await this.clickCloseModalIfOpen();
        return this;
    }

    public async waitOffersLoad() {
        return this.page.waitForSelector(this.$s.OFFERS_CARDS.OFFERS);
    }

    public async scrollAllOffers() {
        const offer = this.page.locator(this.$s.OFFERS_CARDS.OFFERS);

        const numberOfferPerRow = 4;
        const numberOfLineToSkip = 4;
        let offerPosition = numberOfferPerRow;

        while (true) {
            offerPosition += numberOfferPerRow * numberOfLineToSkip;
            var current = offer.nth(offerPosition);
            if (!await current.isVisible()) break;
            await current.scrollIntoViewIfNeeded();
        }
    }

    public async goto() {
        if (!this.page.url().match(this.$$s.GamingHomeSelector.HOME_REGEXP)) {
            await this.page.goto(this.$$s.GamingHomeSelector.HOME_URL);
        }
    }

    public async loadOffers() {
        this.currentOffer = this.page.locator(this.$s.OFFERS_CARDS.OFFERS)
            .locator(this.$s.OFFERS_CARDS.REDEEM_BUTTON);
    }

    public async countOffers() {
        if (!this.currentOffer) throw new Error("Offers not available");

        this.offersAvailable = await this.currentOffer.count();
        console.log("Offers available: " + this.offersAvailable);
    }

    public async clickCloseModalIfOpen() {
        const modal = await this.page.$(this.$$s.GamingRedeemSelector.REDEEM_MODAL.CLOSE_BUTTON);
        return modal?.click().catch(() => { });
    }

    public async nextStep(): Promise<BasePage<PageType> | null> {
        return null;
    }

}
