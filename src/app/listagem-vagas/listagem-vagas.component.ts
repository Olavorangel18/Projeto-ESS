import { userModel } from './../login/model/user.model';
import { vagaModel } from './../criacao-vaga/models/vaga.models';
import { userLogadoModel } from './../login/model/userLogado.model';
import { empresaModel } from './../meu-cadastro/models/empresa.model';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-vagas',
  templateUrl: './listagem-vagas.component.html',
  styleUrls: ['./listagem-vagas.component.scss']
})
export class ListagemVagasComponent implements OnInit {

  tipoUsuario: userLogadoModel|undefined

  //Usado para renderizar as listas no html
  listaVagas: vagaModel[] = []

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.pegarTipoUsuario();
    this.listarVagas();
  }

  //********************************************************
  //                  Autenticação
  //********************************************************

  pegarTipoUsuario(){
    if(sessionStorage.getItem('usuarioLogado')){
      let usuarioLogado = String(sessionStorage.getItem('usuarioLogado'))
      this.tipoUsuario = JSON.parse(usuarioLogado)
    }
  }

  //********************************************************
  //            Descandidatar/Candidatar vaga
  //********************************************************

  mudarSituacaoInscricao(e:any){
    let vagaID = e.switch.id
    let vaga:vagaModel | undefined
    let vagas:vagaModel[] = []
    let usuarios:userModel[] = []
    let userID:string | undefined = ""
    let usuarioLogado:userLogadoModel = JSON.parse(String(sessionStorage.getItem('usuarioLogado')))
    let isCadastrado:boolean = false;
    userID = usuarioLogado.id

     if(e.checked){

      JSON.parse(String(localStorage.getItem('vagas'))).forEach((vagaSelecionada:vagaModel)=> {
          if(vagaSelecionada.id == vagaID){
            vaga = vagaSelecionada
            vaga.cadastrado = true
          }
      });

      //Guardar no objeto usuario a vaga que foi selecionada
      JSON.parse(String(localStorage.getItem('users'))).forEach((usuario:userModel)=> {
         if(usuario.id == userID && vaga){
           if(usuario.cadastroPessoa){
            usuario.vagas.push(vaga)
            usuarios.push(usuario)
            //Guardar no objeto vaga o usuario que o selecionou
            JSON.parse(String(localStorage.getItem('vagas'))).forEach((vagaSelecionada:vagaModel)=> {
              if(vagaSelecionada.id == vagaID){
                vagaSelecionada.pessoas.push(usuario)
                vagas.push(vagaSelecionada)
              }else{
                vagas.push(vagaSelecionada)
              }
            });
            isCadastrado=true
           }
           else{
             alert('Usuario não completou cadastro')
             this.router.navigate(["/agencia-emprego"])
           }
          }else{
            usuarios.push(usuario)
          }
      });
      //Se ocorreu o cadastro atualizar o banco de dados
      if(isCadastrado){
        localStorage.setItem('users',JSON.stringify(usuarios))
        localStorage.setItem('vagas',JSON.stringify(vagas))
      }

      this.pintarLabelCandidato(vagaID)

     }else{

      JSON.parse(String(localStorage.getItem('vagas'))).forEach((vagaSelecionada:vagaModel)=> {
          if(vagaSelecionada.id == vagaID){
            vaga = vagaSelecionada
            vaga.cadastrado = true
          }
      });

      //Retirar do objeto usuario a vaga que foi descelecionada
      JSON.parse(String(localStorage.getItem('users'))).forEach((usuario:userModel)=> {
        if(usuario.id == userID && vaga){
          let indexUsuario:number = -1
          vaga.pessoas.forEach((candidato:userModel, index:number) => {
            if(candidato.id == this.tipoUsuario?.id){
              indexUsuario = index;
            }
          })
          if(indexUsuario > -1){
            usuario.vagas.splice(indexUsuario,1)
          }
          usuarios.push(usuario)

          //Retirar do objeto vaga o usuario que o descelecionou
          JSON.parse(String(localStorage.getItem('vagas'))).forEach((vagaSelecionada:vagaModel)=> {
            if(vagaSelecionada.id == vagaID){
              let indexVaga:number = 0
              vagaSelecionada.pessoas.forEach((pessoa:userModel,index) => {
                if(pessoa.id == this.tipoUsuario?.id){
                  indexVaga = index
                }
              })
              if(indexVaga> -1){
                vagaSelecionada.pessoas.splice(indexVaga,1)
              }
              vagas.push(vagaSelecionada)
            }else{
              vagas.push(vagaSelecionada)
            }

        });
        }else{
          usuarios.push(usuario)
        }
      });

      localStorage.setItem('users',JSON.stringify(usuarios))
      localStorage.setItem('vagas',JSON.stringify(vagas))
      this.retirarPituraLabel(vagaID)
     }
  }


  pintarLabelCandidato(vagaID:string){
   let label = document.getElementsByClassName(vagaID)
   label[0].classList.add('candidatado')
   label[0].innerHTML="candidatado"
  }

  retirarPituraLabel(vagaID:string){
  let label = document.getElementsByClassName(vagaID)
   label[0].classList.remove('candidatado')
   label[0].id = "";
   label[0].innerHTML="não candidatado"
  }

  verSwitchLabel(vaga:vagaModel){
    return vaga.pessoas.find(pessoa => pessoa.id == this.tipoUsuario?.id) ? true : false
  }

  //********************************************************
  //              Criação/Listagem de vagas
  //********************************************************

  criarVaga(){
    this.router.navigate(['agencia-emprego/criar-vaga'])
  }

  listarVagas(){
    let vagas = localStorage.getItem('vagas')
    if(vagas){
      JSON.parse(vagas).forEach((vaga:vagaModel) => {
        this.listaVagas.push(vaga)
      });
    }
  }

}
