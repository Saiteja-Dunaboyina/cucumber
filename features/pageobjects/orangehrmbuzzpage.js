const { $, driver, browser } = require("@wdio/globals");
const Page = require('./page');

class BuzzPage {
    locators = {
        buzzButton : "//span[text()='Buzz']",
        threeDots : "(//button[@class='oxd-icon-button']/i[@class='oxd-icon bi-three-dots'])[1]",
        editPost : "//p[text()='Edit Post']",
        // textBox : "//div[@class='oxd-buzz-post oxd-buzz-post--active oxd-buzz-post--composing']/textarea[@class='oxd-buzz-post-input']",
        textField : "(//textarea[@class='oxd-buzz-post-input'])[2]",
        postButton : "(//button[text()=' Post '])[2]"
    }

    get buzz_button() {
        return $(this.locators.buzzButton);
    }

    get threedotsButton() {
        return $(this.locators.threeDots);
    }

    get edit_post() {
        return $(this.locators.editPost);
    }

    get text_box() {
        return $(this.locators.textBox);
    }

    get text_field() {
        return $(this.locators.textField);
    }

    get post_button() {
        return $(this.locators.postButton);
    }

    async isBuzzButtonVisible() {
        return await this.buzz_button.isDisplayed();
    }

    async isEditPostVisible() {
        return await this.edit_post.isDisplayed();
    }

    async editPost(postname) {
        await this.edit_post.click();
        // await this.text_field.click();
        await this.text_field.clearValue();
        await this.text_field.setValue(postname);
        browser.pause(8000);
        await this.post_button.click();
    }
}
module.exports = new BuzzPage();