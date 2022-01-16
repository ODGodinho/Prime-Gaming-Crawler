import BasePageEssentials from '@odg/essentials-crawler-node/Pages/BasePage';
import Instances from '../@types/Instances';
import { PageContract } from '../@types/Page';
import SelectorsType from '../@types/Selectors';
import Selectors from '../Selectors/Selectors';

abstract class BasePage<PageType extends PageContract> extends BasePageEssentials<PageType> {

    public readonly $$s = Selectors;

    public readonly page: PageType;

    public readonly abstract $s: SelectorsType[keyof SelectorsType];

    public abstract start(): Promise<this>;

    constructor(page: PageType) {
        super(page);
        this.page = page;
    }

    public get $i(): Instances<PageType> {
        return super.$i as Instances<PageType>;
    }
}

export default BasePage;
