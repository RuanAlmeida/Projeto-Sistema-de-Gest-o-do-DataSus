import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API } from '../config/api.config';

@Injectable()
export class AdministracaoService {

  constructor(
    public http: HttpClient
  ) { }

  // requisições HTTP geréricas
  getMunicipios() {
    return this.http
      .get(`${API.ROTAS_API}municipios`);
  }

  // requisições HTTP Empresa



  getEmpresaId(cnpj) {
    return this.http
      .get(`${API.ROTAS_API}empresa/${cnpj}`);
  }
  putEmpresa(empresa, cpf) {
    return this.http
      .put(`${API.ROTAS_API}empresa/${cpf}`, empresa);
  }
  postEmpresa(empresa) {
    return this.http
      .post(`${API.ROTAS_API}empresa`, empresa);
  }

  // requisições HTTP Gestor
  getGestorInstituicao() {
    return this.http
      .get(`${API.ROTAS_API}gestorInstituicao`);
  }
  getGestores() {
    return this.http
      .get(`${API.ROTAS_API}gestores`);
  }

  getGestorId(cpf) {
    return this.http
      .get(`${API.ROTAS_API}gestor/${cpf}`);
  }

  postGestor(gestor) {
    return this.http
      .post(`${API.ROTAS_API}gestorNovo`, gestor);
  }

  putGestor(gestor, cpf) {
    return this.http
      .put(`${API.ROTAS_API}gestor/${cpf}`, gestor);
  }

  deleteGestor(cpf) {
    return this.http
      .delete(`${API.ROTAS_API}gestor/${cpf}`);
  }

  // requisições HTTP Endereços
  getEnderecoId(cpf) {
    return this.http
      .get(`${API.ROTAS_API}endereco/${cpf}`);
  }
  postEndereco(endereco) {
    return this.http
      .post(`${API.ROTAS_API}endereco`, endereco);
  }

  putEndereco(endereco, cpf) {
    return this.http
      .put(`${API.ROTAS_API}endereco/${cpf}`, endereco);
  }



  // requisições HTTP Contato
  getContatoId(cpf) {
    return this.http
      .get(`${API.ROTAS_API}contato/${cpf}`);
  }

  postContato(contato) {
    return this.http
      .post(`${API.ROTAS_API}contato`, contato);
  }

  putContato(contato, cpf) {
    return this.http
      .put(`${API.ROTAS_API}contato/${cpf}`, contato);
  }

//////////////////////////////////////////////////
////               INSTITUIÇÃO                ////
//////////////////////////////////////////////////

  // Trás as instituições relacionadas ao gestor
  getInstituicoesGestor(cpf) {
    return this.http
      .get(`${API.ROTAS_API}instituicoesGestor/${cpf}`);
  }

   // Deleta a instituição relacionada ao gestor
  deleteInstituicaoGestor(cpf, idInst) {
    return this.http
      .delete(`${API.ROTAS_API}instituicaoGestor/${cpf}/${idInst}`);
  }

  // Adiciona o bairro no banco de dados caso não exista
  postBairro(bairro) {
    return this.http
      .post(`${API.ROTAS_API}bairro`, bairro);
  }

// Adiciona o tipo de instituição no banco de dados caso não exista
  postTipoInstituicao(tipInst) {
    return this.http
      .post(`${API.ROTAS_API}tipoInstituicao`, tipInst);
  }

// Adiciona a instituição de saúde no banco de dados caso não exista
  postInstituicaoSaude(instSaude) {
    return this.http
      .post(`${API.ROTAS_API}instituicaoSaude`, instSaude);
}
// associa o gestor a instituicao
  postInstituicaoGestor(instGestor) {
    return this.http
      .post(`${API.ROTAS_API}instituicaoSaude/instituicao`, instGestor);
}

//////////////////////////////////////////////////

  // requisicoes HTTP dos Módulos e visões
  getVisao() {
    return this.http
      .get(`${API.ROTAS_API}visao`);

  }
  getModulosIQS() {
    return this.http
      .get(`${API.ROTAS_API}modulosiqs`);

  }
  getModulosIRS() {
    return this.http
      .get(`${API.ROTAS_API}modulosirs`);

  }

  // requisicoes HTTP estado e municípios

  getEstado() {
    return this.http
      .get(`${API.ROTAS_API}estados`);
  }



  // requisicoes HTTP do banco postgres, para a aba instituicoes do gestor
  /*
  * Protocolo HTTP
  */
  getSelecioneEstado() {
    return this.http
      .get(`${API.ROTAS_API}instituicaoSaude/estados`);
  }

  /*
  * Protocolo HTTP
  */
  getSelecioneMunicipios() {
    return this.http
      .get(`${API.ROTAS_API}municipiosLocal`);
  }

  //   /*
  //   * Protocolo HTTP
  //   */
  getSelecioneBairro(idMunicipio) {
    return this.http
      .get(`${API.ROTAS_API}instituicaoSaude/bairros/${idMunicipio}`);
  }

  /*
  * Protocolo HTTP
  */
  getSelecioneTipoInt() {
    return this.http
      .get(`${API.ROTAS_API}instituicaoSaude/tipoInstituicao`);
  }

  /*
  * Protocolo HTTP
  */
 getInstsIQS() {
    return this.http
      .get(`${API.ROTAS_API}instituicaoSaude/instituicoesIQS`);
  }

  /*
  * Protocolo HTTP
  */
 getInstsIQSByParams(form) {
   let params = new HttpParams();
   params = params.append('estado', form.uf || '');
   params = params.append('municipio', form.municipio || '');
   params = params.append('bairro', form.bairro || '');
   params = params.append('tipInst', form.tipInst || '');
    return this.http
      .get(`${API.ROTAS_API}instituicaoSaude/listaInstByParams`, {params: params});
  }

  /*
  * Protocolo HTTP
  */

  getSelecioneInt(municipio, bairro, tipo) {
    return this.http
      .get(`${API.ROTAS_API}instituicaoSaude/instituicao/${municipio}/${bairro}/${tipo}`);
  }

  /*
  //   * Protocolo HTTP passando ufId para retornar todas instituições da mesma
  //   */
  getAtualizaUf(ufId) {
    return this.http
      .get(`${API.ROTAS_API}instituicaoSaude/estadosAtualizados/${ufId}`);
  }

  //   * Protocolo HTTP passando municipioId para retornar todas instituições da mesma
  getAtualizaMunicipio(municipioId) {
    return this.http
      .get(`${API.ROTAS_API}instituicaoSaude/municipiosAtualizados/${municipioId}`);
  }

  //   * Protocolo HTTP passando tipoId da idMunicipio para retornar todas instituições da mesma
  getAtualizaTipo(tipoId, idMunicipio) {
    if (idMunicipio) {
      return this.http
        .get(`${API.ROTAS_API}instituicaoSaude/tipoInstituicaoAtualizada/${tipoId}/${idMunicipio}`);
    } else {
      return this.http
        .get(`${API.ROTAS_API}instituicaoSaude/tipoInstituicaoAtualizada/${tipoId}`);
    }
  }

  //   * Protocolo HTTP passando instituicaoId  para retornar todas instituições da mesma
  getAtualizaInstituicao(instituicaoId) {
    return this.http
      .get(`${API.ROTAS_API}instituicaoSaude/instituicaoAtualizada/${instituicaoId}`);
  }
  //   * Protocolo HTTP passando instituicaoId  para retornar todas instituições da mesma
  getAtualizaBairro(bairroIds) {
    const nullo = '(null)';
    return this.http
      .get(`${API.ROTAS_API}instituicaoSaude/bairroAtualizado/${bairroIds.id_uf ||
        nullo}/${bairroIds.id_municipio ||
        nullo}/${bairroIds.no_bairro ||
        nullo}/${bairroIds.id_tipo_unidade ||
        nullo}/${bairroIds.id_unidade ||
        nullo}`);
  }

}
