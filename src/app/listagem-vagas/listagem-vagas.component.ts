import { userModel } from './../login/model/user.model';
import { vagaModel } from './../criacao-vaga/models/vaga.models';
import { userLogadoModel } from './../login/model/userLogado.model';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AgenciaEmpregoService } from '../services/agencia-emprego.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-listagem-vagas',
  templateUrl: './listagem-vagas.component.html',
  styleUrls: ['./listagem-vagas.component.scss']
})
export class ListagemVagasComponent implements OnInit {

  tipoUsuario: userLogadoModel|undefined

  //Usado para renderizar as listas no html
  listaVagas: vagaModel[] = []

  formObjectUsuario:userModel | undefined;
  formObjectVaga:vagaModel | undefined;

   // controles do formulario
   filtroForm: FormGroup = new FormGroup({
    salarioControl:new FormControl('',[Validators.required]),
  });


  constructor(private router:Router, private service: AgenciaEmpregoService,) { }

  ngOnInit(): void {
    this.pegarTipoUsuario();
    this.listarVagas();
  }

  //********************************************************
  //                     Filtro
  //********************************************************

  pintarInputModalidade(e:any){
    let modalidade = document.querySelector('.modalidade-filtro')
    modalidade?.querySelector(".ativo")?.classList.remove('ativo')
    e.currentTarget.classList.add("ativo")
  }

  pintarInputExperiencia(e:any){
    let experiencia = document.querySelector('.experiencia-filtro')
    experiencia?.querySelector(".ativo")?.classList.remove('ativo')
    e.currentTarget.classList.add("ativo")
  }

  limparFiltro(){
    document.querySelectorAll('.ativo').forEach(element => {
      element.classList.remove('ativo')
    })
    this.filtroForm.get('salarioControl')!.setValue('')
  }

  aplicarFiltro(){
    let vagaFiltro:vagaFiltroModel;
    let inputs = document.querySelectorAll('.ativo')
    vagaFiltro = new vagaFiltroModel(
      inputs[0]?.innerHTML,
      String(this.filtroForm.get('salarioControl')!.value) ? String(this.filtroForm.get('salarioControl')!.value) : undefined ,
      inputs[1]?.innerHTML
    )
      this.limparFiltro()
      this.getVagasPorFiltro(vagaFiltro)
  }

  getVagasPorFiltro(vagaFiltro:vagaFiltroModel){

    this.listaVagas = [];

    this.service.getVagasByFiltro(vagaFiltro)
        .subscribe(
            response => {

              if (response) {
                console.log(response)
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



  //********************************************************
  //                  Autenticação
  //********************************************************

  pegarTipoUsuario(){
    if(sessionStorage.getItem('usuarioLogado')){
      let usuarioLogado = String(sessionStorage.getItem('usuarioLogado'))
      this.tipoUsuario = JSON.parse(usuarioLogado)
    }
  }

  //********************************************************
  //            Descandidatar/Candidatar vaga
  //********************************************************

  mudarSituacaoInscricao(e:any){
    let vagaID = e.switch.id
    let usuarioLogado:userLogadoModel = JSON.parse(String(sessionStorage.getItem('usuarioLogado')))
    let isCadastrado:boolean | undefined;
    let userID = usuarioLogado.id
    let delay:number = 100;

     if(e.checked && userID){
      this.pegarVagaPorID(vagaID)
      this.pegarUsuarioPorID(String(userID))
      let esperandoDadosCarregamento = () => {
        if(delay < 2000){
          setTimeout(() => {
            if(this.formObjectVaga && this.formObjectUsuario){

              this.formObjectVaga.cadastrado = true

              if(this.formObjectUsuario.cadastroPessoa){
                this.formObjectUsuario.vagas.push(this.formObjectVaga.id)
                this.formObjectVaga.pessoas.push(this.formObjectUsuario.id)
                isCadastrado = true
              }

              else{
                alert('Usuario não completou cadastro')
                this.router.navigate(["/agencia-emprego"])
              }

              if(isCadastrado){
                this.atualizarUsuario(this.formObjectUsuario)
                this.atualizarVaga(this.formObjectVaga)
                this.pintarLabelCandidato(vagaID)
              }
            }
            else{
              delay += 200
              esperandoDadosCarregamento()
            }
          },delay)
        }
      }

      esperandoDadosCarregamento()


     }else if (userID && e.checked==false){
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
            }
            else{
              delay += 200
              esperandoDadosCarregamento()
            }
          },delay)

        }

      }
      esperandoDadosCarregamento()
      this.retirarPituraLabel(vagaID)
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
  //              Criação/Listagem de vagas
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
              alert("Atualização da vaga feita com sucesso")
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
              alert("Atualização do usuario feito com sucesso")
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

export class vagaFiltroModel {
  modalidade:string | undefined
  salario:string|undefined
  senioridade:string|undefined

  constructor(modalidade:string | undefined, salario:string | undefined, senioridade:string | undefined){
    this.modalidade = modalidade
    this.salario = salario
    this.senioridade = senioridade
  }
}
