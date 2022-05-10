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
    Given(/^Não a registro de usuário "EmpresaX", seja pessoa ou empresa$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get('http://localhost:4200');
    }));
    Given(/^Estou na pagina de registro$/, () => __awaiter(this, void 0, void 0, function* () {
        let register = protractor_1.element(protractor_1.by.id('login-register'));
        yield expect(register.getText()).to.eventually.equal('Create Account');
    }));
    When(/^Tento criar um usuário "EmpresaX", email "EmpresaX@gmail.com" e password "123" do tipo empresa$/, () => __awaiter(this, void 0, void 0, function* () {
        let name = "EmpresaX";
        let email = "EmpresaX@gmail.com";
        let password = "123";
        let input = protractor_1.element(protractor_1.by.id('empresa'));
        yield input.click();
        yield protractor_1.$("input[name='name']").sendKeys(name);
        yield protractor_1.$("input[name='email']").sendKeys(email);
        yield protractor_1.$("input[name='password']").sendKeys(password);
        yield protractor_1.element(protractor_1.by.buttonText('SIGN UP')).click();
        yield protractor_1.browser.sleep(2000);
    }));
    Then(/^Consigo acessar o sistema, o que mostra que a conta foi criada$/, () => __awaiter(this, void 0, void 0, function* () {
        let cadastro = protractor_1.element(protractor_1.by.id('cadastro'));
        yield expect(cadastro.getText()).to.eventually.equal('Minha empresa');
        yield protractor_1.browser.sleep(2000);
    }));
    Given(/^Estou na tela de login$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get('http://localhost:4200');
        yield protractor_1.browser.sleep(2000);
    }));
    Then(/^Clico no botão de Logar$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('form-login')).click();
        yield protractor_1.browser.sleep(2000);
    }));
    When(/^o formulário de login aparece$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.sleep(2000);
        let register = protractor_1.element(protractor_1.by.id('cadastrar'));
        yield expect(register.getText()).to.eventually.equal('SIGN IN');
        yield protractor_1.browser.sleep(2000);
    }));
    Then(/^Preencho o formulário com "EmpresaX@gmail.com" "123"$/, () => __awaiter(this, void 0, void 0, function* () {
        let email = "EmpresaX@gmail.com";
        let password = '123';
        yield protractor_1.$("input[name='email']").sendKeys(email);
        yield protractor_1.$("input[name='password']").sendKeys(password);
        yield protractor_1.browser.sleep(2000);
    }));
    Then(/^Clico no botão para fazer login$/, () => __awaiter(this, void 0, void 0, function* () {
        let register = protractor_1.element(protractor_1.by.id('cadastrar'));
        yield register.click();
        yield protractor_1.browser.sleep(2000);
    }));
    Then(/^Consigo acessar o sistema, o que mostra que a conta foi logada$/, () => __awaiter(this, void 0, void 0, function* () {
        let cadastro = protractor_1.element(protractor_1.by.id('cadastro'));
        yield expect(cadastro.getText()).to.eventually.equal('Minha empresa');
    }));
    Given(/^Usuário "Empresa X" está logado$/, () => __awaiter(this, void 0, void 0, function* () {
        let cadastro = protractor_1.element(protractor_1.by.id('cadastro'));
        yield expect(cadastro.getText()).to.eventually.equal('Minha empresa');
    }));
    Given(/^Usuário "Empresa X" é do tipo "Empresa"$/, () => __awaiter(this, void 0, void 0, function* () {
        let cadastro = protractor_1.element(protractor_1.by.id('cadastro'));
        yield expect(cadastro.getText()).to.eventually.equal('Minha empresa');
    }));
    Given(/^Usuário "Empresa X" está na tela de listagem de vagas$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('listagem')).click();
        yield protractor_1.browser.sleep(2000);
    }));
    When(/^Usuário "Empresa X" clica no botão de criar vagas$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('criarVagas')).click();
        yield protractor_1.browser.sleep(2000);
    }));
    Then(/^Cria a vaga "Desenvolvedor" com modalidde "Remota", faixa salarial "3000", Area Técnica "Tech", Descrição "ABC", Senioridade "Senior"$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('nomeVaga')).sendKeys('Desenvolvedor');
        yield protractor_1.element(protractor_1.by.id('modalidadeVaga')).sendKeys('Remoto');
        yield protractor_1.element(protractor_1.by.id('salarioVaga')).sendKeys('3000');
        yield protractor_1.element(protractor_1.by.id('tecnicaVaga')).sendKeys('Tech');
        yield protractor_1.element(protractor_1.by.id('descricaoVaga')).sendKeys('ABC');
        yield protractor_1.element(protractor_1.by.id('senioridadeVaga')).sendKeys('Senior');
        yield protractor_1.element(protractor_1.by.id('cadastrarVaga')).click();
        yield protractor_1.browser.sleep(2000);
    }));
    Then(/^Volta a tela de listagem com a nova vaga criada$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('listagem')).click();
        yield protractor_1.browser.sleep(2000);
    }));
    Given(/^Usuário "Empresa X" está na tela de notificação$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.id('notificacao')).click();
        yield protractor_1.browser.sleep(2000);
    }));
});
