import { pessoaModel } from './models/pessoa.model';
import { empresaModel } from './models/empresa.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { userLogadoModel } from '../login/model/userLogado.model';
import { userModel } from '../login/model/user.model';


@Component({
  selector: 'app-meu-cadastro',
  templateUrl: './meu-cadastro.component.html',
  styleUrls: ['./meu-cadastro.component.css']
})
export class MeuCadastroComponent implements OnInit {

   // controles do formulario
   usuarioForm: FormGroup = new FormGroup({
    nomeControl: new FormControl('', [Validators.required]),
    emailControl: new FormControl('',[Validators.required, Validators.email]),

    //informação empresa
    cnpjControl:new FormControl('',[Validators.required]),
    localizacaoControl:new FormControl('',[Validators.required]),
    telefoneControl:new FormControl('',[Validators.required]),
    tipoEmpresaControl:new FormControl('',[Validators.required]),

    //informação pessoa
    escolaridadeControl:new FormControl('',[Validators.required]),
    salarioControl:new FormControl('',[Validators.required]),
    areaControl:new FormControl('',[Validators.required]),
    senioridadeControl:new FormControl('',[Validators.required]),

  });

  tituloUsuario:string="Meus dados"

  //Controlador tipo de usuario
  usuario = {
    empresa:false,
    pessoa:false,
  };

  constructor() { }

  ngOnInit(): void {
    this.desabilitarEmpresaForm()
    this.habilitarPessoaForm()
    this.descobrirTipoUsuario()
    this.isEmpresa();
  }

  //********************************************************
  //              Descobrir tipo usuario
  //********************************************************

  isEmpresa(){
    if(this.usuario.empresa){
      this.tituloUsuario = "Minha empresa"
      this.desabilitarPessoaForm()
      this.habilitarEmpresaForm()
    }
  }

  descobrirTipoUsuario(){
    let usuarioLogado:userLogadoModel|undefined;
    if(sessionStorage.getItem('usuarioLogado')) usuarioLogado = JSON.parse(String(sessionStorage.getItem('usuarioLogado')))
    if(usuarioLogado?.tipo == "empresa"){
      this.usuario.empresa = true
      this.usuario.pessoa = false
    }else{
      this.usuario.empresa = false
      this.usuario.pessoa = true
    }
  }

  //********************************************************
  //                      Forms
  //********************************************************

  desabilitarPessoaForm(){
    this.usuarioForm.get('escolaridadeControl')?.disable();
    this.usuarioForm.get('salarioControl')?.disable();
    this.usuarioForm.get('areaControl')?.disable();
    this.usuarioForm.get('senioridadeControl')?.disable();
  }

  desabilitarEmpresaForm(){
    this.usuarioForm.get('cnpjControl')?.disable();
    this.usuarioForm.get('localizacaoControl')?.disable();
    this.usuarioForm.get('telefoneControl')?.disable();
    this.usuarioForm.get('tipoEmpresaControl')?.disable();
  }

  habilitarPessoaForm(){
    this.usuarioForm.get('escolaridadeControl')?.enable();
    this.usuarioForm.get('salarioControl')?.enable();
    this.usuarioForm.get('areaControl')?.enable();
    this.usuarioForm.get('senioridadeControl')?.enable();
  }

  habilitarEmpresaForm(){
    this.usuarioForm.get('cnpjControl')?.enable();
    this.usuarioForm.get('localizacaoControl')?.enable();
    this.usuarioForm.get('telefoneControl')?.enable();
    this.usuarioForm.get('tipoEmpresaControl')?.enable();
  }

  completarUsuario(){

    let id = ""
    let usuarios:userModel[] = []

    if(sessionStorage.getItem('usuarioLogado')) id = JSON.parse(String(sessionStorage.getItem('usuarioLogado'))).id

    // Pegar informações que está nos formularios e salvar (pessoa)
    if(this.usuario.empresa && this.usuarioForm.valid){
      let empresaInformacao:empresaModel = new empresaModel(
        this.usuarioForm.get('cnpjControl')!.value,
        this.usuarioForm.get('localizacaoControl')!.value,
        this.usuarioForm.get('telefoneControl')!.value,
        this.usuarioForm.get('tipoEmpresaControl')!.value,
      )
      JSON.parse(String(localStorage.getItem('users'))).forEach((usuario:userModel) => {
        if(usuario.id == id){
          usuario.cadastroEmpresa = empresaInformacao
          usuarios.push(usuario)
        }else{
          usuarios.push(usuario)
        }
      });
      localStorage.setItem('users', JSON.stringify(usuarios))
    }

    // Pegar informações que está nos formularios e salvar (empresa)
    else if(this.usuario.pessoa && this.usuarioForm.valid){
      let pessoaInformmacao:pessoaModel = new pessoaModel(
        this.usuarioForm.get('escolaridadeControl')!.value,
        this.usuarioForm.get('salarioControl')!.value,
        this.usuarioForm.get('areaControl')!.value,
        this.usuarioForm.get('senioridadeControl')!.value,
      )

      JSON.parse(String(localStorage.getItem('users'))).forEach((usuario:userModel) => {
        if(usuario.id == id){
          usuario.cadastroPessoa = pessoaInformmacao
          usuarios.push(usuario)
        }else{
          usuarios.push(usuario)
        }

      });
      localStorage.setItem('users', JSON.stringify(usuarios))
    }
  }

}
