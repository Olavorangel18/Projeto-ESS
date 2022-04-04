import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-main-component',
  templateUrl: './app-main-component.component.html',
  styleUrls: ['./app-main-component.component.css']
})
export class AppMainComponentComponent implements OnInit {

  constructor() { }

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
    this.inicializarMenu();
  }

  inicializarMenu(){
    this.backgroundMenuUser = "background-branco";
    this.strokeUser="#41B8D2"
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

}
