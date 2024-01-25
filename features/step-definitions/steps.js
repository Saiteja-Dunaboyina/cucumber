const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ ,browser} = require('@wdio/globals')
require("dotenv").config();
const data = require('../../data/orangehrm.json')
const LoginPage = require('../pageobjects/orangehrmlogin')
const PIMPage = require('../pageobjects/orangehrmpimpage')
const BuzzPage = require('../pageobjects/orangehrmbuzzpage')


const pages = {
    login: LoginPage
}


Given(/^I am on the login page$/, async () => {
	await LoginPage.open();
});

When(/^I am login with valid username and passsword$/, async () => {
	await LoginPage.login(process.env.orangehrm_username,process.env.orangehrm_password);
});

Then(/^I should navigate to home page$/, async () => {
	browser.pause(3000);
	await expect(LoginPage.profile_pic).toBeDisplayed();
});

Then(/^click on the profile pic$/, async () => {
	await LoginPage.profile_pic.click();
});

Then(/^click on the logout button$/, async () => { 
	await LoginPage.logout();
});

Then(/^I can see the PIM button$/,async () => {
	await expect(PIMPage.pim_button).toBeDisplayed();
});

When(/^I click on that buttonn I have navigated to PIM page$/, async () => {
	await PIMPage.clickOnThePimButton();
});

Then(/^I can add an employee$/,async () => {
	await PIMPage.addEmployee(data.firstname,data.lastname);
});

Then(/^I can see the employee name$/,async () => {
	await expect(PIMPage.emp_name).toBeDisplayed();
});


Then(/^I can see the Buzz button$/,async () => {
	await expect(BuzzPage.buzz_button).toBeDisplayed();
});

When(/^I click on that button I have navigated to Buzz page$/,async () => {
	await BuzzPage.buzz_button.click();
});

Then(/^I click on the three dots$/,async () => {
	await BuzzPage.threedotsButton.click();
});

Then(/^I can see the edit post button$/,async () => {
	await expect(BuzzPage.edit_post).toBeDisplayed();
});

Then(/^I click on it, It will open the post for edit$/,async () => {
	await BuzzPage.editPost(data.postname);
});








