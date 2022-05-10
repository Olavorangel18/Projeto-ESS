Feature: Pessoa feature

  Scenario: Logar com um usuário do tipo Pessoa
    Given Estou na tela de login
    Then Clico no botão de Logar
    When o formulário de login aparece
    Then Preencho o formulário com "orc@cin.ufpe.br" "123"
    Then Consigo acesso ao sistema, o que mostra que o login aconteceu de forma apropriada - pessoa

  Scenario: Mostrar ao usuário listagem de vagas
    Given Usuário "Olavo" está logado
    Given "Olavo" está na pagina de listagem de vagas
    When  A vaga "Desenvolvedor" criado pela empresa "Empresa X" aparece para o usuário

  Scenario: Candidatar a vaga 
    Given "Olavo" está na pagina de listagem de vagas
    When A vaga "Desenvolvedor" criado pela empresa "Empresa X" aparece para o usuário
    Then Clico no switch da vaga
    Then a label da vaga mostra para mim que agora estou candidatado na vaga