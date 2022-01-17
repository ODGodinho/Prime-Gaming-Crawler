import 'colors';
import Instances from '../@types/Instances';
import { PageContract } from '../@types/Page';
import GamingHomeHandler from '../Handlers/Home/GamingHomeHandler';
import GamingRedeemHandler from '../Handlers/Offers/GamingReedemHandler';
import initInstances from '../Pages/Pages';

class GamingController {

    public page: PageContract;

    public $i: Instances<PageContract>;

    constructor(page: PageContract) {
        this.page = page;
        this.$i = initInstances(this.page);
    }

    public async getGames(): Promise<void> {
        const HomeStep = await this.$i.GamingHomePage.start();
        await (new GamingHomeHandler(HomeStep)).start();

        do {
            var OfferStep = await this.$i.GamingOfferPage.start();
            const RedeemStep = await this.$i.GamingRedeemPage.start();

            const GamingRedeem = new GamingRedeemHandler(RedeemStep);
            await GamingRedeem.start().catch((err) => {
                console.log("Error get Game".red, err.message);
            });
        } while (OfferStep.position < OfferStep.offersAvailable);

        console.log("Finish".bgCyan.black);
    }

}

export default GamingController;