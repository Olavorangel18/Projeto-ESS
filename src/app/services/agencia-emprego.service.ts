import { notificacaoModel } from '../shared/notificacao/models/notificacao.models';
import { Injectable } from '@angular/core';
import { BrokerBackendService } from '../shared/services/broker-backend.service';
import { Observable, of } from 'rxjs';
import { userModel } from '../shared/login/model/user.model';
import { HttpHeaders } from "@angular/common/http";
import { vagaModel } from '../empresa/criacao-vaga/models/vaga.models';
import { vagaFiltroModel } from '../pessoa/listagem-vagas/listagem-vagas.component';

@Injectable({
  providedIn: 'root'
})
export class AgenciaEmpregoService {

  endpointUsuario: string = '/user';
  endpointVaga: string = '/vaga';
  endpointNotificacao:string = '/notificacao';

  constructor(
    private brokerBackend: BrokerBackendService,
  ) { }

  getNotificacao(): Observable<any> {
    return this.brokerBackend
        .connectInBackend(
          this.endpointNotificacao,
          'GET',
          undefined,
          this.getSimpleHeader(),
        );
  }

  getNotificacaoById(notificacaoId: string): Observable<any> {
    return this.brokerBackend
        .connectInBackend(
          `${this.endpointNotificacao}/${notificacaoId}`,
          'GET',
          undefined,
          this.getSimpleHeader()
        );
  }

  criarNotificacao(notificacaoParaCriar: notificacaoModel): Observable<any> {
    return this.brokerBackend
        .connectInBackend(
          this.endpointNotificacao,
          'POST',
          notificacaoParaCriar,
          this.getSimpleHeader()
        );
  }

  atualizarNotificacao(notificacaoParaAtualizar: notificacaoModel): Observable<any> {
    return this.brokerBackend
        .connectInBackend(
          `${this.endpointNotificacao}/${notificacaoParaAtualizar.id}`,
          'PUT',
          notificacaoParaAtualizar,
          this.getSimpleHeader(),
          undefined
        );
  }

  deletarNotificacao(notificacaoId: string): Observable<any> {
    return this.brokerBackend
        .connectInBackend(
          `${this.endpointNotificacao}/${notificacaoId}`,
          'DELETE',
          undefined,
          this.getSimpleHeader(),
          undefined
        );
  }


  getVagas(): Observable<any> {
    return this.brokerBackend
        .connectInBackend(
          this.endpointVaga,
          'GET',
          undefined,
          this.getSimpleHeader(),
        );
  }

  getVagaById(vagaId: string): Observable<any> {
    return this.brokerBackend
        .connectInBackend(
          `${this.endpointVaga}/${vagaId}`,
          'GET',
          undefined,
          this.getSimpleHeader()
        );
  }

  getVagasByFiltro(filtroVaga:vagaFiltroModel):Observable<any>{
    return this.brokerBackend
        .connectInBackend(
          `${this.endpointVaga}/filtro`,
          'POST',
          filtroVaga,
          this.getSimpleHeader()
        );
  }

  criarVaga(vagaParaCriar: vagaModel): Observable<any> {
    return this.brokerBackend
        .connectInBackend(
          this.endpointVaga,
          'POST',
          vagaParaCriar,
          this.getSimpleHeader()
        );
  }

  atualizarVaga(vagaParaAtualizar: vagaModel): Observable<any> {
    return this.brokerBackend
        .connectInBackend(
          `${this.endpointVaga}/${vagaParaAtualizar.id}`,
          'PUT',
          vagaParaAtualizar,
          this.getSimpleHeader(),
          undefined
        );
  }

  deletarVaga(vagaId: string): Observable<any> {
    return this.brokerBackend
        .connectInBackend(
          `${this.endpointUsuario}/${vagaId}`,
          'DELETE',
          undefined,
          this.getSimpleHeader(),
          undefined
        );
  }

  getUsuarios(): Observable<any> {
    return this.brokerBackend
        .connectInBackend(
          this.endpointUsuario,
          'GET',
          undefined,
          this.getSimpleHeader(),
        );
  }

  getUsuarioById(usuarioId: string): Observable<any> {
    return this.brokerBackend
        .connectInBackend(
          `${this.endpointUsuario}/${usuarioId}`,
          'GET',
          undefined,
          this.getSimpleHeader()
        );
  }

  criarUsuario(usuarioParaCriar: userModel): Observable<any> {
    return this.brokerBackend
        .connectInBackend(
          this.endpointUsuario,
          'POST',
          usuarioParaCriar,
          this.getSimpleHeader()
        );
  }

  atualizarUsuario(usuarioParaAtualizar: userModel): Observable<any> {
    return this.brokerBackend
        .connectInBackend(
          `${this.endpointUsuario}/${usuarioParaAtualizar.id}`,
          'PUT',
          usuarioParaAtualizar,
          this.getSimpleHeader(),
          undefined
        );
  }

  deletarUsuario(usuarioId: string): Observable<any> {
    return this.brokerBackend
        .connectInBackend(
          `${this.endpointUsuario}/${usuarioId}`,
          'DELETE',
          undefined,
          this.getSimpleHeader(),
          undefined
        );
  }

  getSimpleHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }


}


