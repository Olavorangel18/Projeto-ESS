import { vagaModel } from './../criacao-vaga/models/vaga.models';
import { userModel } from './../login/model/user.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidato-vaga',
  templateUrl: './candidato-vaga.component.html',
  styleUrls: ['./candidato-vaga.component.css']
})
export class CandidatoVagaComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {
  this.vagaID = this.activatedRoute.snapshot.params["id"];
  }

  vagaID:string = ""
  pessoasVaga:userModel[]= []

  ngOnInit(): void {
    this.recuperarPessoasByVagaID();
  }

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
