import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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

   // controles do formulario
   usuarioForm: FormGroup = new FormGroup({
    nomeControl: new FormControl('', [Validators.required]),
    emailControl: new FormControl('',[Validators.required, Validators.email]),
    passwordControl: new FormControl('',[Validators.required])
  });

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
