import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemVagaSelecionadosComponent } from './listagem-vaga-selecionados/listagem-vaga-selecionados.component';
import { ListagemVagasComponent } from './listagem-vagas/listagem-vagas.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IgxSwitchModule } from 'igniteui-angular';
import { IgxSelectModule } from 'igniteui-angular';
import { IgxInputGroupModule } from "igniteui-angular";
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { SharedModule } from '../shared/shared.module';
import { EmpresaModule } from '../empresa/empresa.module';
import { HttpClientModule } from '@angular/common/http';
import { IgxDialogModule } from 'igniteui-angular';


@NgModule({
  declarations: [
    ListagemVagaSelecionadosComponent,
    ListagemVagasComponent
  ],
  imports: [
    CommonModule,
    IgxInputGroupModule,
    IgxSelectModule,
    IgxSwitchModule,
    IgxDialogModule,
    BrowserModule,
    IgxSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    IgxSelectModule,
    IgxInputGroupModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    SharedModule,
    IgxDialogModule
  ],
})
export class PessoaModule { }
