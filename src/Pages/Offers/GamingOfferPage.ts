
import { Locator } from 'playwright-core';
import { PageContract } from '../../@types/Page';
import BasePage from '../BasePage';

export default class GamingOfferPage<PageType extends PageContract> extends BasePage<PageType> {

    public readonly $s = this.$$s.GamingOfferSelector;

    public currentOffer?: Locator;

    public position: number = 0;

    public offersAvailable: number = 0;

    public constructor(page: PageType) {
        super(page);
    }

    public async start(): Promise<this> {
        await this.goto();
        await this.waitOffersLoad();
        await this.loadOffers();
        await this.countOffers();
        await this.clickOffer();
        return this;
    }

    public async waitOffersLoad() {
        return this.page.waitForSelector(this.$s.OFFERS_CARDS.OFFERS);
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
    }

    public async clickOffer() {
        if (!this.currentOffer) throw new Error("Offers not available");

        if (!this.offersAvailable)
            return true;

        await this.page.click(this.$$s.GamingRedeemSelector.REDEEM_MODAL.CLOSE_BUTTON, { timeout: 500 }).catch(() => { })

        return this.currentOffer.nth(this.position++).click({ timeout: 5000 });
    }

    public async nextStep(): Promise<BasePage<PageType> | null> {
        return null;
    }

}
