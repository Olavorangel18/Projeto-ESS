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
    Then(/^Preencho o formulário com "orc@cin.ufpe.br" "123"$/, () => __awaiter(this, void 0, void 0, function* () {
        let email = "orc@cin.ufpe.br";
        let password = '123';
        let register = protractor_1.element(protractor_1.by.id('cadastrar'));
        yield protractor_1.$("input[name='email']").sendKeys(email);
        yield protractor_1.$("input[name='password']").sendKeys(password);
        yield register.click();
        yield protractor_1.browser.sleep(2000);
    }));
    Then(/^Consigo acesso ao sistema, o que mostra que o login aconteceu de forma apropriada - pessoa$/, () => __awaiter(this, void 0, void 0, function* () {
        yield expect(protractor_1.element(protractor_1.by.id('cadastro')).getText()).to.eventually.equal('Meus dados');
    }));
    Given(/^Usuário "Olavo" está logado$/, () => __awaiter(this, void 0, void 0, function* () {
        let cadastro = protractor_1.element(protractor_1.by.id('cadastro'));
        yield expect(cadastro.getText()).to.eventually.equal('Meus dados');
    }));
    Given(/^"Olavo" está na pagina de listagem de vagas$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('listagem')).click();
        yield protractor_1.browser.sleep(2000);
    }));
    When(/^A vaga "Desenvolvedor" criado pela empresa "Empresa X" aparece para o usuário$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.sleep(2000);
        var h2 = protractor_1.element.all(protractor_1.by.tagName('h2'));
        var h2Dev = h2.filter(elem => elem.getText().then(text => text === 'Desenvolvedor'));
        yield h2Dev;
        yield h2Dev.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    Then(/^Clico no switch da vaga$/, () => __awaiter(this, void 0, void 0, function* () {
        var li = protractor_1.element.all(protractor_1.by.name('listagem-vaga'));
        var liDev = li.filter(elem => elem.$('h2').getText().then(text => text === 'Desenvolvedor'));
        yield liDev;
        yield liDev.get(0).$('igx-switch').click();
        yield protractor_1.browser.sleep(2000);
    }));
    Then(/^a label da vaga mostra para mim que agora estou candidatado na vaga$/, () => __awaiter(this, void 0, void 0, function* () {
        var li = protractor_1.element.all(protractor_1.by.name('listagem-vaga'));
        var liDev = li.filter(elem => elem.$('h2').getText().then(text => text === 'Desenvolvedor'));
        yield liDev;
        yield expect(liDev.get(0).$('.inscricao-label').getText()).to.eventually.equal('candidatado');
        yield protractor_1.browser.sleep(2000);
    }));
});
