
import { PageContract } from '../../@types/Page';
import BasePage from '../BasePage';

export default class GamingHomePage<PageType extends PageContract> extends BasePage<PageType> {

    public readonly $s = this.$$s.GamingHomeSelector;

    public constructor(page: PageType) {
        super(page);
    }

    public async start(): Promise<this> {
        await this.goto().catch(() => { });
        return this;
    }

    public async goto() {
        return this.page.goto(this.$s.HOME_URL, { waitUntil: "load" });
    }

    public async nextStep(): Promise<BasePage<PageType> | null> {
        return null;
    }

}
