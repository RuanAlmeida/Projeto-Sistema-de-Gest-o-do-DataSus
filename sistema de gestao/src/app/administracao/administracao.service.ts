import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ROTAS_API } from '../app.api';

@Injectable()
export class AdministracaoService {

  constructor(
    public http: HttpClient
  ) { }

  // requisições HTTP geréricas
  getMunicipios() {
    return this.http
      .get(`${ROTAS_API}municipios`);
  }

  // requisições HTTP Empresa



  getEmpresaId(cnpj) {
    return this.http
      .get(`${ROTAS_API}empresa/${cnpj}`);
  }
  putEmpresa(empresa, cpf) {
    return this.http
      .put(`${ROTAS_API}empresa/${cpf}`, empresa);
  }
  postEmpresa(empresa) {
    return this.http
      .post(`${ROTAS_API}empresa`, empresa);
  }

  // requisições HTTP Gestor
  getGestorInstituicao() {
    return this.http
      .get(`${ROTAS_API}gestorInstituicao`);
  }
  getGestores() {
    return this.http
      .get(`${ROTAS_API}gestores`);
  }

  getGestorId(cpf) {
    return this.http
      .get(`${ROTAS_API}gestor/${cpf}`);
  }

  postGestor(gestor) {
    return this.http
      .post(`${ROTAS_API}gestorNovo`, gestor);
  }

  putGestor(gestor, cpf) {
    return this.http
      .put(`${ROTAS_API}gestor/${cpf}`, gestor);
  }

  deleteGestor(cpf) {
    return this.http
      .delete(`${ROTAS_API}gestor/${cpf}`);
  }

  // requisições HTTP Endereços
  getEnderecoId(cpf) {
    return this.http
      .get(`${ROTAS_API}endereco/${cpf}`);
  }
  postEndereco(endereco) {
    return this.http
      .post(`${ROTAS_API}endereco`, endereco);
  }

  putEndereco(endereco, cpf) {
    return this.http
      .put(`${ROTAS_API}endereco/${cpf}`, endereco);
  }



  // requisições HTTP Contato
  getContatoId(cpf) {
    return this.http
      .get(`${ROTAS_API}contato/${cpf}`);
  }

  postContato(contato) {
    return this.http
      .post(`${ROTAS_API}contato`, contato);
  }

  putContato(contato, cpf) {
    return this.http
      .put(`${ROTAS_API}contato/${cpf}`, contato);
  }


  // requisicoes HTTP de instituição
  getInstituicaoId(cpf) {
    return this.http
      .get(`${ROTAS_API}instituicao/${cpf}`);
  }

  postInstituicao(instituicao) {
    return this.http
      .post(`${ROTAS_API}instituicao`, instituicao);
  }

  putInstituicao(instituicao, cpf) {
    return this.http
      .post(`${ROTAS_API}instituicao/${cpf}`, instituicao);
  }



  // requisicoes HTTP dos Módulos e visões
  getVisao() {
    return this.http
      .get(`${ROTAS_API}visao`);

  }
  getModulosIQS() {
    return this.http
      .get(`${ROTAS_API}modulosiqs`);

  }
  getModulosIRS() {
    return this.http
      .get(`${ROTAS_API}modulosirs`);

  }

  // requisicoes HTTP estado e municípios

  getEstado() {
    return this.http
      .get(`${ROTAS_API}estados`);
  }



  // requisicoes HTTP do banco postgres, para a aba instituicoes do gestor
  /*
  * Protocolo HTTP
  */
  getSelecioneEstado() {
    return this.http
      .get(`${ROTAS_API}instituicaoSaude/estados`);
  }

  /*
  * Protocolo HTTP
  */
  getSelecioneMunicipios() {
    return this.http
      .get(`${ROTAS_API}municipios`);
  }

  //   /*
  //   * Protocolo HTTP
  //   */
  getSelecioneBairro(idMunicipio) {
    return this.http
      .get(`${ROTAS_API}instituicaoSaude/bairros/${idMunicipio}`);
  }

  /*
  * Protocolo HTTP
  */
  getSelecioneTipoInt() {
    return this.http
      .get(`${ROTAS_API}instituicaoSaude/tipoInstituicao`);
  }

  /*
  * Protocolo HTTP
  */

  getSelecioneInt(municipio, bairro, tipo) {
    return this.http
      .get(`${ROTAS_API}instituicaoSaude/instituicao/${municipio}/${bairro}/${tipo}`);
  }

  /*
  //   * Protocolo HTTP passando ufId para retornar todas instituições da mesma
  //   */
  getAtualizaUf(ufId) {
    return this.http
      .get(`${ROTAS_API}instituicaoSaude/estadosAtualizados/${ufId}`);
  }

  //   * Protocolo HTTP passando municipioId para retornar todas instituições da mesma
  getAtualizaMunicipio(municipioId) {
    return this.http
      .get(`${ROTAS_API}instituicaoSaude/municipiosAtualizados/${municipioId}`);
  }

  //   * Protocolo HTTP passando tipoId da idMunicipio para retornar todas instituições da mesma
  getAtualizaTipo(tipoId, idMunicipio) {
    if (idMunicipio) {
      return this.http
        .get(`${ROTAS_API}instituicaoSaude/tipoInstituicaoAtualizada/${tipoId}/${idMunicipio}`);
    } else {
      return this.http
        .get(`${ROTAS_API}instituicaoSaude/tipoInstituicaoAtualizada/${tipoId}`);
    }
  }

  //   * Protocolo HTTP passando instituicaoId  para retornar todas instituições da mesma
  getAtualizaInstituicao(instituicaoId) {
    return this.http
      .get(`${ROTAS_API}instituicaoSaude/instituicaoAtualizada/${instituicaoId}`);
  }
  //   * Protocolo HTTP passando instituicaoId  para retornar todas instituições da mesma
  getAtualizaBairro(bairroIds) {
    const nullo = '(null)';
    return this.http
      .get(`${ROTAS_API}instituicaoSaude/bairroAtualizado/${bairroIds.id_uf ||
        nullo}/${bairroIds.id_municipio ||
        nullo}/${bairroIds.no_bairro ||
        nullo}/${bairroIds.id_tipo_unidade ||
        nullo}/${bairroIds.id_unidade ||
        nullo}`);
  }

}
