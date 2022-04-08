import { vagaModel } from './models/vaga.models';
import { Component, OnInit, Input } from '@angular/core';
import { userLogadoModel } from '../login/model/userLogado.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criacao-vaga',
  templateUrl: './criacao-vaga.component.html',
  styleUrls: ['./criacao-vaga.component.css']
})
export class CriacaoVagaComponent implements OnInit {

  tipoUsuario: userLogadoModel|undefined;

  vagas: vagaModel[] = new Array();

  @Input() itemId: string | undefined;

  // controles do formulario
  vagaForm: FormGroup = new FormGroup({
    nomeControl: new FormControl('', [Validators.required]),
    modalidadeControl:new FormControl('',[Validators.required]),
    salarioControl:new FormControl('',[Validators.required]),
    areaControl:new FormControl('',[Validators.required]),
    senioridadeControl:new FormControl('',[Validators.required]),
    descricaoControl:new FormControl('',[Validators.required]),
  });

  constructor(private router:Router) { }

  ngOnInit() {
    this.pegarTipoUsuario();
    if(localStorage.getItem("vagas")){
      JSON.parse(String(localStorage.getItem("vagas"))).forEach((vaga:vagaModel) => {
        this.vagas.push(vaga)
      });
    }
  }

  pegarTipoUsuario(){
    let usuarioLogado = String(sessionStorage.getItem('usuarioLogado'))
    this.tipoUsuario = JSON.parse(usuarioLogado)
  }

  cadastrarVaga(){
    if(this.vagaForm.valid){
      let vagaParaSalvar:vagaModel = new vagaModel(
        uuidv4(),
        this.vagaForm.get('nomeControl')!.value,
        this.vagaForm.get('modalidadeControl')!.value,
        this.vagaForm.get('salarioControl')!.value,
        this.vagaForm.get('areaControl')!.value,
        this.vagaForm.get('descricaoControl')!.value,
        this.vagaForm.get('senioridadeControl')!.value,
        this.tipoUsuario?.id,
        [],
        ""
      )
      if (this.itemId === undefined) this.criarItem(vagaParaSalvar);
    }else{
      this.atualizarVaga()
    }
  }

  criarItem(vagaParaCriar:vagaModel){
    this.vagas.push(vagaParaCriar);
      localStorage.setItem('vagas', JSON.stringify(this.vagas));
      this.vagas = [];
      this.router.navigate(['agencia-emprego/vagas'])
    }

  voltar(){
    this.router.navigate(['agencia-emprego/vagas'])
  }

  atualizarVaga(){

  }

}