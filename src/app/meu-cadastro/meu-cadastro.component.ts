import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meu-cadastro',
  templateUrl: './meu-cadastro.component.html',
  styleUrls: ['./meu-cadastro.component.css']
})
export class MeuCadastroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.isEmpresa();
  }

  dados:string="Meus dados"
  usuario = {
    empresa:true,
    pessoa:false,
  };

  isEmpresa(){
    if(this.usuario.empresa){
      this.dados = "Minha empresa"
    }
  }

}
