import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API } from './app.api';

@Injectable()
export class AppService {

  municipiosLocal: any;
  ufsLocal: any;

  constructor(
    private http: HttpClient
  ) {
      this.http.get(`${API.ROTAS_API}municipiosLocal`)
      .subscribe( res => this.municipiosLocal = res );
      
      this.http.get(`${API.ROTAS_API}ufs`)
      .subscribe( res => this.ufsLocal = res );
    }

  getUfsIQS() {
    return this.http.get(`${API.ROTAS_API}instituicaoSaude/estados`);
  }

  getMunicipiosIQS() {
     return this.http.get(`${API.ROTAS_API}instituicaoSaude/municipios`);
  }


  getUfsLocal() {
    return this.ufsLocal;
  }

  getMunicipiosLocal(uf) {
    return this.municipiosLocal.filter(e => e.uf === uf);
  }


}
