import { userModel } from './../login/model/user.model';
import { vagaModel } from './../criacao-vaga/models/vaga.models';
import { userLogadoModel } from './../login/model/userLogado.model';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-vaga-selecionados',
  templateUrl: './listagem-vaga-selecionados.component.html',
  styleUrls: ['./listagem-vaga-selecionados.component.scss']
})
export class ListagemVagaSelecionadosComponent implements OnInit {

  constructor(private router:Router) { }

  tipoUsuario: userLogadoModel|undefined;
  listaVagas: vagaModel[] = []

  ngOnInit(): void {
    this.pegarTipoUsuario();
    this.redirecionamentoUsuarioTipoErrado();
    this.listarVagas();
  }


  //********************************************************
  //                Descandidatar vaga
  //********************************************************

  mudarSituacaoInscricao(e:any){
    let vagaID = e.switch.id
    let vaga:vagaModel | undefined
    let vagas:vagaModel[] = []
    let usuarios:userModel[] = []
    let userID:string | undefined = ""
    let usuarioLogado:userLogadoModel = JSON.parse(String(sessionStorage.getItem('usuarioLogado')))
    userID = usuarioLogado.id

    if(!e.checked){

      JSON.parse(String(localStorage.getItem('vagas'))).forEach((vaguinha:vagaModel)=> {
          if(vaguinha.id == vagaID){
            vaga = vaguinha
            vaga.cadastrado = true
          }
      });

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

          JSON.parse(String(localStorage.getItem('vagas'))).forEach((vaguinha:vagaModel)=> {
            if(vaguinha.id == vagaID){
              let indexVaga:number = 0
              vaguinha.pessoas.forEach((pessoa:userModel,index) => {
                if(pessoa.id == this.tipoUsuario?.id){
                  indexVaga = index
                }
              })
              if(indexVaga> -1){
                vaguinha.pessoas.splice(indexVaga,1)
              }
              vagas.push(vaguinha)
            }else{
              vagas.push(vaguinha)
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
  //                   Autenticação
  //********************************************************

  pegarTipoUsuario(){
    if(sessionStorage.getItem('usuarioLogado')){
      let usuarioLogado = String(sessionStorage.getItem('usuarioLogado'))
      this.tipoUsuario = JSON.parse(usuarioLogado)
    }
  }

  redirecionamentoUsuarioTipoErrado(){
    if(this.tipoUsuario!.tipo=="empresa"){
      alert('Operação invalida')
      this.router.navigate(['/agencia-emprego'])
    }
  }

  //********************************************************
  //              Criar/Listagem de vagas
  //********************************************************

  criarVaga(){
    this.router.navigate(['agencia-emprego/criar-vaga'])
  }

  listarVagas(){
    this.listaVagas = []
    let vagas = localStorage.getItem('vagas')
    if(vagas){
      JSON.parse(vagas).forEach((vaga:vagaModel) => {
        this.listaVagas.push(vaga)
      });
    }
  }

}
