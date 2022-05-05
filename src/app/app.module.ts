import { NotificacaoComponent } from './shared/notificacao/notificacao.component';
import { AgenciaEmpregoService } from './services/agencia-emprego.service';
import { BrokerBackendService } from './shared/services/broker-backend.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMainComponentComponent } from './shared/pages/app-main-component/app-main-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxSwitchModule } from 'igniteui-angular';
import { IgxSelectModule } from 'igniteui-angular';
import { IgxInputGroupModule } from "igniteui-angular";
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { SharedModule } from './shared/shared.module';
import { EmpresaModule } from './empresa/empresa.module';
import { HttpClientModule } from '@angular/common/http';
import { IgxDialogModule } from 'igniteui-angular';
import { PessoaModule } from './pessoa/pessoa.module';
import { LoginComponent } from './shared/login/login.component';
import { MeuCadastroComponent } from './shared/meu-cadastro/meu-cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponentComponent,
    LoginComponent,
    MeuCadastroComponent,
    NotificacaoComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    IgxSelectModule,
    IgxInputGroupModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    SharedModule,
    EmpresaModule,
    IgxDialogModule,
    PessoaModule
  ],
  providers: [
    BrokerBackendService,
    AgenciaEmpregoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
