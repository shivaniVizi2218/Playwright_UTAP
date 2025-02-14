const {executeStep} = require("../utils/actions");

exports.LogoutPage = class LogoutPage{
    constructor(page, test){
        this.page = page;
        this.test = test;
        this.iconBurgerMenu = page.locator("#react-burger-menu-btn");
        this.labelLogout = page.locator("#logout_sidebar_link");
    }

    async logOut(){
        await executeStep(this.test, this.iconBurgerMenu, "click");
        await executeStep(this.test, this.labelLogout, "click", "Logging out user")
    }
}