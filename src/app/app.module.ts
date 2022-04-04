import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeuCadastroComponent } from './meu-cadastro/meu-cadastro.component';
import { ListagemVagasComponent } from './listagem-vagas/listagem-vagas.component';
import { ListagemVagasEmpresasComponent } from './listagem-vagas-empresas/listagem-vagas-empresas.component';
import { NotificacaoComponent } from './notificacao/notificacao.component';
import { CandidatoVagaComponent } from './candidato-vaga/candidato-vaga.component';
import { LoginComponent } from './login/login.component';
import { AppMainComponentComponent } from './shared/pages/app-main-component/app-main-component.component';

@NgModule({
  declarations: [
    AppComponent,
    MeuCadastroComponent,
    ListagemVagasComponent,
    ListagemVagasEmpresasComponent,
    NotificacaoComponent,
    CandidatoVagaComponent,
    LoginComponent,
    AppMainComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
