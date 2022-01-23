
import { Locator } from 'playwright-core';
import { PageContract } from '../../@types/Page';
import BasePage from '../BasePage';

export default class GamingRedeemPage<PageType extends PageContract> extends BasePage<PageType> {

    public readonly $s = this.$$s.GamingRedeemSelector;

    public currentOffer?: Locator;

    public constructor(page: PageType) {
        super(page);
    }

    public async start(): Promise<this> {
        await this.waitLoadRedeem().catch(() => { });
        await this.loadFirstRedeem();
        await this.closeModalRedeem().catch(() => { });
        await this.clickRedeem();
        return this;
    }

    public async closeModalRedeem() {
        return (await this.page.$(this.$$s.GamingRedeemSelector.REDEEM_MODAL.CLOSE_BUTTON))?.click({ timeout: 1000 });
    }

    public async loadFirstRedeem() {
        this.currentOffer = this.page.locator(this.$s.REDEEM_CARDS.OFFERS)
            .locator(this.$s.REDEEM_CARDS.REDEEM_BUTTON);
    }

    public async waitLoadRedeem() {
        return this.page.waitForSelector(this.$s.REDEEM_CARDS.OFFERS, { timeout: 10000 });
    }

    public async clickRedeem() {
        if (!this.currentOffer) throw new Error("Current Redeem not available");

        if (!await this.currentOffer.count()) return false;

        return this.currentOffer.first().click();
    }

    public async nextStep(): Promise<BasePage<PageType> | null> {
        return null;
    }

}
