import { userModel } from 'src/app/shared/login/model/user.model';
import { vagaModel } from 'src/app/empresa/criacao-vaga/models/vaga.models';
import { userLogadoModel } from 'src/app/shared/login/model/userLogado.model';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AgenciaEmpregoService } from '../../services/agencia-emprego.service';

@Component({
  selector: 'app-listagem-vaga-selecionados',
  templateUrl: './listagem-vaga-selecionados.component.html',
  styleUrls: ['./listagem-vaga-selecionados.component.scss']
})
export class ListagemVagaSelecionadosComponent implements OnInit {

  constructor(private router:Router,private service: AgenciaEmpregoService) { }

  tipoUsuario: userLogadoModel|undefined;
  listaVagas: vagaModel[] = []

  formObjectUsuario:userModel | undefined;
  formObjectVaga:vagaModel | undefined;

  ngOnInit(): void {
    this.pegarTipoUsuario();
    this.redirecionamentoUsuarioTipoErrado();
    this.listarVagas();
  }


  //********************************************************
  //                Descandidatar vaga
  //********************************************************

  mudarSituacaoInscricao(e:any){
    let vagaID = e.switch.id
    let userID:string | undefined = ""
    let usuarioLogado:userLogadoModel = JSON.parse(String(sessionStorage.getItem('usuarioLogado')))
    userID = usuarioLogado.id
    let delay:number = 100;

    if(!e.checked && userID){

      this.pegarVagaPorID(vagaID)
      this.pegarUsuarioPorID(userID)

      let esperandoDadosCarregamento = () => {
        if(delay < 2000){
          setTimeout(() => {
            if(this.formObjectVaga && this.formObjectUsuario){

              this.formObjectVaga.cadastrado = false

              let indexUsuario:number = -1

              this.formObjectUsuario?.vagas.forEach((vaga, index:number) => {
                if(vaga == vagaID){
                  indexUsuario = index
                }
              })

              if(indexUsuario > -1){
                this.formObjectUsuario?.vagas.splice(indexUsuario,1)
              }

              let indexVaga:number = -1

              this.formObjectVaga?.pessoas.forEach((pessoa, index:number) => {
                if(pessoa == this.tipoUsuario?.id){
                  indexVaga = index
                }

                if(indexVaga > -1){
                  this.formObjectVaga?.pessoas.splice(indexVaga,1)
                }
              })

              this.atualizarVaga(this.formObjectVaga)
              this.atualizarUsuario(this.formObjectUsuario)
              this.listarVagas()

            }
            else{
              delay += 200
              esperandoDadosCarregamento()
            }
          },delay)

        }

      }
      esperandoDadosCarregamento()
     }
  }


  pintarLabelCandidato(vagaID:string){
   let label = document.getElementsByClassName(vagaID)
   label[0].classList.add('candidatado')
   label[0].innerHTML="candidatado"
  }

  retirarPituraLabel(vagaID:string){
  let label = document.getElementsByClassName(vagaID)
   label[0].classList.remove('candidatado')
   label[0].id = "";
   label[0].innerHTML="não candidatado"
  }

  verSwitchLabel(vaga:vagaModel){
    return vaga.pessoas.find(pessoa => pessoa == this.tipoUsuario?.id) ? true : false
  }

  //********************************************************
  //                   Autenticação
  //********************************************************

  pegarTipoUsuario(){
    if(sessionStorage.getItem('usuarioLogado')){
      let usuarioLogado = String(sessionStorage.getItem('usuarioLogado'))
      this.tipoUsuario = JSON.parse(usuarioLogado)
    }
  }

  redirecionamentoUsuarioTipoErrado(){
    if(this.tipoUsuario!.tipo=="empresa"){
      alert('Operação invalida')
      this.router.navigate(['/agencia-emprego'])
    }
  }

  //********************************************************
  //              Criar/Listagem de vagas
  //********************************************************

  criarVaga(){
    this.router.navigate(['agencia-emprego/criar-vaga'])
  }

  listarVagas(){

    this.listaVagas = [];

    this.service.getVagas()
        .subscribe(
            response => {

              if (response) {

                response.forEach((element: any) => {
                  this.listaVagas.push(new vagaModel(
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
            },
            responseError => {
              console.log(
                'Erro ao tentar recuperar vagas!',
                responseError.status !== 500 ? responseError?.error?.message : '',
              );
            }
        );
  }

  atualizarVaga(vagaParaAtualizar: vagaModel | undefined){
    if(vagaParaAtualizar)
    this.service.atualizarVaga(vagaParaAtualizar)
        .subscribe(
            response => {
              console.log(response)
            },
            responseError => {
              console.log(
                'Erro ao tentar atualizar a vaga!',
                responseError.status !== 500 ? responseError?.error?.message : '',
              );
            }
        );
  }

  atualizarUsuario(usuarioParaAtualizar: userModel | undefined){
    if(usuarioParaAtualizar)
    this.service.atualizarUsuario(usuarioParaAtualizar)
        .subscribe(
            response => {
              console.log(response)
            },
            responseError => {
              console.log(
                'Erro ao tentar atualizar o usuario!',
                responseError.status !== 500 ? responseError?.error?.message : '',
              );
            }
        );
  }

  pegarUsuarioPorID(id:string){

    this.service.getUsuarioById(id)
    .subscribe(
        response => {

          if (response) {
            this.formObjectUsuario = new userModel(
              response.id,
              response.tipo,
              response.nome,
              response.email,
              response.password,
              response.cadastroPessoa,
              response.cadastroEmpresa,
              response.candidatado,
              response.vagas
            );

          }
        },
        responseError => {
          console.log(
            'Erro ao tentar recuperar o usuario!',
            responseError.status !== 500 ? responseError?.error?.message : '',
          );
        }
    );
  }

  pegarVagaPorID(id:string){

    this.service.getVagaById(id)
    .subscribe(
        response => {

          if (response) {
            this.formObjectVaga = new vagaModel(
              response.id,
              response.nome,
              response.modalidade,
              response.salario,
              response.area,
              response.descricao,
              response.senioridade,
              response.idEmpresa,
              response.pessoas,
              response.cadastrado
            );

          }
        },
        responseError => {
          console.log(
            'Erro ao tentar recuperar a vaga!',
            responseError.status !== 500 ? responseError?.error?.message : '',
          );
        }
    );
  }

}
