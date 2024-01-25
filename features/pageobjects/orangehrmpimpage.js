const { $, driver, browser } = require("@wdio/globals");
const Page = require('./page');

class PIMPage {

    locators = {
        pimButton : "//span[text()='PIM']",
        addEmployeeButton : "//a[text()='Add Employee']",
        firstName : "//input[@name='firstName']",
        lastName : "//input[@name='lastName']",
        saveButton : "//button[@type='submit']",
        empName : "//span[@class='oxd-topbar-header-breadcrumb']/h6"
    }

    get pim_button() {
        return $(this.locators.pimButton);
    }

    get addEmployee_button(){
        return $(this.locators.addEmployeeButton);
    }

    get first_name() {
        return $(this.locators.firstName);
    }

    get last_name() {
        return $(this.locators.lastName);
    }

    get save_button() {
        return $(this.locators.saveButton);
    }

    get emp_name() {
        return $(this.locators.empName);
    }

    async isPIMButtonVisible() {
        return await this.pim_button.isDisplayed();
    }

    async clickOnThePimButton() {
        await this.pim_button.click();
    }

    async addEmployee(firstname,lastname) {
        await this.addEmployee_button.click();
        await this.first_name.setValue(firstname);
        await this.last_name.setValue(lastname);
        await this.save_button.click();
    }

    async isEmpNameDisplayed() {
        return await this.emp_name.isDisplayed();
    }

}
module.exports =  new PIMPage();