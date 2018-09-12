import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './app.api';

@Injectable()
export class AppService {

  municipiosIQS: any;
  ufsIQS: any;

  municipiosLocal: any;
  ufsLocal: any;

  constructor(
    private http: HttpClient
  ) {
    this.http.get(`${API.ROTAS_API}instituicaoSaude/municipios`)
    .subscribe(
      res => this.municipiosIQS = res
    );
    this.http.get(`${API.ROTAS_API}instituicaoSaude/estados`)
    .subscribe(
      res => {
        this.ufsIQS = res;
      }
    );
    this.http.get(`${API.ROTAS_API}municipiosLocal`)
    .subscribe(
      res => this.municipiosLocal = res
    );
    this.http.get(`${API.ROTAS_API}ufs`)
    .subscribe(
      res => {
        this.ufsLocal = res;
      }
    );
  }

  getUfsIQS() {
    return this.ufsIQS;
  }

  getMunicipiosIQS(codUf) {
    return this.municipiosIQS.filter(e => e.id_uf === codUf);
  }


  getUfsLocal() {
    return this.ufsLocal;
  }

  getMunicipiosLocal(uf) {
    return this.municipiosLocal.filter(e => e.uf === uf);
  }


}
