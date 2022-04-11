import { vagaModel } from './../criacao-vaga/models/vaga.models';
import { Component, OnInit } from '@angular/core';
import { userLogadoModel } from '../login/model/userLogado.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listagem-vagas-empresas',
  templateUrl: './listagem-vagas-empresas.component.html',
  styleUrls: ['./listagem-vagas-empresas.component.css']
})
export class ListagemVagasEmpresasComponent implements OnInit {

  tipoUsuario: userLogadoModel|undefined;
  vagas:vagaModel[] = []

  constructor(private router:Router,private activatedRoute: ActivatedRoute) {

   }

  ngOnInit(): void {
    this.pegarTipoUsuario();
    this.redirecionamentoUsuarioTipoErrado();
    this.recuperarVagaPelaEmpresa();
  }

  //********************************************************
  //                    Autenticação
  //********************************************************

  pegarTipoUsuario(){
    if(sessionStorage.getItem('usuarioLogado')){
      let usuarioLogado = String(sessionStorage.getItem('usuarioLogado'))
      this.tipoUsuario = JSON.parse(usuarioLogado)
    }
  }

  redirecionamentoUsuarioTipoErrado(){
    if(this.tipoUsuario!.tipo=="pessoa"){
      alert('Operação invalida')
      this.router.navigate(['/agencia-emprego'])
    }
  }

  //********************************************************
  //              Listagem de vagas por empresa
  //********************************************************

  recuperarVagaPelaEmpresa(){
    this.vagas = []
    let vagas:vagaModel[] = []
    if(localStorage.getItem('vagas')){
      vagas = JSON.parse(String(localStorage.getItem('vagas')))
      vagas.forEach((vaga:vagaModel) =>{
        if(vaga.idEmpresa == this.tipoUsuario?.id){
          this.vagas.push(vaga)
        }
      })
    }
  }


  //********************************************************
  //                    Roteamento
  //********************************************************

  criarVaga(){
    this.router.navigate(['agencia-emprego/criar-vaga'])
  }

  irParaListagemPessoas(e:any){
    this.router.navigate([`agencia-emprego/vagas-empresa/candidatos`, e.currentTarget.id])
  }

}
