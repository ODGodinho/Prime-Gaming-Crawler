import { HandlerState } from '@odg/essentials-crawler-node/Handlers/BaseHandler';
import Instances from "../../@types/Instances";
import { PageContract } from '../../@types/Page';
import BasePage from "../../Pages/BasePage";
import BaseHandler from '../BaseHandler';

export default class GamingContinueButtonHandler<PageType extends PageContract> extends BaseHandler<PageType> {

    public mainInstances: Instances<PageType>;

    public gamesButtonNotSupported = [];

    public continueButtonState: number = 1;

    public firstButtonExecuted: boolean = false;

    constructor(page: BasePage<PageType>, mainInstances: Instances<PageType>) {
        super(page);
        this.mainInstances = mainInstances;
    }

    public async identifyHandler(): Promise<any> {
        await this.loadButtonState();
        switch (this.continueButtonState) {
            case 0:
                return this.clickFirstStepSolution.bind(this);
            case 1:
                return this.clickSecondStepSolution.bind(this);
            case 2:
                return this.clickLastStepSolution.bind(this);
        }
    }

    public async defaultTimeout(): Promise<number> {
        return 5000;
    }

    private async loadButtonState() {
        this.continueButtonState = await this.page.locator(this.$$s.GamingRedeemSelector.REDEEM_MODAL.MODAL_ELEMENT)
            .locator(this.$$s.GamingRedeemSelector.REDEEM_MODAL.CONTINUE_STATE_POSITION_ELEMENTS).count();
    }

    public async clickFirstStepSolution() {
        await this.page.locator(this.$$s.GamingRedeemSelector.REDEEM_MODAL.MODAL_ELEMENT)
            .locator(this.$$s.GamingRedeemSelector.REDEEM_MODAL.CONTINUE_BUTTON)
            .click().catch(() => { });
    }

    public async clickSecondStepSolution() {
        if (this.firstButtonExecuted) throw new Error("Error in continue button handler");

        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click(this.$$s.GamingRedeemSelector.REDEEM_MODAL.CONTINUE_BUTTON),
        ]);
        await this.page.goBack({ waitUntil: "networkidle" });
        this.firstButtonExecuted = true;
        return HandlerState.VERIFY;
    }

    public async clickLastStepSolution() {
        await this.page.locator(this.$$s.GamingRedeemSelector.REDEEM_MODAL.MODAL_ELEMENT)
            .locator(this.$$s.GamingRedeemSelector.REDEEM_MODAL.CONTINUE_BUTTON)
            .click().catch(() => { });
        return HandlerState.COMPLETED;
    }

    public async start(): Promise<any> {
        const solution = await this.identifyHandler();
        return this.runSolution(solution);
    }

}
