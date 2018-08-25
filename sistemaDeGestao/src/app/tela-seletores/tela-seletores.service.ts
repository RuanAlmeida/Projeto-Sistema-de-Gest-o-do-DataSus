import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { SeletoresIQS, SeletoresIRS, SeletoresLocal } from '../tela-seletores/model/index';
import { ROTAS_API } from '../app.api';


@Injectable()
export class TelaSeletoresService {

  private headers: Headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }


  /*
 * Protocolo HTTP do SELECIONAR LOCAIS
 */


  /*
  * Protocolo HTTP do selecione locais para trazer do banco
  */
  getSelecioneEstado() {
    return this.http
      .get(`${ROTAS_API}instituicaoSaude/estados`);
  }

  /*
  * Protocolo HTTP do selecione locais para trazer do banco
  */
  getSelecioneMunicipios() {
    return this.http
      .get<SeletoresLocal>(`${ROTAS_API}instituicaoSaude/municipios`);
  }

  //   /*
  //   * Protocolo HTTP do selecione locais para trazer do banco
  //   */
  getSelecioneBairro() {
    return this.http
      .get(`${ROTAS_API}instituicaoSaude/bairros`);
  }


  /*
  * Protocolo HTTP do selecione locais para trazer do banco
  */
  getSelecioneTipoInt() {
    return this.http
      .get(`${ROTAS_API}instituicaoSaude/tipoInstituicao`)
  }

  /*
  * Protocolo HTTP do selecione locais para trazer do banco
  */

  getSelecioneInt() {
    return this.http
      .get<SeletoresLocal>(`${ROTAS_API}instituicaoSaude/instituicao`);
  }

  getPersAvas() {
    return this.http
      .get(`${ROTAS_API}perspectivaAvaliativa`);
  }

  getAbranVis() {
    return this.http
      .get(`${ROTAS_API}abrangenciaVisoes`);
  }

  getDimAns() {
    return this.http
      .get(`${ROTAS_API}dimenssaoAnalitica`);
  }




  /*
  //   * Protocolo HTTP passando ufId para retornar todas instituições da mesma 
  //   */
  getAtualizaUf(ufId) {
    return this.http
      .get<SeletoresLocal>(`${ROTAS_API}instituicaoSaude/estadosAtualizados/${ufId}`)
  }

  //   * Protocolo HTTP passando municipioId para retornar todas instituições da mesma 
  getAtualizaMunicipio(municipioId) {
    return this.http
      .get<SeletoresLocal>(`${ROTAS_API}instituicaoSaude/municipiosAtualizados/${municipioId}`);
  }

  //   * Protocolo HTTP passando tipoId da idMunicipio para retornar todas instituições da mesma 
  getAtualizaTipo(tipoId, idMunicipio) {
    if (idMunicipio) {
      return this.http
        .get<SeletoresLocal>(`${ROTAS_API}instituicaoSaude/tipoInstituicaoAtualizada/${tipoId}/${idMunicipio}`);
    } else {
      return this.http
        .get<SeletoresLocal>(`${ROTAS_API}instituicaoSaude/tipoInstituicaoAtualizada/${tipoId}`);
    }
  }

  //   * Protocolo HTTP passando instituicaoId  para retornar todas instituições da mesma 
  getAtualizaInstituicao(instituicaoId) {
    return this.http
      .get<SeletoresLocal>(`${ROTAS_API}instituicaoSaude/instituicaoAtualizada/${instituicaoId}`);
  }
  //   * Protocolo HTTP passando instituicaoId  para retornar todas instituições da mesma 
  getAtualizaBairro(bairroIds) {
    let nullo = '(null)'
    return this.http
      .get<SeletoresLocal>(`${ROTAS_API}instituicaoSaude/bairroAtualizado/${bairroIds.id_uf || nullo}/${bairroIds.id_municipio || nullo}/${bairroIds.no_bairro || nullo}/${bairroIds.id_tipo_unidade || nullo}/${bairroIds.id_unidade || nullo}`);
  }

}
