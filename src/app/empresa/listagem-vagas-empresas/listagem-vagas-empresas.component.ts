import { vagaModel } from '../criacao-vaga/models/vaga.models';
import { Component, OnInit } from '@angular/core';
import { userLogadoModel } from 'src/app/shared/login/model/userLogado.model';
import { Router } from '@angular/router';
import { AgenciaEmpregoService } from '../../services/agencia-emprego.service';

@Component({
  selector: 'app-listagem-vagas-empresas',
  templateUrl: './listagem-vagas-empresas.component.html',
  styleUrls: ['./listagem-vagas-empresas.component.css']
})
export class ListagemVagasEmpresasComponent implements OnInit {

  tipoUsuario: userLogadoModel|undefined;
  vagas:vagaModel[] = []

  constructor(private router:Router,private service: AgenciaEmpregoService) {

   }

  ngOnInit(): void {
    this.pegarTipoUsuario();
    this.redirecionamentoUsuarioTipoErrado();
    this.recuperarVagaPelaEmpresa();
  }

  //********************************************************
  //                    Autenticação
  //********************************************************

  pegarTipoUsuario(){
    if(sessionStorage.getItem('usuarioLogado')){
      let usuarioLogado = String(sessionStorage.getItem('usuarioLogado'))
      this.tipoUsuario = JSON.parse(usuarioLogado)
    }
  }

  redirecionamentoUsuarioTipoErrado(){
    if(this.tipoUsuario!.tipo=="pessoa"){
      alert('Operação invalida')
      this.router.navigate(['/agencia-emprego'])
    }
  }

  //********************************************************
  //              Listagem de vagas por empresa
  //********************************************************

  recuperarVagaPelaEmpresa(){
    this.vagas = []
    let vagas:vagaModel[] = []

    this.service.getVagas()
        .subscribe(
            response => {

              if (response) {

                response.forEach((element: any) => {
                  vagas.push(new vagaModel(
                    element.id,
                    element.nome,
                    element.modalidade,
                    element.salario,
                    element.area,
                    element.descricao,
                    element.senioridade,
                    element.idEmpresa,
                    element.pessoas,
                    element.cadastrado
                  ));
                });
              }
              vagas.forEach((vaga:vagaModel) =>{
                if(vaga.idEmpresa == this.tipoUsuario?.id){
                  this.vagas.push(vaga)
                }
              })
            },
            responseError => {
              console.log(
                'Erro ao tentar recuperar vagas!',
                responseError.status !== 500 ? responseError?.error?.message : '',
              );
            }
        );
    }


  //********************************************************
  //                    Roteamento
  //********************************************************

  criarVaga(){
    this.router.navigate(['agencia-emprego/criar-vaga'])
  }

  irParaListagemPessoas(e:any){
    this.router.navigate([`agencia-emprego/vagas-empresa/candidatos`, e.currentTarget.id])
  }

}
