import 'colors';
import { Page } from "playwright-core";
import Instances from '../@types/Instances';
import { PageContract } from '../@types/Page';
import GamingHomeHandler from '../Handlers/Home/GamingHomeHandler';
import GamingRedeemHandler from '../Handlers/Offers/GamingReedemHandler';
import GamingOfferPage from "../Pages/Offers/GamingOfferPage";
import initInstances from '../Pages/Pages';

class GamingController {

    public page: PageContract;

    public $i: Instances<PageContract>;

    public $popup?: Instances<PageContract>;

    constructor(page: PageContract) {
        this.page = page;
        this.$i = initInstances(this.page);
    }

    public async getGames(): Promise<void> {
        const HomeStep = await this.$i.GamingHomePage.start();
        await (new GamingHomeHandler(HomeStep)).start();

        var OfferStep = await this.$i.GamingOfferPage.start();

        do {
            try {
                await this.$i.GamingOpenOfferPage.start();
                this.$popup = this.loadPopupOrMainInstances(OfferStep);
                const RedeemStep = await this.$popup.GamingRedeemPage.start();

                const GamingRedeem = new GamingRedeemHandler(RedeemStep, this.$i);
                await GamingRedeem.start();
            } catch (error) {
                console.log("Error get Game".red, error);
            }
            await OfferStep.popup?.close().catch(() => {});
        } while (OfferStep.position < OfferStep.offersAvailable);

        console.log("Finish".bgCyan.black);
    }

    private loadPopupOrMainInstances(OfferStep: GamingOfferPage<Page>): Instances<Page> {
        return OfferStep.popup ? initInstances(OfferStep.popup) : this.$i;
    }

}

export default GamingController;