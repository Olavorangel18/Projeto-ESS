//Entrega parcial grupo 9
import { AgenciaEmpregoService } from './../services/agencia-emprego.service';
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
  logarAgora:boolean = false;


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

  constructor(
    private route:Router,
    private service: AgenciaEmpregoService,
    ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(){

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
        false,
        [],
      )
      if (this.itemId === undefined) this.criarItem(usuarioParaSalvar);
    }else{
      this.logar()
    }

  }

  private criarItem(usuarioParaSalvar: userModel): void {

     this.service.criarUsuario(usuarioParaSalvar)
        .subscribe(
            response => {
              console.log(response)
              this.logarAgora = true;
              this.logar();
            },
            responseError => {
             console.log(
                'Erro ao tentar incluir classe de matriz!',
                responseError.status !== 500 ? responseError?.error?.message : '',
              );
            }
        );

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
    if(this.usuarioForm.valid && this.logIn == true || this.logarAgora==true){
      let usuarioParaLogar:userLogar = new userLogar(
        this.usuarioForm.get('emailControl')!.value,
        this.usuarioForm.get('passwordControl')!.value,
      )

      this.users= [];

    this.service.getUsuarios()
        .subscribe(
            response => {
              if (response) {

                response.forEach((element: any) => {
                  this.users.push(new userModel(
                    element.id,
                    element.tipo,
                    element.nome,
                    element.email,
                    element.password,
                    element.cadastroPessoa,
                    element.cadastroEmpresa,
                    element.candidatado,
                    element.vagas
                  ));
                });

              }
              if(this.users){

                let matchUsuario = false;
                this.users.forEach((usuario:userModel) => {
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
                  this.usuarioForm.reset();
                  this.usuarioForm.get('nomeControl')?.enable();
                }

              }

            },
            responseError => {

            console.log(
                'Erro ao tentar recuperar usuarios!',
                responseError.status !== 500 ? responseError?.error?.message : '',
              );
            }
        );

      }
  }

}
