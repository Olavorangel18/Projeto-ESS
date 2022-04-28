import { pessoaModel } from './models/pessoa.model';
import { empresaModel } from './models/empresa.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { userLogadoModel } from '../login/model/userLogado.model';
import { userModel } from '../login/model/user.model';
import { AgenciaEmpregoService } from './../services/agencia-emprego.service';



@Component({
  selector: 'app-meu-cadastro',
  templateUrl: './meu-cadastro.component.html',
  styleUrls: ['./meu-cadastro.component.scss']
})
export class MeuCadastroComponent implements OnInit {

   // controles do formulario
   usuarioForm: FormGroup = new FormGroup({
    emailControl: new FormControl('',[Validators.required, Validators.email]),

    //informação empresa
    cnpjControl:new FormControl('',[Validators.required]),
    nomeControl: new FormControl('', [Validators.required]),
    localizacaoControl:new FormControl('',[Validators.required]),
    telefoneControl:new FormControl('',[Validators.required]),
    tipoEmpresaControl:new FormControl('',[Validators.required]),

    //informação pessoa
    escolaridadeControl:new FormControl('',[Validators.required]),
    salarioControl:new FormControl('',[Validators.required]),
    areaControl:new FormControl('',[Validators.required]),
    cpfControl: new FormControl('', [Validators.required]),
    senioridadeControl:new FormControl('',[Validators.required]),

  });

  tituloUsuario:string="Meus dados"
  formObject:userModel | undefined;

  //Controlador tipo de usuario
  usuario = {
    empresa:false,
    pessoa:false,
  };

  constructor(
    private service: AgenciaEmpregoService,
  ) { }

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
    this.usuarioForm.get('cpfControl')?.disable();
  }

  desabilitarEmpresaForm(){
    this.usuarioForm.get('cnpjControl')?.disable();
    this.usuarioForm.get('localizacaoControl')?.disable();
    this.usuarioForm.get('telefoneControl')?.disable();
    this.usuarioForm.get('tipoEmpresaControl')?.disable();
    this.usuarioForm.get('nomeControl')?.disable();
  }

  habilitarPessoaForm(){
    this.usuarioForm.get('escolaridadeControl')?.enable();
    this.usuarioForm.get('salarioControl')?.enable();
    this.usuarioForm.get('areaControl')?.enable();
    this.usuarioForm.get('senioridadeControl')?.enable();
    this.usuarioForm.get('cpfControl')?.enable();
  }

  habilitarEmpresaForm(){
    this.usuarioForm.get('cnpjControl')?.enable();
    this.usuarioForm.get('localizacaoControl')?.enable();
    this.usuarioForm.get('telefoneControl')?.enable();
    this.usuarioForm.get('tipoEmpresaControl')?.enable();
    this.usuarioForm.get('nomeControl')?.enable();
  }

  resetarUsuarioForm(){
    this.usuarioForm.reset();
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
        this.usuarioForm.get('nomeControl')!.value,

      )
      this.service.getUsuarioById(id)
        .subscribe(
            response => {
              if (response) {
                this.formObject = new userModel(
                  response.id,
                  response.tipo,
                  response.nome,
                  response.email,
                  response.passsword,
                  response.cadastroPessoa,
                  empresaInformacao,
                  response.candidatado,
                  response.vagas
                );
              }
              this.atualizarItem(this.formObject)
            },
            responseError => {
              console.log(
                'Erro ao tentar recuperar o usuario',
                responseError.status !== 500 ? responseError?.error?.message : '',
              );
            }
        );


    }

    // Pegar informações que está nos formularios e salvar (empresa)
    else if(this.usuario.pessoa && this.usuarioForm.valid){
      let pessoaInformmacao:pessoaModel = new pessoaModel(
        this.usuarioForm.get('cpfControl')!.value,
        this.usuarioForm.get('escolaridadeControl')!.value,
        this.usuarioForm.get('salarioControl')!.value,
        this.usuarioForm.get('areaControl')!.value,
        this.usuarioForm.get('senioridadeControl')!.value,
      )

      this.service.getUsuarioById(id)
        .subscribe(
            response => {
              if (response) {
                this.formObject = new userModel(
                  response.id,
                  response.tipo,
                  response.nome,
                  response.email,
                  response.passsword,
                  pessoaInformmacao,
                  response.cadastroEmpresa,
                  response.candidatado,
                  response.vagas
                );
              }
              this.atualizarItem(this.formObject)
            },
            responseError => {
              console.log(
                'Erro ao tentar recuperar o usuario',
                responseError.status !== 500 ? responseError?.error?.message : '',
              );
            }
        );
    }
    else{
      alert("Campos preenchidos incorretamente")
    }
  }

  private atualizarItem(usuarioParaAtualizar: userModel | undefined): void {
    if(usuarioParaAtualizar)
    this.service.atualizarUsuario(usuarioParaAtualizar)
        .subscribe(
            response => {
              console.log(response)
              this.resetarUsuarioForm()
              alert("Atualização do cadastro feito com sucesso")
            },
            responseError => {
              console.log(
                'Erro ao tentar atualizar o usuario!',
                responseError.status !== 500 ? responseError?.error?.message : '',
              );
            }
        );

  }

}
