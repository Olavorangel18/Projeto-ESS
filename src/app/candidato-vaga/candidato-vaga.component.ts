import { AgenciaEmpregoService } from './../services/agencia-emprego.service';
import { userLogadoModel } from './../login/model/userLogado.model';
import { vagaModel } from './../criacao-vaga/models/vaga.models';
import { userModel } from './../login/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidato-vaga',
  templateUrl: './candidato-vaga.component.html',
  styleUrls: ['./candidato-vaga.component.css']
})
export class CandidatoVagaComponent implements OnInit {

  vagaID:string = ""
  pessoasVaga:userModel[]= []
  tipoUsuario:userLogadoModel|undefined;
  vaga:vagaModel | undefined;

  constructor(private activatedRoute: ActivatedRoute, private router:Router, private service:AgenciaEmpregoService) {
  this.vagaID = this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.pegarTipoUsuario();
    this.redirecionamentoUsuarioTipoErrado();
    this.recuperarPessoasByVagaID();
  }

  //********************************************************
  //                   Autenticação
  //********************************************************

  pegarTipoUsuario(){
    let usuarioLogado = String(sessionStorage.getItem('usuarioLogado'))
    this.tipoUsuario = JSON.parse(usuarioLogado)
  }

  redirecionamentoUsuarioTipoErrado(){
    if(this.tipoUsuario!.tipo=="pessoa"){
      alert('Operação invalida')
      this.router.navigate(['/agencia-emprego'])
    }
  }

  //********************************************************
  //                Listagem das pessoas
  //********************************************************

  recuperarPessoasByVagaID(){

    this.service.getVagaById(this.vagaID)
        .subscribe(
            response => {

              if (response) {
                this.vaga = response
                this.vaga?.pessoas.forEach((pessoaID) =>{
                  this.service.getUsuarioById(pessoaID)
                  .subscribe(
                      response => {

                        if (response) {
                          this.pessoasVaga.push(new userModel(
                            response.id,
                            response.tipo,
                            response.nome,
                            response.email,
                            response.password,
                            response.cadastroPessoa,
                            response.cadastroEmpresa,
                            response.candidatado,
                            response.vagas
                          ));

                        }
                      },
                      responseError => {
                        console.log(
                          'Erro ao tentar recuperar o usuario!',
                          responseError.status !== 500 ? responseError?.error?.message : '',
                        );
                      }
                  );
                })
              }

            },
            responseError => {
              console.log(
                'Erro ao tentar recuperar vagas!',
                responseError.status !== 500 ? responseError?.error?.message : '',
              );
            }
        );


  }


}
