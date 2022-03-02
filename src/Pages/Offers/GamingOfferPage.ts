
import { Locator, Page } from 'playwright-core';
import { PageContract } from '../../@types/Page';
import BasePage from '../BasePage';

export default class GamingOfferPage<PageType extends PageContract> extends BasePage<PageType> {

    public readonly $s = this.$$s.GamingOfferSelector;

    public Offers?: Locator;

    public currentOffer?: Locator;

    public currentGameName?: string;

    public position: number = 0;

    public OffersButtons?: Locator;

    public offersAvailable: number = 0;

    public totalOffers: number = 0;

    public popup?: Page;

    public gamesNames: Array<string> = [];

    public constructor(page: PageType) {
        super(page);
    }

    public async start(): Promise<this> {
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
        const footer = this.page.locator(this.$s.OFFERS_CARDS.FOOTER_ELEMENT);

        const numberOfferPerRow = 4;
        const numberOfLineToSkip = 2;
        let offerPosition = numberOfferPerRow;

        while (true) {
            offerPosition += numberOfferPerRow * numberOfLineToSkip;
            var current = offer.nth(offerPosition);
            await current.scrollIntoViewIfNeeded({ timeout: 2500 }).catch(() => { });
            await footer.scrollIntoViewIfNeeded({ timeout: 2500 }).catch(() => { });
            if (!await current.isVisible()) break;
        }
    }

    public async goto() {
        if (!this.page.url().match(this.$$s.GamingHomeSelector.HOME_REGEXP)) {
            await this.page.goto(this.$$s.GamingHomeSelector.HOME_URL);
        }
    }

    public async loadOffers() {
        this.Offers = this.page.locator(this.$s.OFFERS_CARDS.OFFERS);
        this.OffersButtons = this.Offers
            .locator(this.$s.OFFERS_CARDS.REDEEM_BUTTON);
    }

    public async countOffers() {
        if (!this.OffersButtons || !this.Offers) throw new Error("Offers not available");

        this.totalOffers = await this.Offers.count();
        console.log("Total Offers: " + this.totalOffers);

        this.offersAvailable = await this.OffersButtons.count();
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
