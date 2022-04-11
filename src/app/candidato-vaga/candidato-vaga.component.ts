import { userLogadoModel } from './../login/model/userLogado.model';
import { vagaModel } from './../criacao-vaga/models/vaga.models';
import { userModel } from './../login/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidato-vaga',
  templateUrl: './candidato-vaga.component.html',
  styleUrls: ['./candidato-vaga.component.css']
})
export class CandidatoVagaComponent implements OnInit {

  vagaID:string = ""
  pessoasVaga:userModel[]= []
  tipoUsuario:userLogadoModel|undefined;

  constructor(private activatedRoute: ActivatedRoute, private router:Router) {
  this.vagaID = this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.pegarTipoUsuario();
    this.redirecionamentoUsuarioTipoErrado();
    this.recuperarPessoasByVagaID();
  }

  //********************************************************
  //                   Autenticação
  //********************************************************

  pegarTipoUsuario(){
    let usuarioLogado = String(sessionStorage.getItem('usuarioLogado'))
    this.tipoUsuario = JSON.parse(usuarioLogado)
  }

  redirecionamentoUsuarioTipoErrado(){
    if(this.tipoUsuario!.tipo=="pessoa"){
      alert('Operação invalida')
      this.router.navigate(['/agencia-emprego'])
    }
  }

  //********************************************************
  //                Listagem das pessoas
  //********************************************************

  recuperarPessoasByVagaID(){
    if(localStorage.getItem('vagas')){
      JSON.parse(String(localStorage.getItem('vagas'))).forEach((vaga:vagaModel) => {
        if(vaga.id == this.vagaID){
          this.pessoasVaga= vaga.pessoas
        }
      });
    }
  }


}
