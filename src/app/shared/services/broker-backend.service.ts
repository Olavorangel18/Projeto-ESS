import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrokerBackendService {

  constructor(private http: HttpClient) { }

  connectInBackend(backendPath: string, verb: string, body: any, headers: HttpHeaders, params?: any, apiBaseUrlId?: string): Observable<any> {

    const completeUrl = this.getUrlRequisicaoCompleta(backendPath, apiBaseUrlId);

    switch (verb) {
      case 'GET':
        return this.http
            .get(completeUrl, { headers: headers, params: params })
            .pipe(map(
              response => {
                return response;
              }
            ));
      case 'POST':
        return this.http
            .post(completeUrl, body, { headers: headers, params: params })
            .pipe(map(
              response => {
                return response;
              }
            ));
      case 'PUT':
        return this.http
            .put(completeUrl, body, { headers: headers, params: params })
            .pipe(map(
              response => {
                return response;
              }
            ));
      case 'DELETE':
        return this.http
            .delete(completeUrl, { headers: headers, params: params, body: body })
            .pipe(map(
              response => {
                return response;
              }
            ));
      default: // o default será get
        return this.http
            .get(completeUrl, { headers: headers, params: params })
            .pipe(map(
              response => {
                return response;
              }
            ));
    }

  }

  getUrlRequisicaoCompleta(backendPath: string, apiBaseUrlId?: string): string {

    return environment.apiBaseUrl + backendPath;

  }
}
