import { CriacaoVagaComponent } from './criacao-vaga/criacao-vaga.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainComponentComponent } from './shared/pages/app-main-component/app-main-component.component';
import { MeuCadastroComponent } from './meu-cadastro/meu-cadastro.component';
import { ListagemVagasComponent } from './listagem-vagas/listagem-vagas.component';
import { ListagemVagasEmpresasComponent } from './listagem-vagas-empresas/listagem-vagas-empresas.component';
import { NotificacaoComponent } from './notificacao/notificacao.component';
import { CandidatoVagaComponent } from './candidato-vaga/candidato-vaga.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {
  path: 'agencia-emprego',component:AppMainComponentComponent,
  children:[
    {path:'', component:MeuCadastroComponent},
    {path:'vagas', component:ListagemVagasComponent},
    {path:'notificacao', component:NotificacaoComponent},
    {path:'criar-vaga', component:CriacaoVagaComponent},
    {
      path:'vagas-empresa',
      children:[
        {path:'', component:ListagemVagasEmpresasComponent},
        {path:'candidato', component:CandidatoVagaComponent}
      ]
    },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
