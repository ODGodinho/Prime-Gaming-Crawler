import GoogleSearchPage from '../Pages/Search/GoogleSearchPage';
import SearchSelectionPage from '../Pages/Selection/GoogleSelectionPage';
import GoogleSelectionEmptyPage from '../Pages/Selection/GoogleSelectionEmptyPage';
import InstancesEssentials from '@odg/essentials-crawler-node/@types/Instances';
import { PageContract } from './Page';

export default interface Instances<PageType extends PageContract> extends InstancesEssentials<PageType> {
    GoogleSearchPage: GoogleSearchPage<PageType>;
    SearchSelectionPage: SearchSelectionPage<PageType>;
    GoogleSelectionEmptyPage: GoogleSelectionEmptyPage<PageType>;
}