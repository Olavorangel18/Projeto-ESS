import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeuCadastroComponent } from './meu-cadastro/meu-cadastro.component';
import { ListagemVagasComponent } from './listagem-vagas/listagem-vagas.component';
import { ListagemVagasEmpresasComponent } from './listagem-vagas-empresas/listagem-vagas-empresas.component';
import { NotificacaoComponent } from './notificacao/notificacao.component';
import { CandidatoVagaComponent } from './candidato-vaga/candidato-vaga.component';
import { LoginComponent } from './login/login.component';
import { AppMainComponentComponent } from './shared/pages/app-main-component/app-main-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxSwitchModule } from 'igniteui-angular';
import { CriacaoVagaComponent } from './criacao-vaga/criacao-vaga.component';
import { ListagemVagaSelecionadosComponent } from './listagem-vaga-selecionados/listagem-vaga-selecionados.component';
import { IgxSelectModule } from 'igniteui-angular';
import { IgxInputGroupModule } from "igniteui-angular";

@NgModule({
  declarations: [
    AppComponent,
    MeuCadastroComponent,
    ListagemVagasComponent,
    ListagemVagasEmpresasComponent,
    NotificacaoComponent,
    CandidatoVagaComponent,
    LoginComponent,
    AppMainComponentComponent,
    CriacaoVagaComponent,
    ListagemVagaSelecionadosComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    IgxSelectModule,
    IgxInputGroupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
