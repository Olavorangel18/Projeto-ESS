import { Component, OnInit } from '@angular/core';
import { userLogadoModel } from '../login/model/userLogado.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-criacao-vaga',
  templateUrl: './criacao-vaga.component.html',
  styleUrls: ['./criacao-vaga.component.css']
})
export class CriacaoVagaComponent implements OnInit {

  tipoUsuario: userLogadoModel|undefined;
  // controles do formulario
  vagaForm: FormGroup = new FormGroup({

    nomeControl: new FormControl('', [Validators.required]),
    escolaridadeControl:new FormControl('',[Validators.required]),
    salarioControl:new FormControl('',[Validators.required]),
    areaControl:new FormControl('',[Validators.required]),
    senioridadeControl:new FormControl('',[Validators.required]),
    descricaoControl:new FormControl('',[Validators.required]),
  });
  constructor() { }

  ngOnInit() {
    this.pegarTipoUsuario()
  }

  pegarTipoUsuario(){
    let usuarioLogado = String(sessionStorage.getItem('usuarioLogado'))
    this.tipoUsuario = JSON.parse(usuarioLogado)
  }

  cadastrarVaga(){

  }

  voltar(){

  }

}
