
const GamingRedeemSelector = {
    REDEEM_CARDS: {
        OFFERS: "[data-a-target='loot-card']",
        REDEEM_BUTTON: "[data-test-selector='AvailableButton'], [data-a-target='AvailableButton']",
        REDEEM_MOBILE_BUTTON: "[data-test-selector='ExternalClaimCTALink'], [data-a-target='ExternalClaimCTALink']",
        REDEEM_EXTERNAL_BUTTON: "[data-test-selector='ExternalClaimCTALink'], [data-a-target='ExternalClaimCTALink']",
    },
    REDEEM_MODAL: {
        MODAL_ELEMENT: "[data-a-target='gms-base-modal']",
        CLOSE_BUTTON: "[data-a-target='close-modal-button']",
        SUCCESS_ELEMENT: "[data-a-target='gms-success-modal-header']",
        LOGIN_ELEMENT: "[data-a-target='sign-in-button'], .sign-in-button",
        GAME_TOKEN: "[data-a-target='copy-code-input'] input",
        CONTINUE_BUTTON: "[data-a-target='gms-cta']",
        CONTINUE_STATE_POSITION_ELEMENTS: "[class*='notificationsuccess']",
    },
    REDEEM_GAME_NAME_ELEMENT: "[data-a-target='hero-header-title']",
    REDEEM_REGEXP: /gaming.amazon.com\/loot/miu
};

export default GamingRedeemSelector;
