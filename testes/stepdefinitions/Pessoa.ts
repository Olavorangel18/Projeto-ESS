import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(({ Given, When, Then }) => {
	
    

    Then(/^Preencho o formulário com "orc@cin.ufpe.br" "123"$/, async () => {
        let email = "orc@cin.ufpe.br"
        let password = '123'
        let register = element(by.id('cadastrar'));

        await $("input[name='email']").sendKeys(<string> email);
        await $("input[name='password']").sendKeys(<string> password);
        await register.click();
        await browser.sleep(2000)
    });

    Then(/^Consigo acesso ao sistema, o que mostra que o login aconteceu de forma apropriada - pessoa$/, async () => {
        await expect(element(by.id('cadastro')).getText()).to.eventually.equal('Meus dados');
    });

    Given(
        /^Usuário "Olavo" está logado$/,
        async () => {
            let cadastro = element(by.id('cadastro'));
            await expect(cadastro.getText()).to.eventually.equal('Meus dados');
        });
    
    Given(
		/^"Olavo" está na pagina de listagem de vagas$/,
		async () => {
			await element(by.id('listagem')).click();
			await browser.sleep(2000)
		});
    
    When(/^A vaga "Desenvolvedor" criado pela empresa "Empresa X" aparece para o usuário$/, async () => {
        await browser.sleep(2000)
        var h2 : ElementArrayFinder = element.all(by.tagName('h2'));
        var h2Dev = h2.filter(elem =>
            elem.getText().then(text => text === 'Desenvolvedor'));
        await h2Dev

        await h2Dev.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
	});

    Then(/^Clico no switch da vaga$/, async () => {
        var li : ElementArrayFinder = element.all(by.name('listagem-vaga'));
        var liDev = li.filter(elem =>
            elem.$('h2').getText().then(text => text === 'Desenvolvedor'));
        await liDev
        await liDev.get(0).$('igx-switch').click()
        await browser.sleep(2000)
    });

    Then(/^a label da vaga mostra para mim que agora estou candidatado na vaga$/, async () => {
        var li : ElementArrayFinder = element.all(by.name('listagem-vaga'));
        var liDev = li.filter(elem =>
            elem.$('h2').getText().then(text => text === 'Desenvolvedor'));
        await liDev
        await expect(liDev.get(0).$('.inscricao-label').getText()).to.eventually.equal('candidatado');
        await browser.sleep(2000)
    });
	
    
})