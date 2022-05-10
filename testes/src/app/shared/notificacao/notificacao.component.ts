import { userModel } from './../login/model/user.model';
import { Component, OnInit } from '@angular/core';
import { userLogadoModel } from '../login/model/userLogado.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AgenciaEmpregoService } from 'src/app/services/agencia-emprego.service';
import { notificacaoModel } from './models/notificacao.models';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.scss']
})
export class NotificacaoComponent implements OnInit {


  tipoUsuario: userLogadoModel|undefined;
  candidatos: userModel[] = [];

  constructor(private service:AgenciaEmpregoService) { }

  ngOnInit(): void {
    this.pegarTipoUsuario();
    this.pegarUsuarios();
    this.isEmpresa();
    if(this.tipoUsuario?.tipo == "pessoa") this.listarNotificacao()
  }

   // controles do formulario
   notificacaoForm: FormGroup = new FormGroup({

    //informação pessoa
    usuarioControl:new FormControl('',[Validators.required]),
    assuntoControl:new FormControl('',[Validators.required]),
    mensagemControl:new FormControl('',[Validators.required]),
    tituloControl:new FormControl('',[Validators.required]),

  });

  listaNotificacao: notificacaoModel[] = []

  //********************************************************
  //                      Forms
  //********************************************************

  isEmpresa(){
    if(this.tipoUsuario?.tipo == 'empresa'){
      this.habilitarNotificacaoForm()
    }
    else{
      this.desabilitarNotificacaoForm()
    }
  }

  desabilitarNotificacaoForm(){
    this.notificacaoForm.get('usuarioControl')?.disable();
    this.notificacaoForm.get('assuntoControl')?.disable();
    this.notificacaoForm.get('mensagemControl')?.disable();
    this.notificacaoForm.get('tituloControl')?.disable();
  }

  habilitarNotificacaoForm(){
    this.notificacaoForm.get('usuarioControl')?.enable();
    this.notificacaoForm.get('assuntoControl')?.enable();
    this.notificacaoForm.get('mensagemControl')?.enable();
    this.notificacaoForm.get('tituloControl')?.enable();
  }

  resetarNotificacaoForm(){
    this.notificacaoForm.reset();
  }

  //********************************************************
  //                   Autenticação
  //********************************************************

  pegarTipoUsuario(){
    if(sessionStorage.getItem('usuarioLogado')){
      let usuarioLogado = String(sessionStorage.getItem('usuarioLogado'))
      this.tipoUsuario = JSON.parse(usuarioLogado)
    }
  }

  pegarUsuarios(){
    this.candidatos = [];

    this.service.getUsuarios()
        .subscribe(
            response => {

              if (response) {

                response.forEach((element: any) => {
                  if(element.tipo == "pessoa")
                  this.candidatos.push(new userModel(
                    element.id,
                    element.tipo,
                    element.nome,
                    element.email,
                    "",
                    element.cadastroPessoa,
                    element.cadastroEmpresa,
                    element.candidatado,
                    element.vagas
                  ));
                });
              }
            },
            responseError => {
              console.log(
                'Erro ao tentar recuperar usuario!',
                responseError.status !== 500 ? responseError?.error?.message : '',
              );
            }
        );
  }

  //********************************************************
  //                  Criar Notificacao
  //********************************************************

  enviarNotificacao(){

    if(this.notificacaoForm.valid && this.tipoUsuario!.id){
      let notificacaoParaSalvar:notificacaoModel = new notificacaoModel(
        uuidv4(),
        this.tipoUsuario!.nome,
        this.notificacaoForm.get('usuarioControl')!.value,
        this.notificacaoForm.get('assuntoControl')!.value,
        this.notificacaoForm.get('tituloControl')!.value,
        this.notificacaoForm.get('mensagemControl')!.value,

      )
      this.criarItem(notificacaoParaSalvar);
    }
  }

  criarItem(notificacaoParaCriar:notificacaoModel){

    this.service.criarNotificacao(notificacaoParaCriar)
        .subscribe(
            response => {
              alert("Notificação enviada com sucesso")
              this.resetarNotificacaoForm()
              console.log(response)
            },
            responseError => {

              console.log(
                'Erro ao tentar enviar notificação!',
                responseError.status !== 500 ? responseError?.error?.message : '',
              );
            }
        );

    }

  //********************************************************
  //                Listagem Notificacao
  //********************************************************

  listarNotificacao(){

    this.listaNotificacao = [];

    this.service.getNotificacao()
        .subscribe(
            response => {

              if (response) {

                response.forEach((element: any) => {
                  if(element.idUsuario == this.tipoUsuario?.id)
                  this.listaNotificacao.push(new notificacaoModel(
                   element.id,
                   element.idEmpresa,
                   element.idUsuario,
                   element.assunto,
                   element.titulo,
                   element.mensagem
                  ));
                });
              }
            },
            responseError => {
              console.log(
                'Erro ao tentar recuperar vagas!',
                responseError.status !== 500 ? responseError?.error?.message : '',
              );
            }
        );
  }


}
