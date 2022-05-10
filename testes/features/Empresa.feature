Feature: Empresa feature

  Scenario: Criação de usuário do tipo empresa
    Given Não a registro de usuário "EmpresaX", seja pessoa ou empresa
    Given Estou na pagina de registro
    When  Tento criar um usuário "EmpresaX", email "EmpresaX@gmail.com" e password "123" do tipo empresa
    Then  Consigo acessar o sistema, o que mostra que a conta foi criada

  Scenario: Logar com um usuário do tipo Empresa
    Given Estou na tela de login
    Then Clico no botão de Logar
    When o formulário de login aparece
    Then Preencho o formulário com "EmpresaX@gmail.com" "123"
    Then Clico no botão para fazer login
    Then Consigo acessar o sistema, o que mostra que a conta foi logada

  Scenario: Criação de vaga
    Given Usuário "Empresa X" está logado
    Given Usuário "Empresa X" é do tipo "Empresa"
    Given Usuário "Empresa X" está na tela de listagem de vagas
    When  Usuário "Empresa X" clica no botão de criar vagas
    Then  Cria a vaga "Desenvolvedor" com modalidde "Remota", faixa salarial "3000", Area Técnica "Tech", Descrição "ABC", Senioridade "Senior"
    Then  Volta a tela de listagem com a nova vaga criada

