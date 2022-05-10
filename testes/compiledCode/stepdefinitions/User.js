"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const protractor_1 = require("protractor");
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
cucumber_1.defineSupportCode(({ Given, When, Then }) => {
    Given(/^There is no registered user in the forum with username "Marcos", be it pessoa or empresa$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get('http://localhost:4200');
    }));
    Given(/^I'm from register page$/, () => __awaiter(this, void 0, void 0, function* () {
        let register = protractor_1.element(protractor_1.by.id('login-register'));
        yield expect(register.getText()).to.eventually.equal('Create Account');
    }));
    When(/^I try to create an account with username "Olavo", email "olavo@gmail.com" and password "123"$/, () => __awaiter(this, void 0, void 0, function* () {
        let name = "Olavo";
        let email = "olavo@gmail.com";
        let password = "123";
        let input = protractor_1.element(protractor_1.by.id('pessoa'));
        yield input.click();
        yield protractor_1.$("input[name='name']").sendKeys(name);
        yield protractor_1.$("input[name='email']").sendKeys(email);
        yield protractor_1.$("input[name='password']").sendKeys(password);
        yield protractor_1.element(protractor_1.by.buttonText('SIGN UP')).click();
        yield protractor_1.browser.sleep(2000);
    }));
    Then(/^The system acknowledges successful account creation$/, () => __awaiter(this, void 0, void 0, function* () {
        let cadastro = protractor_1.element(protractor_1.by.id('cadastro'));
        yield expect(cadastro.getText()).to.eventually.equal('Meus dados');
    }));
});
