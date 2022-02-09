import { HandlerState } from '@odg/essentials-crawler-node/Handlers/BaseHandler';
import { PageContract } from '../../@types/Page';
import BaseHandler, { HandlerFunction } from '../BaseHandler';

class GamingHomeHandler<PageType extends PageContract> extends BaseHandler<PageType> {

    public async identifyHandler(): Promise<HandlerFunction> {
        return Promise.race([
            this.identifyLoginRequired(),
            this.identifyLogged(),
            this.identifyRedeemPending(),
        ]);
    }

    public async defaultTimeout(): Promise<number> {
        return 10000;
    }

    private async identifyLoginRequired() {
        return this.page.waitForSelector(this.$$s.GamingHomeSelector.USER_LOGIN_BUTTON, { timeout: await this.defaultTimeout() })
            .then(() => this.loginSolution.bind(this));
    }

    private async identifyLogged() {
        return this.page.waitForSelector(this.$$s.GamingHomeSelector.LOGGED_ELEMENT, { timeout: await this.defaultTimeout() })
            .then(() => this.resolvedSolution.bind(this));
    }

    private async identifyRedeemPending() {
        return this.page.waitForSelector(this.$$s.GamingRedeemSelector.REDEEM_MODAL.CLOSE_BUTTON, { timeout: await this.defaultTimeout() })
            .then(() => this.redeemPendingSolution.bind(this));
    }

    private async redeemPendingSolution() {
        await this.page.click(this.$$s.GamingRedeemSelector.REDEEM_MODAL.CLOSE_BUTTON);
        return HandlerState.VERIFY;
    }

    private async loginSolution() {
        await this.page.click(this.$$s.GamingHomeSelector.USER_LOGIN_BUTTON);
        await this.$i.GamingLoginPage.start();
        return HandlerState.VERIFY;
    }

    public async start(): Promise<any> {
        const solution = await this.identifyHandler();
        return this.runSolution(solution);
    }

}

export default GamingHomeHandler;
