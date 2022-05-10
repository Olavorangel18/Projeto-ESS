import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(({ Given, When, Then }) => {
	Given(
	/^There is no registered user in the forum with username "Marcos", be it pessoa or empresa$/,
	async () => {
		await browser.get('http://localhost:4200');
	});

	Given(
		/^I'm from register page$/,
		async () => {
		let register = element(by.id('login-register'));
		await expect(register.getText()).to.eventually.equal('Create Account');
		});

	When(/^I try to create an account with username "Olavo", email "olavo@gmail.com" and password "123"$/, async () => {
        let name:string = "Olavo"
		let email:string = "olavo@gmail.com"
		let password:string = "123"
		let input = element(by.id('pessoa'));
		await input.click();
		await $("input[name='name']").sendKeys(<string> name);
        await $("input[name='email']").sendKeys(<string> email);
		await $("input[name='password']").sendKeys(<string> password);
        await element(by.buttonText('SIGN UP')).click();
		await browser.sleep(2000)
    });

	Then(/^The system acknowledges successful account creation$/, async () => {
		let cadastro = element(by.id('cadastro'));
       	await expect(cadastro.getText()).to.eventually.equal('Meus dados');
    });


})
