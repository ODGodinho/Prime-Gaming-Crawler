import 'colors';
import { appendFile } from "fs";
import { Page } from "playwright-core";
import Instances from '../@types/Instances';
import { PageContract } from '../@types/Page';
import GamingHomeHandler from '../Handlers/Home/GamingHomeHandler';
import GamingRedeemHandler from '../Handlers/Offers/GamingReedemHandler';
import GamingRedeemOrModalOfferHandler from "../Handlers/Offers/GamingRedeemOrModalOfferHandler";
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
                const OfferToReedem = new GamingRedeemOrModalOfferHandler(this.$popup.GamingHomePage, this.$popup);
                await OfferToReedem.start();

                const GamingRedeem = new GamingRedeemHandler(this.$popup.GamingOpenOfferPage, this.$i);
                await GamingRedeem.start();
            } catch (error: any) {
                const message = Number(process.env.DEBUG) ? error : error.message;
                const gameName = this.$i.GamingOfferPage.currentGameName || "";

                console.log(`\n${gameName}`.red, message);
                appendFile("./game-errors.csv", `"${gameName}";"${error.message}"\r\n`, (err: any) => {
                    if (!err) return;
                    return true;
                });
            }
            await OfferStep.popup?.close().catch(() => { });
        } while (OfferStep.position < OfferStep.totalOffers);

        console.log("Finish".bgCyan.black);
    }

    private loadPopupOrMainInstances(OfferStep: GamingOfferPage<Page>): Instances<Page> {
        return OfferStep.popup ? initInstances(OfferStep.popup) : this.$i;
    }

}

export default GamingController;