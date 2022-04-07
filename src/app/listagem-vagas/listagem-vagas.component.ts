import { userLogadoModel } from './../login/model/userLogado.model';
import { empresaModel } from './../meu-cadastro/models/empresa.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listagem-vagas',
  templateUrl: './listagem-vagas.component.html',
  styleUrls: ['./listagem-vagas.component.scss']
})
export class ListagemVagasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.pegarTipoUsuario();
    setTimeout(this.acharSwitch, 100);
  }

  tipoUsuario: userLogadoModel|undefined;

  mudarSituacaoInscricao(e:any){
      setTimeout(this.acharSwitch, 200);
  }

  acharSwitch(){
    let listaVagasSwitchAtivados:HTMLElement[] = [];
    let listaVagasSwitchInativos:HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>("li").forEach(
      vaga => {
        if(vaga.children[3].querySelector("igx-switch")?.classList[1]){
          listaVagasSwitchAtivados.push(vaga)
        }else{
          listaVagasSwitchInativos.push(vaga)
        }
      }
    )
      listaVagasSwitchAtivados.forEach(vaga => {
        vaga.children[0].innerHTML = "candidatado"
        vaga.children[0].classList.add('candidatado')
      })
      listaVagasSwitchInativos.forEach(vaga => {
        vaga.children[0].innerHTML = "não candidatado"
        vaga.children[0].classList.remove('candidatado')
      })
  }

  pegarTipoUsuario(){
    let usuarioLogado = String(sessionStorage.getItem('usuarioLogado'))
    this.tipoUsuario = JSON.parse(usuarioLogado)
  }



}
