import { HandlerState } from '@odg/essentials-crawler-node/Handlers/BaseHandler';
import { appendFile } from 'fs';
import { PageContract } from '../../@types/Page';
import BaseHandler from '../BaseHandler';

export default class GamingRedeemHandler<PageType extends PageContract> extends BaseHandler<PageType> {

    public identifyHandler(): any {
        return Promise.race([
            this.identifyModalSuccess(),
            this.identifySuccess(),
            this.identifyLoginError(),
            this.identifyContinueButton(),
        ]);
    }

    public async defaultTimeout(): Promise<number> {
        return 5000;
    }

    private async identifyModalSuccess() {
        return this.page.waitForSelector(this.$$s.GamingRedeemSelector.REDEEM_MODAL.SUCCESS_ELEMENT, { timeout: await this.defaultTimeout() })
            .then(() => this.successModalRedeemSolution.bind(this));
    }

    private async identifyContinueButton() {
        return this.page.waitForSelector(this.$$s.GamingRedeemSelector.REDEEM_MODAL.CONTINUE_BUTTON, { timeout: await this.defaultTimeout() })
            .then(() => () => { throw new Error("Continue button not supported"); });
    }

    private async identifySuccess() {
        const fakePromise = new Promise(() => {});
        if (!this.$i.GamingOfferPage.currentOffer) throw new Error("Current offer is not available");
        if (!this.page.url().match(this.$$s.GamingRedeemSelector.REDEEM_REGEXP)) await fakePromise;

        const exists = await this.$i.GamingOfferPage.currentOffer.nth(this.$i.GamingOfferPage.position).isVisible({ timeout: await this.defaultTimeout() });

        if (!exists) await fakePromise;

        return this.resolvedSolution.bind(this)
    }

    private async saveTokenIfExists() {
        if (!(await this.page.$(this.$$s.GamingRedeemSelector.REDEEM_MODAL.GAME_TOKEN))) return console.log("not has token");

        const code = await this.page.inputValue(this.$$s.GamingRedeemSelector.REDEEM_MODAL.GAME_TOKEN, { timeout: 500 });
        const game = await this.page.$eval(this.$$s.GamingRedeemSelector.REDEEM_GAME_NAME_ELEMENT, (el: any) => el.innerText, {});

        appendFile("./game-codes.csv", `"${game}";"${code}"\r\n`, (err) => {
            if (!err) return;
            return console.log("Save Token File error".red, err);
        });
    }

    private async successModalRedeemSolution() {
        await this.saveTokenIfExists().catch((err) => {
            console.log("Save Token error".red, err);
        });
        await this.page.click(this.$$s.GamingRedeemSelector.REDEEM_MODAL.CLOSE_BUTTON, { timeout: 500 }).catch(() => { });
        return HandlerState.COMPLETED;
    }

    private async identifyLoginError() {
        return this.page.waitForSelector(this.$$s.GamingRedeemSelector.REDEEM_MODAL.LOGIN_ELEMENT, { timeout: await this.defaultTimeout() })
            .then(() => () => { throw new Error("Login dont working.") });
    }

    public async start(): Promise<any> {
        const solution = await this.identifyHandler().catch(() => {});
        return this.runSolution(solution);
    }

}
