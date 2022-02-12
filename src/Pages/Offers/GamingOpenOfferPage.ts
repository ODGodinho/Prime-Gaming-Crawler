
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

    public async clickOffer() {
        if (!this.$i.GamingOfferPage.currentOffer) throw new Error("Offers not available");

        if (!this.$i.GamingOfferPage.offersAvailable)
            return true;

        const currentOffer = this.$i.GamingOfferPage.currentOffer.nth(this.$i.GamingOfferPage.position++);

        switch (await currentOffer.getAttribute("data-a-target")) {
            case "DownloadAndPlay":
                return true;
            case "FGWPOffer":
                currentOffer.click({ timeout: 5000, button: "left" });
                this.$i.GamingOfferPage.popup = undefined;
                return true;
        }

        const [popup] = await Promise.all([
            this.page.context().waitForEvent("page"),
            currentOffer.click({ timeout: 5000, button: "middle" }),
        ]);
        return this.$i.GamingOfferPage.popup = popup;
    }

    public async nextStep(): Promise<BasePage<PageType> | null> {
        return null;
    }

}
