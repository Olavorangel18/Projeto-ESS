//Entrega parcial grupo 9
import { userLogadoModel } from './model/userLogado.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { userModel, userLogar} from './model/user.model';

import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  @Input() itemId: string | undefined;

  users: userModel[] = new Array();
  usuarioLogado:userLogadoModel|undefined;
  logIn:boolean = false;

  // controles do formulario
  usuarioForm: FormGroup = new FormGroup({
  nomeControl: new FormControl('', [Validators.required]),
  emailControl: new FormControl('',[Validators.required, Validators.email]),
  passwordControl: new FormControl('',[Validators.required]),
  });

  //controlador de pessoa
  pessoaControl = "#FFFFFF"

  //controlador de empresa
  empresaControl = "#41B8D2"

  constructor(private route:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("users")){
      JSON.parse(String(localStorage.getItem("users"))).forEach((element:userModel) => {
        this.users.push(element)
      });
    }
  }

  ngOnDestroy(){
    this.users = [];
  }


  //********************************************************
  //              Definir o tipo de usuario
  //********************************************************

  escolherTipoUsuario(e:any){
    if(e.currentTarget.id == "pessoa"){
      this.pessoaControl = "#FFFFFF"
      this.empresaControl = "#41B8D2"
    }else if(e.currentTarget.id=="empresa"){
      this.pessoaControl = "#41B8D2"
      this.empresaControl = "#ffffff"
    }
    document.querySelector(".ativo")?.classList.remove('ativo')
    e.currentTarget.classList.add("ativo")
  }

  inicializarTipoUsuario(){
    this.pessoaControl = "#FFFFFF"
    this.empresaControl = "#41B8D2"
  }

  //********************************************************
  //                    Criar Usuario
  //********************************************************

  salvarUsuario(){
    if(this.usuarioForm.valid && this.logIn == false){
      let usuarioParaSalvar:userModel = new userModel(
        uuidv4(),
        document.querySelector(".ativo")!.id,
        this.usuarioForm.get('nomeControl')!.value,
        this.usuarioForm.get('emailControl')!.value,
        this.usuarioForm.get('passwordControl')!.value,
        undefined,
        undefined,
        "",
        [],
      )
      if (this.itemId === undefined) this.criarItem(usuarioParaSalvar);
    }else{
      this.logar()
    }

  }

  private criarItem(usuarioParaSalvar: userModel): void {
    let flagEmailRepetido = false;
    let usuarios = JSON.parse(String(localStorage.getItem("users")))
    if(usuarios){
      usuarios.forEach((usuario:userModel) => {
        if(usuario.email == usuarioParaSalvar.email) flagEmailRepetido = true;
      });
    }

    if(flagEmailRepetido == false){
      this.users.push(usuarioParaSalvar);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.users = [];
      this.route.navigate(['/agencia-emprego'])
    }
    else{
      alert("Email repetido detectado")
    }

  this.usuarioLogado = new userLogadoModel(
      usuarioParaSalvar.id,
      usuarioParaSalvar.tipo,
      usuarioParaSalvar.nome
    )
    sessionStorage.setItem('usuarioLogado', JSON.stringify(this.usuarioLogado))

  }

  //********************************************************
  //                        Login
  //********************************************************

  abrirFormLogin(){
    if(this.logIn){
      this.logIn = false;
      this.inicializarTipoUsuario();
      return
    }
    this.logIn=true
    document.querySelectorAll("h2")[1].style.paddingBottom="30px";
  }

  logar(){
    this.usuarioForm.get('nomeControl')?.disable();
    if(this.usuarioForm.valid && this.logIn == true){
      let usuarioParaLogar:userLogar = new userLogar(
        this.usuarioForm.get('emailControl')!.value,
        this.usuarioForm.get('passwordControl')!.value,
      )
      if(JSON.parse(String(localStorage.getItem("users")))){
        let matchUsuario = false;
        let usuarios = JSON.parse(String(localStorage.getItem("users")))
        usuarios.forEach((usuario:userModel) => {
          if(usuario.email == usuarioParaLogar.email && usuario.password == usuarioParaLogar.password){
            matchUsuario = true;
            this.usuarioLogado = new userLogadoModel(
              usuario.id,
              usuario.tipo,
              usuario.nome
            )
            sessionStorage.setItem('usuarioLogado', JSON.stringify(this.usuarioLogado))

            this.route.navigate(['/agencia-emprego'])
          }
        });
        if(matchUsuario == false){
          alert('Usuario não cadastrado')
        }
      }
      else{
        this.usuarioForm.get('nomeControl')?.enable();
        alert("Usuario invalido")
      }
    }else{
      alert ("Login invalido")
    }
    this.usuarioForm.get('nomeControl')?.enable();
  }

}
