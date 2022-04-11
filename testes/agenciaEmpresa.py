from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import *
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time


import pandas as pd

class TestesGUI:
    def __init__(self):
            self.usuario = "Olavo"
            self.password = "123"
            self.email = "olavo@hotmail.com"
            self.escolaridade = "Superior Incompleto"
            self.usuarioEmpresa = "Oscar"
            self.emailEmpresa = "oscar@hotmail.com"
            self.nomeVaga="Desenvolvedor"
            self.modalidadeVaga="Hibrida"
            self.salarioVaga="3000"
            self.tecnicaVaga="tech"
            self.descricaoVaga="Vamos programar e desenvolver nossas habilidades juntos"
            self.senioridadeVaga="Junior"



    def Iniciar(self):


        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        driver.get("http://localhost:4200")
        #cadastro de usuario tipo empresa
        print("Fazendo cadastro de usuario Olavo do tipo pessoa, email olavo@hotmail.com")
        driver.find_element(By.ID,'empresa').click()
        driver.find_element(By.ID,'name').send_keys(self.usuarioEmpresa)
        driver.find_element(By.ID,'email').send_keys(self.emailEmpresa)
        driver.find_element(By.ID,'password').send_keys(self.password)
        driver.find_element(By.CLASS_NAME, "cadastrar").click()
        #criar vaga
        driver.find_element(By.ID,'listagem').click()
        driver.find_element(By.ID,'criarVagas').click()
        driver.find_element(By.ID,'nomeVaga').send_keys(self.nomeVaga)
        driver.find_element(By.ID,'modalidadeVaga').send_keys(self.modalidadeVaga)
        driver.find_element(By.ID,'salarioVaga').send_keys(self.salarioVaga)
        driver.find_element(By.ID,'tecnicaVaga').send_keys(self.tecnicaVaga)
        driver.find_element(By.ID,'descricaoVaga').send_keys(self.descricaoVaga)
        driver.find_element(By.ID,'senioridadeVaga').send_keys(self.senioridadeVaga)
        driver.find_element(By.ID,'cadastrarVaga').click()
        driver.find_element(By.CLASS_NAME,"sair").click()
        #cadastro de usuario tipo pessoa
        print("Fazendo cadastro de usuario Olavo do tipo pessoa, email olavo@hotmail.com")
        driver.find_element(By.ID,'pessoa').click()
        driver.find_element(By.ID,'name').send_keys(self.usuario)
        driver.find_element(By.ID,'email').send_keys(self.email)
        driver.find_element(By.ID,'password').send_keys(self.password)
        driver.find_element(By.CLASS_NAME, "cadastrar").click()
        #terminar cadastro usuario tipo pessoa
        driver.find_element(By.ID,'usuario').click()
        driver.find_element(By.ID,'name').send_keys(self.usuario)
        driver.find_element(By.ID,'email').send_keys(self.email)
        driver.find_element(By.ID,'escolaridade').send_keys(self.escolaridade)
        driver.find_element(By.ID,'salario').send_keys(self.salarioVaga)
        driver.find_element(By.ID,'area').send_keys(self.tecnicaVaga)
        driver.find_element(By.ID,'senioridade').send_keys(self.senioridadeVaga)
        driver.find_element(By.ID,'completarUsuario').click()

        #listar vagas
        driver.find_element(By.ID,'listagem').click()
        driver.find_element(By.TAG_NAME,'igx-switch').click()
        print("Usuario cadastrado com sucesso")
        time.sleep(20)





primeira = TestesGUI()

primeira.Iniciar()
