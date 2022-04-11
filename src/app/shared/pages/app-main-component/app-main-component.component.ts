import { ListagemVagasComponent } from './../../../listagem-vagas/listagem-vagas.component';
import { MeuCadastroComponent } from 'src/app/meu-cadastro/meu-cadastro.component';
import { NotificacaoComponent } from 'src/app/notificacao/notificacao.component';
import { userLogadoModel } from './../../../login/model/userLogado.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router} from '@angular/router';

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

  //********************************************************
  //                 Inicialização Menu
  //********************************************************

  onActivate(e:any){

    if(e instanceof ListagemVagasComponent) this.ativarListagem()
    else if(e instanceof MeuCadastroComponent) this.ativarMeusDados()
    else if(e instanceof NotificacaoComponent) this.ativarNotificacao()
    else this.ativarListagemSelecionada()

  }

  pintarMenu(e:any){

    if(e.currentTarget.id == "usuario") this.ativarMeusDados()
    else if(e.currentTarget.id == "listagem") this.ativarListagem()
    else if(e.currentTarget.id == "listagem-selecionado") this.ativarListagemSelecionada()
    else if (e.currentTarget.id == "notificacao") this.ativarNotificacao()

  }

  //********************************************************
  //           Manipulação controladores menu
  //********************************************************

  ativarMeusDados(){

    this.backgroundMenuUser = "background-branco";
    this.strokeUser="#41B8D2";

    this.backgroundMenuListagem = "background-azul";
    this.strokeListagem = "white";

    this.backgroundMenuListagemSelecionado = "background-azul";
    this.strokeListagemSelecionado = "white";

    this.backgroundMenuNotificacao = "background-azul";
    this.strokeNotificacao = "white";

  }

  ativarListagem(){

    this.backgroundMenuUser = "background-azul";
    this.strokeUser="white";

    this.backgroundMenuListagem = "background-branco";
    this.strokeListagem = "#41B8D2";

    this.backgroundMenuListagemSelecionado = "background-azul";
    this.strokeListagemSelecionado = "white";

    this.backgroundMenuNotificacao = "background-azul";
    this.strokeNotificacao = "white";
  }

  ativarListagemSelecionada(){

    this.backgroundMenuUser = "background-azul";
    this.strokeUser="white";

    this.backgroundMenuListagem = "background-azul";
    this.strokeListagem = "white";

    this.backgroundMenuListagemSelecionado = "background-branco";
    this.strokeListagemSelecionado = "#41B8D2";

    this.backgroundMenuNotificacao = "background-azul";
    this.strokeNotificacao = "white";

  }

  ativarNotificacao(){

    this.backgroundMenuUser = "background-azul";
    this.strokeUser="white";

    this.backgroundMenuListagem = "background-azul";
    this.strokeListagem = "white";

    this.backgroundMenuListagemSelecionado = "background-azul";
    this.strokeListagemSelecionado = "white";

    this.backgroundMenuNotificacao = "background-branco";
    this.strokeNotificacao ="#41B8D2";

  }

  //********************************************************
  //                 Login/Autenticação
  //********************************************************

  verificarExistenciaUsuarioLogado(){

    if(!sessionStorage.getItem('usuarioLogado')){
      alert('Procedimento invalido')
      this.router.navigate(['/'])
    }

  }

  goToListagem(){

    if(this.tipoUsuario?.tipo =="pessoa") this.router.navigate(["agencia-emprego/selecionados"])
    else this.router.navigate(["agencia-emprego/vagas-empresa"])

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
