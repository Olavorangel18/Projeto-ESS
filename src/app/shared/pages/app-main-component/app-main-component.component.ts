import { ListagemVagasComponent } from './../../../listagem-vagas/listagem-vagas.component';
import { MeuCadastroComponent } from 'src/app/meu-cadastro/meu-cadastro.component';
import { ListagemVagaSelecionadosComponent } from 'src/app/listagem-vaga-selecionados/listagem-vaga-selecionados.component';
import { ListagemVagasEmpresasComponent } from 'src/app/listagem-vagas-empresas/listagem-vagas-empresas.component';
import { NotificacaoComponent } from 'src/app/notificacao/notificacao.component';
import { userLogadoModel } from './../../../login/model/userLogado.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router} from '@angular/router';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-app-main-component',
  templateUrl: './app-main-component.component.html',
  styleUrls: ['./app-main-component.component.css']
})
export class AppMainComponentComponent implements OnInit {

  constructor(private router: Router) { }


  tipoUsuario: userLogadoModel|undefined;
  @Output() listaSelecionadosEmitter: EventEmitter<any> = new EventEmitter();
  listagemButtonClicked:boolean = false;

  //Controladores menu

  backgroundMenuUser:string= "background-azul"
  strokeUser:string = "white"

  backgroundMenuListagem:string = "background-azul"
  strokeListagem:string = "white"

  backgroundMenuListagemSelecionado:string = "background-azul"
  strokeListagemSelecionado:string = "white"

  backgroundMenuNotificacao:string = "background-azul"
  strokeNotificacao:string = "white"


  ngOnInit(): void {
    this.pegarTipoUsuario();
    this.verificarExistenciaUsuarioLogado();
  }

  onActivate(e:any){
    if(e instanceof ListagemVagasComponent){
      this.backgroundMenuListagem = "background-branco";
      this.strokeListagem = "#41B8D2";
    }
    else if(e instanceof MeuCadastroComponent){
      this.backgroundMenuUser = "background-branco";
      this.strokeUser="#41B8D2";
    }
    else if(e instanceof ListagemVagaSelecionadosComponent || ListagemVagasEmpresasComponent){
      this.backgroundMenuListagemSelecionado = "background-branco";
      this.strokeListagemSelecionado = "#41B8D2";
    }
    else if(e instanceof NotificacaoComponent){
      this.backgroundMenuNotificacao = "background-branco";
      this.strokeNotificacao ="#41B8D2";
    }
  }

  pintarMenu(e:any){
    if(e.currentTarget.id == "usuario"){

      this.backgroundMenuUser = "background-branco";
      this.strokeUser="#41B8D2";

      this.backgroundMenuListagem = "background-azul";
      this.strokeListagem = "white";

      this.backgroundMenuListagemSelecionado = "background-azul";
      this.strokeListagemSelecionado = "white";

      this.backgroundMenuNotificacao = "background-azul";
      this.strokeNotificacao = "white";
    }
    else if(e.currentTarget.id == "listagem"){

      this.backgroundMenuUser = "background-azul";
      this.strokeUser="white";

      this.backgroundMenuListagem = "background-branco";
      this.strokeListagem = "#41B8D2";

      this.backgroundMenuListagemSelecionado = "background-azul";
      this.strokeListagemSelecionado = "white";

      this.backgroundMenuNotificacao = "background-azul";
      this.strokeNotificacao = "white";

    }
    else if(e.currentTarget.id == "listagem-selecionado"){

      this.backgroundMenuUser = "background-azul";
      this.strokeUser="white";

      this.backgroundMenuListagem = "background-azul";
      this.strokeListagem = "white";

      this.backgroundMenuListagemSelecionado = "background-branco";
      this.strokeListagemSelecionado = "#41B8D2";

      this.backgroundMenuNotificacao = "background-azul";
      this.strokeNotificacao = "white";

    }
    else if (e.currentTarget.id == "notificacao"){

      this.backgroundMenuUser = "background-azul";
      this.strokeUser="white";

      this.backgroundMenuListagem = "background-azul";
      this.strokeListagem = "white";

      this.backgroundMenuListagemSelecionado = "background-azul";
      this.strokeListagemSelecionado = "white";

      this.backgroundMenuNotificacao = "background-branco";
      this.strokeNotificacao ="#41B8D2";

    }
  }

  verificarExistenciaUsuarioLogado(){
    if(sessionStorage.getItem('usuarioLogado')){

    }else{
      alert('Procedimento invalido')
      this.router.navigate(['/'])
    }

  }

  goToListagem(){
    console.log(this.tipoUsuario?.tipo)
    if(this.tipoUsuario?.tipo =="pessoa"){
      this.router.navigate(["agencia-emprego/selecionados"])
    }
    else{
      this.router.navigate(["agencia-emprego/vagas-empresa"])
    }
  }

  deslogar(){
    sessionStorage.removeItem('usuarioLogado')
  }

  pegarTipoUsuario(){
    if(sessionStorage.getItem('usuarioLogado')){
      let usuarioLogado = String(sessionStorage.getItem('usuarioLogado'))
      this.tipoUsuario = JSON.parse(usuarioLogado)
    }
  }
}
