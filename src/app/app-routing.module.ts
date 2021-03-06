import { CriacaoVagaComponent } from './empresa/criacao-vaga/criacao-vaga.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainComponentComponent } from './shared/pages/app-main-component/app-main-component.component';
import { MeuCadastroComponent } from './shared/meu-cadastro/meu-cadastro.component';
import { ListagemVagasComponent } from './pessoa/listagem-vagas/listagem-vagas.component';
import { ListagemVagasEmpresasComponent } from './empresa/listagem-vagas-empresas/listagem-vagas-empresas.component';
import { NotificacaoComponent } from './shared/notificacao/notificacao.component';
import { CandidatoVagaComponent } from './empresa/candidato-vaga/candidato-vaga.component';
import { LoginComponent } from './shared/login/login.component';
import { ListagemVagaSelecionadosComponent } from './pessoa/listagem-vaga-selecionados/listagem-vaga-selecionados.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {
  path: 'agencia-emprego',component:AppMainComponentComponent,
  children:[
    {path:'', component:MeuCadastroComponent},
    {path:'vagas', component:ListagemVagasComponent},
    {path:'selecionados', component:ListagemVagaSelecionadosComponent},
    {path:'notificacao', component:NotificacaoComponent},
    {path:'criar-vaga', component:CriacaoVagaComponent},
    {
      path:'vagas-empresa',
      children:[
        {path:'', component:ListagemVagasEmpresasComponent},
        {path:'candidatos/:id', component:CandidatoVagaComponent}
      ]
    },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
