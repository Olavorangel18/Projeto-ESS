
import { CandidatoVagaComponent } from './candidato-vaga/candidato-vaga.component';
import { CriacaoVagaComponent } from './criacao-vaga/criacao-vaga.component';
import { ListagemVagasEmpresasComponent } from './listagem-vagas-empresas/listagem-vagas-empresas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgenciaEmpregoService } from '../services/agencia-emprego.service';
import { BrokerBackendService } from '../shared/services/broker-backend.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { IgxSwitchModule } from 'igniteui-angular';
import { IgxSelectModule } from 'igniteui-angular';
import { IgxInputGroupModule } from "igniteui-angular";
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { IgxDialogModule } from 'igniteui-angular';
import { PessoaModule } from '../pessoa/pessoa.module';



@NgModule({
  declarations: [
    CandidatoVagaComponent,
    CriacaoVagaComponent,
    ListagemVagasEmpresasComponent
  ],
  imports: [
    CommonModule,
    IgxInputGroupModule,
    IgxSelectModule,
    IgxSwitchModule,
    NgxMaskModule,
    IgxDialogModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    PessoaModule
  ],
  providers: [
    BrokerBackendService,
    AgenciaEmpregoService
  ],
})
export class EmpresaModule { }
