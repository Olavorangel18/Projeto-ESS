import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(({ Given, When, Then }) => {
	Given(
	/^Não a registro de usuário "EmpresaX", seja pessoa ou empresa$/,
	async () => {
		await browser.get('http://localhost:4200');
	});

	Given(
		/^Estou na pagina de registro$/,
		async () => {
		let register = element(by.id('login-register'));
		await expect(register.getText()).to.eventually.equal('Create Account');
		});

	When(/^Tento criar um usuário "EmpresaX", email "EmpresaX@gmail.com" e password "123" do tipo empresa$/, async () => {
        let name:string = "EmpresaX"
		let email:string = "EmpresaX@gmail.com"
		let password:string = "123"
		let input = element(by.id('empresa'));
		await input.click();
		await $("input[name='name']").sendKeys(<string> name);
        await $("input[name='email']").sendKeys(<string> email);
		await $("input[name='password']").sendKeys(<string> password);
        await element(by.buttonText('SIGN UP')).click();
		await browser.sleep(2000)
    });

	Then(/^Consigo acessar o sistema, o que mostra que a conta foi criada$/, async () => {
		let cadastro = element(by.id('cadastro'));
       	await expect(cadastro.getText()).to.eventually.equal('Minha empresa');
    });

	Given(
		/^Estou na tela de login$/,
		async () => {
			await browser.get('http://localhost:4200');
		});

		Then(/^Clico no botão de Logar$/, async () => {
			await element(by.id('form-login')).click();
		});

		When(/^o formulário de login aparece$/, async () => {
			await browser.sleep(2000)
			let register = element(by.id('cadastrar'));
			await expect(register.getText()).to.eventually.equal('SIGN IN');
		});

		Then(/^Preencho o formulário com "EmpresaX@gmail.com" "123"$/, async () => {
			let email = "EmpresaX@gmail.com"
			let password = '123'

			await $("input[name='email']").sendKeys(<string> email);
			await $("input[name='password']").sendKeys(<string> password);
		});

		Then(/^Clico no botão para fazer login$/, async () => {
			let register = element(by.id('cadastrar'));
			await register.click();
			await browser.sleep(2000)
		});

		Then(/^Consigo acessar o sistema, o que mostra que a conta foi logada$/, async () => {
			let cadastro = element(by.id('cadastro'));
			   await expect(cadastro.getText()).to.eventually.equal('Minha empresa');
		});

		Given(
			/^Usuário "Empresa X" está logado$/,
			async () => {
				let cadastro = element(by.id('cadastro'));
				await expect(cadastro.getText()).to.eventually.equal('Minha empresa');
			});
		
		Given(
			/^Usuário "Empresa X" é do tipo "Empresa"$/,
			async () => {
				let cadastro = element(by.id('cadastro'));
				await expect(cadastro.getText()).to.eventually.equal('Minha empresa');
			});
	
		Given(
			/^Usuário "Empresa X" está na tela de listagem de vagas$/,
			async () => {
				await element(by.id('listagem')).click();
				await browser.sleep(2000)
			});

		When(/^Usuário "Empresa X" clica no botão de criar vagas$/, async () => {
			await element(by.id('criarVagas')).click();
			await browser.sleep(2000)
		});

		Then(/^Cria a vaga "Desenvolvedor" com modalidde "Remota", faixa salarial "3000", Area Técnica "Tech", Descrição "ABC", Senioridade "Senior"$/, async () => {
			await element(by.id('nomeVaga')).sendKeys('Desenvolvedor');
			await element(by.id('modalidadeVaga')).sendKeys('Remoto');
			await element(by.id('salarioVaga')).sendKeys('3000');
			await element(by.id('tecnicaVaga')).sendKeys('Tech');
			await element(by.id('descricaoVaga')).sendKeys('ABC');
			await element(by.id('senioridadeVaga')).sendKeys('Senior');
			await element(by.id('cadastrarVaga')).click();
			await browser.sleep(2000)
		});

		Then(/^Volta a tela de listagem com a nova vaga criada$/, async () => {
			await element(by.id('listagem')).click();
			await browser.sleep(2000)
		});

		Given(
			/^Usuário "Empresa X" está na tela de notificação$/,
			async () => {
				await element(by.id('notificacao')).click();
				await browser.sleep(2000)
			});
				
})
