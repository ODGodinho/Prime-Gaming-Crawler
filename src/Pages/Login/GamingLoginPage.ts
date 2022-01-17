
import { PageContract } from '../../@types/Page';
import BasePage from '../BasePage';

export default class GamingLoginPage<PageType extends PageContract> extends BasePage<PageType> {

    public readonly $s = this.$$s.GamingLoginSelector;

    public constructor(page: PageType) {
        super(page);
    }

    public async start(): Promise<this> {
        await this.fillUserName();
        await this.fillPassword();
        await this.checkRememberMe();
        await this.clickLogin();
        return this;
    }

    public async fillUserName() {
        return this.page.fill(this.$$s.GamingLoginSelector.USER_NAME_INPUT, String(process.env.USER_LOGIN));
    }

    public async fillPassword() {
        return this.page.fill(this.$$s.GamingLoginSelector.USER_PASSWORD_INPUT, String(process.env.USER_PASSWORD));
    }

    public async checkRememberMe() {
        return this.page.check(this.$$s.GamingLoginSelector.REMEMBER_CHECK);
    }

    public async clickLogin() {
        return this.page.click(this.$$s.GamingLoginSelector.SUBMIT_BUTTON);
    }

    public async nextStep(): Promise<BasePage<PageType> | null> {
        return null;
    }

}
