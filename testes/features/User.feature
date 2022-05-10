Feature: User account

  Scenario: Successful creation of user account
    Given There is no registered user in the forum with username "Marcos", be it pessoa or empresa
    Given I'm from register page
    When  I try to create an account with username "Olavo", email "olavo@gmail.com" and password "123"
    Then  The system acknowledges successful account creation
