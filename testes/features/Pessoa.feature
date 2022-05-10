Feature: Pessoa feature

  Scenario: Criação de usuário do tipo pessoa
    Given Não a registro de usuário "Olavo", seja pessoa ou empresa
    Given Estou na pagina de registro
    When  Tento criar um usuário "Olavo", email "olavo@gmail.com" e password "123" do tipo pessoa
    Then  Consigo acessar o sistema, o que mostra que a conta foi criada

  Scenario: Logar com um usuário do tipo Pessoa
    Given Estou na tela de login
    Then Clico no botão de Logar
    When o formulário de login aparece
    Then Preencho o formulário com "olavo@hotmail.com" "123"
    Then Consigo acesso ao sistema, o que mostra que o login aconteceu de forma apropriada

  Scenario: Mostrar ao usuário listagem de vagas
    Given Usuário "Olavo" está logado
    Given "Olavo" está na pagina de listagem de vagas
    When  A vaga "Desenvolvedor" criado pela empresa "Empresa X" aparece para o usuário

  Scenario: Candidatar a vaga 
    Given Estou na tela de listagem de vagas
    When A vaga "Desenvolvedor" criado pela empresa "Empresa X" aparece para o usuário
    Then Clico no switch da vaga
    Then a label da vaga mostra para mim que agora estou candidatado na vaga