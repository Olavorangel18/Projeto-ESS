import { Injectable } from '@angular/core';
import { BrokerBackendService } from '../shared/services/broker-backend.service';
import { Observable } from 'rxjs';
import { userModel } from '../login/model/user.model';
import { HttpHeaders } from "@angular/common/http";
import { vagaModel } from '../criacao-vaga/models/vaga.models';

@Injectable({
  providedIn: 'root'
})
export class AgenciaEmpregoService {

  endpointUsuario: string = '/user';
  endpointVaga: string = '/vaga';

  constructor(
    private brokerBackend: BrokerBackendService,
  ) { }


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


