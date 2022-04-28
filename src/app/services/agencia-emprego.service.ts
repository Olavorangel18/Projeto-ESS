import { Injectable } from '@angular/core';
import { BrokerBackendService } from '../shared/services/broker-backend.service';
import { Observable } from 'rxjs';
import { userModel } from '../login/model/user.model';
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AgenciaEmpregoService {

  endpointUsuario: string = '/user';
  endpointVaga: string = '/vaga';

  constructor(
    private brokerBackend: BrokerBackendService,
  ) { }


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

