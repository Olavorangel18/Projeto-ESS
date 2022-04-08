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

  constructor(private router:Router,private activatedRoute: ActivatedRoute) {

   }

  tipoUsuario: userLogadoModel|undefined;
  vagas:vagaModel[] = []

  ngOnInit(): void {
    this.pegarTipoUsuario();
    this.recuperarVagaPelaEmpresa();
  }

  pegarTipoUsuario(){
    if(sessionStorage.getItem('usuarioLogado')){
      let usuarioLogado = String(sessionStorage.getItem('usuarioLogado'))
      this.tipoUsuario = JSON.parse(usuarioLogado)
    }
  }

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

  criarVaga(){
    this.router.navigate(['agencia-emprego/criar-vaga'])
  }

  irParaListagemPessoas(e:any){
    this.router.navigate([`agencia-emprego/vagas-empresa/candidatos`, e.currentTarget.id])
  }



}
