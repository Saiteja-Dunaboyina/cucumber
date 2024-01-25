const { $, driver, browser } = require("@wdio/globals");
const Page = require('./page');

class LoginPage extends Page {

    locators = {
        usernameInput : "//input[@name='username']",
        passwordInput : "//input[@name='password']",
        loginButton : "//button[@type='submit']",
        profilePic : "//img[@alt='profile picture']",
        logoutButton : "//a[text()='Logout']"
    }

    get username_input() {
        return $(this.locators.usernameInput);
    }

    get password_input() {
        return $(this.locators.passwordInput);
    }

    get login_button() {
        return $(this.locators.loginButton);
    }

    get profile_pic() {
        return $(this.locators.profilePic);
    }

    get logout_button() {
        return $(this.locators.logoutButton);
    }

    async login(username,password) {
        browser.pause(3000);
        await this.username_input.setValue(username);
        await this.password_input.setValue(password);
        await expect(this.login_button).toBeDisplayed();
        await this.login_button.click();
    }

    async logout() {
        browser.pause(3000)
        await this.logout_button.click();
    }

    open() {
        return super.open();
    }

}

module.exports = new LoginPage();