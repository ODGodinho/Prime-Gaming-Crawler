import { HandlerState } from '@odg/essentials-crawler-node/Handlers/BaseHandler';
import Instances from "../../@types/Instances";
import { PageContract } from '../../@types/Page';
import BasePage from "../../Pages/BasePage";
import BaseHandler from '../BaseHandler';

export default class GamingRedeemOrModalOfferHandler<PageType extends PageContract> extends BaseHandler<PageType> {

    public mainInstances: Instances<PageType>;

    constructor(page: BasePage<PageType>, mainInstances: Instances<PageType>) {
        super(page);
        this.mainInstances = mainInstances;
    }

    public identifyHandler(): any {
        return Promise.race([
            this.identifyModalGame(),
            this.identifyRedeemPage(),
        ]);
    }

    public async defaultTimeout(): Promise<number> {
        return 5000;
    }

    public async identifyRedeemPage() {
        return this.page.waitForSelector(this.$$s.GamingRedeemSelector.REDEEM_CARDS.OFFERS, { timeout: await this.defaultTimeout() })
            .then(() => this.redeemPageSolution.bind(this));
    }

    public async identifyModalGame() {
        return this.page.waitForSelector(this.$$s.GamingRedeemSelector.REDEEM_CARDS.REDEEM_EXTERNAL_BUTTON, { timeout: await this.defaultTimeout() })
            .then(() => this.resolvedSolution.bind(this));
    }

    private async redeemPageSolution() {
        await this.$i.GamingRedeemPage.start();
        return HandlerState.COMPLETED;
    }

    public async start(): Promise<any> {
        const solution = await this.identifyHandler();
        return this.runSolution(solution);
    }

}
