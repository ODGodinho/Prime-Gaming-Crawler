
import { Locator } from 'playwright-core';
import { PageContract } from '../../@types/Page';
import BasePage from '../BasePage';

export default class GamingRedeemPage<PageType extends PageContract> extends BasePage<PageType> {

    public readonly $s = this.$$s.GamingRedeemSelector;

    public currentOffer?: Locator;

    public currentRansoms?: Locator;

    public currentMobileOffer?: Locator;

    public constructor(page: PageType) {
        super(page);
    }

    public async start(): Promise<this> {
        await this.waitLoadRedeem().catch(() => { });
        await this.loadFirstRedeem();
        await this.clickRedeem();
        return this;
    }

    public async closeModalRedeem() {
        return (await this.page.$(this.$$s.GamingRedeemSelector.REDEEM_MODAL.CLOSE_BUTTON))?.click({ timeout: 2000 });
    }

    public async loadFirstRedeem() {
        this.currentRansoms = this.page.locator(this.$s.REDEEM_CARDS.OFFERS)
        this.currentOffer = this.currentRansoms
            .locator(this.$s.REDEEM_CARDS.REDEEM_BUTTON);
        this.currentMobileOffer = this.currentRansoms
            .locator(this.$s.REDEEM_CARDS.REDEEM_MOBILE_BUTTON);
    }

    public async waitLoadRedeem() {
        return this.page.waitForSelector(this.$s.REDEEM_CARDS.OFFERS, { timeout: 10000 });
    }

    public async clickRedeem() {
        if (!this.currentOffer || !this.currentRansoms) throw new Error("Current Redeem not available");

        await this.throwIfOnlyMobile();
        await this.throwIfNoDefaultOffer();

        await this.closeModalRedeem().catch(() => { });
        await this.currentOffer.first().click({ timeout: 2000 }).catch(() => { });

        return true;
    }

    private async throwIfOnlyMobile() {
        if (!this.currentOffer || !this.currentMobileOffer) throw new Error("Current Redeem not available");

        if (await this.currentMobileOffer.count() && !await this.currentOffer.count()) {
            throw new Error("Mobile offers not supported");
        }
    }

    private async throwIfNoDefaultOffer() {
        if (!this.currentOffer || !this.currentMobileOffer) throw new Error("Current Redeem not available");

        if (!await this.currentMobileOffer.count() && !await this.currentOffer.count()) {
            throw new Error("Not offers available");
        }
    }

    public async nextStep(): Promise<BasePage<PageType> | null> {
        return null;
    }

}
