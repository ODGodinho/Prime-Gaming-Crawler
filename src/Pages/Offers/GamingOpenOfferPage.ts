
import { Locator } from "playwright-core";
import { PageContract } from '../../@types/Page';
import BasePage from '../BasePage';

export default class GamingOpenOfferPage<PageType extends PageContract> extends BasePage<PageType> {

    public readonly $s = this.$$s.GamingOfferSelector;

    public constructor(page: PageType) {
        super(page);
    }

    public async start(): Promise<this> {
        await this.clickOffer();
        return this;
    }

    public async getNextAvailableOffer(): Promise<Locator | false> {
        if (!this.$i.GamingOfferPage.Offers) throw new Error("Offers not available");

        while (this.$i.GamingOfferPage.position < this.$i.GamingOfferPage.totalOffers) {
            const currentOffer = this.$i.GamingOfferPage.Offers
                .nth(this.$i.GamingOfferPage.position++)

            if (await currentOffer.locator(this.$s.OFFERS_CARDS.REDEEM_BUTTON).count()) return currentOffer;
        }

        return false;
    }

    public async clickOffer() {
        if (!this.$i.GamingOfferPage.Offers) throw new Error("Offers not available");

        const currentOffer = await this.getNextAvailableOffer();
        if (!currentOffer)
            throw new Error("No more offers available");

        this.$i.GamingOfferPage.currentOffer = currentOffer;
        this.$i.GamingOfferPage.currentGameName = await currentOffer
            .locator(this.$s.OFFERS_CARDS.GAME_NAME).getAttribute("aria-label") || "";


        switch (await currentOffer.getAttribute("data-a-target")) {
            case "DownloadAndPlay":
                return true;
            case "FGWPOffer":
                currentOffer.click({ timeout: 5000, button: "left" });
                this.$i.GamingOfferPage.popup = undefined;
                return true;
        }

        const [popup] = await Promise.all([
            this.page.context().waitForEvent("page", { timeout: 10000 }),
            currentOffer.click({ timeout: 5000, button: "middle" }),
        ]);
        return this.$i.GamingOfferPage.popup = popup;
    }

    public async nextStep(): Promise<BasePage<PageType> | null> {
        return null;
    }

}
