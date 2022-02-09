import GoogleSearchPage from '../Pages/Search/GoogleSearchPage';
import SearchSelectionPage from '../Pages/Selection/GoogleSelectionPage';
import GoogleSelectionEmptyPage from '../Pages/Selection/GoogleSelectionEmptyPage';
import InstancesEssentials from '@odg/essentials-crawler-node/@types/Instances';
import { PageContract } from './Page';
import GamingLoginPage from '../Pages/Login/GamingLoginPage';
import GamingHomePage from '../Pages/Home/GamingHomePage';
import GamingOfferPage from '../Pages/Offers/GamingOfferPage';
import GamingRedeemPage from '../Pages/Offers/GamingRedeemPage';
import GamingOpenOfferPage from "../Pages/Offers/GamingOpenOfferPage";

export default interface Instances<PageType extends PageContract> extends InstancesEssentials<PageType> {
    GoogleSearchPage: GoogleSearchPage<PageType>;
    SearchSelectionPage: SearchSelectionPage<PageType>;
    GoogleSelectionEmptyPage: GoogleSelectionEmptyPage<PageType>;

    GamingHomePage: GamingHomePage<PageType>;
    GamingLoginPage: GamingLoginPage<PageType>;
    GamingOfferPage: GamingOfferPage<PageType>;
    GamingOpenOfferPage: GamingOpenOfferPage<PageType>;
    GamingRedeemPage: GamingRedeemPage<PageType>;
}