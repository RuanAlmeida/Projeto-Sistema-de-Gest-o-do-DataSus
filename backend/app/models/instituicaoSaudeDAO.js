function InstituicaoSaudeDAO(connection) {
    this._connection = connection;
}


InstituicaoSaudeDAO.prototype.getEstado = function (callback) {
    this._connection.query("SELECT id_uf, uf_sigla, no_uf_completo FROM dbgeral.tb_uf WHERE uf_status = 'ATIVO' order by no_uf_completo;", callback);
}

InstituicaoSaudeDAO.prototype.getMunicipios = function (callback) {
    this._connection.query("SELECT id_municipio, id_uf, no_mun_completo FROM dbgeral.tb_municipio order by no_mun_completo", callback);
}

InstituicaoSaudeDAO.prototype.getTipoUnidade = function (callback) {
    this._connection.query("SELECT * FROM dfdwp.td_tipo_unidade order by ds_tipo_unidade", callback);
}

InstituicaoSaudeDAO.prototype.getInstituicao = function (municipio, bairro, tipo, callback) {
    this._connection.query(`SELECT * FROM dfdwp.td_instituicao where id_municipio = '${municipio}' AND no_bairro = '${bairro}' AND id_tipo_unidade = '${tipo}' order by no_fantasia` , callback);
}

InstituicaoSaudeDAO.prototype.getBairros = function (id, callback) {
    this._connection.query(`SELECT * FROM dfdwp.td_instituicao WHERE id_municipio = '${id}'`, callback);
}



InstituicaoSaudeDAO.prototype.getEstadosAtualizados = function (ufId, callback) {
    this._connection.query(`SELECT dbGeral.tb_uf.id_uf, dbGeral.tb_uf.uf_sigla, dbgeral.tb_municipio.id_municipio, dbgeral.tb_municipio.no_municipio, dfdwp.td_instituicao.no_bairro, dfdwp.td_instituicao.id_unidade, dfdwp.td_instituicao.no_fantasia, dfdwp.td_tipo_unidade.id_tipo_unidade, dfdwp.td_tipo_unidade.ds_tipo_unidade FROM dfdwp.td_instituicao   inner JOIN dbgeral.tb_municipio  ON dbgeral.tb_municipio.id_municipio = dfdwp.td_instituicao.id_municipio  inner JOIN dfdwp.td_tipo_unidade   ON dfdwp.td_instituicao.id_tipo_unidade = dfdwp.td_tipo_unidade.id_tipo_unidade inner JOIN dbgeral.tb_uf ON dbGeral.tb_uf.id_uf = dbgeral.tb_municipio.id_uf where dbGeral.tb_uf.id_uf = '${ufId}'`, callback);
}

InstituicaoSaudeDAO.prototype.getMunicipiosAtualizados = function (municipioId, callback) {
    this._connection.query(`SELECT dbGeral.tb_uf.id_uf, dbGeral.tb_uf.uf_sigla, dbgeral.tb_municipio.id_municipio, dbgeral.tb_municipio.no_municipio, dfdwp.td_instituicao.no_bairro, dfdwp.td_instituicao.id_unidade, dfdwp.td_instituicao.no_fantasia, dfdwp.td_tipo_unidade.id_tipo_unidade, dfdwp.td_tipo_unidade.ds_tipo_unidade FROM dfdwp.td_instituicao   inner JOIN dbgeral.tb_municipio  ON dbgeral.tb_municipio.id_municipio = dfdwp.td_instituicao.id_municipio  inner JOIN dfdwp.td_tipo_unidade   ON dfdwp.td_instituicao.id_tipo_unidade = dfdwp.td_tipo_unidade.id_tipo_unidade inner JOIN dbgeral.tb_uf ON dbGeral.tb_uf.id_uf = dbgeral.tb_municipio.id_uf  where dfdwp.td_instituicao.id_municipio = '${municipioId}'`, callback);
}

InstituicaoSaudeDAO.prototype.getTipoInstituicaoAtualizada = function (tipoId, callback) {
    this._connection.query(`SELECT dbGeral.tb_uf.id_uf, dbGeral.tb_uf.uf_sigla, dbgeral.tb_municipio.id_municipio, dbgeral.tb_municipio.no_municipio, dfdwp.td_instituicao.no_bairro, dfdwp.td_instituicao.id_unidade, dfdwp.td_instituicao.no_fantasia, dfdwp.td_tipo_unidade.id_tipo_unidade, dfdwp.td_tipo_unidade.ds_tipo_unidade FROM dfdwp.td_instituicao   inner JOIN dbgeral.tb_municipio  ON dbgeral.tb_municipio.id_municipio = dfdwp.td_instituicao.id_municipio  inner JOIN dfdwp.td_tipo_unidade   ON dfdwp.td_instituicao.id_tipo_unidade = dfdwp.td_tipo_unidade.id_tipo_unidade inner JOIN dbgeral.tb_uf ON dbGeral.tb_uf.id_uf = dbgeral.tb_municipio.id_uf where dfdwp.td_tipo_unidade.id_tipo_unidade = '${tipoId}'`, callback);
}

InstituicaoSaudeDAO.prototype.getTipoInstituicaoAtualizadaUf = function (tipoId, idMunicipio, callback) {
    this._connection.query(`SELECT dbGeral.tb_uf.id_uf, dbGeral.tb_uf.uf_sigla, dbgeral.tb_municipio.id_municipio, dbgeral.tb_municipio.no_municipio, dfdwp.td_instituicao.no_bairro, dfdwp.td_instituicao.id_unidade, dfdwp.td_instituicao.no_fantasia, dfdwp.td_tipo_unidade.id_tipo_unidade, dfdwp.td_tipo_unidade.ds_tipo_unidade FROM dfdwp.td_instituicao   inner JOIN dbgeral.tb_municipio  ON dbgeral.tb_municipio.id_municipio = dfdwp.td_instituicao.id_municipio  inner JOIN dfdwp.td_tipo_unidade   ON dfdwp.td_instituicao.id_tipo_unidade = dfdwp.td_tipo_unidade.id_tipo_unidade inner JOIN dbgeral.tb_uf ON dbGeral.tb_uf.id_uf = dbgeral.tb_municipio.id_uf  where dfdwp.td_tipo_unidade.id_tipo_unidade =  '${tipoId}' and dbgeral.tb_municipio.id_municipio = '${idMunicipio}'`, callback);
}

InstituicaoSaudeDAO.prototype.getInstituicaoAtualizada = function (instituicaoId, callback) {
    this._connection.query(`SELECT dbGeral.tb_uf.id_uf, dbGeral.tb_uf.uf_sigla, dbgeral.tb_municipio.id_municipio, dbgeral.tb_municipio.no_municipio, dfdwp.td_instituicao.no_bairro, dfdwp.td_instituicao.id_unidade, dfdwp.td_instituicao.no_fantasia, dfdwp.td_tipo_unidade.id_tipo_unidade, dfdwp.td_tipo_unidade.ds_tipo_unidade FROM dfdwp.td_instituicao   inner JOIN dbgeral.tb_municipio  ON dbgeral.tb_municipio.id_municipio = dfdwp.td_instituicao.id_municipio  inner JOIN dfdwp.td_tipo_unidade   ON dfdwp.td_instituicao.id_tipo_unidade = dfdwp.td_tipo_unidade.id_tipo_unidade inner JOIN dbgeral.tb_uf ON dbGeral.tb_uf.id_uf = dbgeral.tb_municipio.id_uf   where dfdwp.td_instituicao.id_unidade = '${instituicaoId}'`, callback);
}

InstituicaoSaudeDAO.prototype.getBairroAtualizado = function (bairroIds, callback) {
    let id_uf, id_municipio, no_bairro, id_tipo_unidade, id_unidade, where;
    let and = 0;

    bairroIds.id_uf != '(null)' ? (id_uf = `dbgeral.tb_municipio.id_uf = '${bairroIds.id_uf}'`, and += 1) : (id_uf = ``);

    bairroIds.id_municipio != '(null)' ? (and > 0 ?
        (id_municipio = `and dbgeral.tb_municipio.id_municipio = '${bairroIds.id_municipio}'`, and += 1)
        :
        (id_municipio = ` dbgeral.tb_municipio.id_municipio = '${bairroIds.id_municipio}'`), and += 1)
        :
        id_municipio = ``;

    bairroIds.no_bairro != '(null)' ?
        (and > 0 ?
            (no_bairro = `and dfdwp.td_instituicao.no_bairro = '${bairroIds.no_bairro}'`, and += 1)
            :
            (no_bairro = `dfdwp.td_instituicao.no_bairro = '${bairroIds.no_bairro}'`), and += 1)
        :
        no_bairro = ``;

    bairroIds.id_tipo_unidade != '(null)' ?
        (and > 0 ?
            (id_tipo_unidade = `and dfdwp.td_instituicao.id_tipo_unidade = '${bairroIds.id_tipo_unidade}'`, and += 1)
            :
            (id_tipo_unidade = `dfdwp.td_instituicao.id_tipo_unidade = '${bairroIds.id_tipo_unidade}'`), and += 1)
        :
        id_tipo_unidade = ``;

    bairroIds.id_unidade != '(null)' ?
        (and > 0 ?
            (id_unidade = `and dfdwp.td_instituicao.id_unidade = '${bairroIds.id_unidade}'`, and += 1)
            :
            (id_unidade = `dfdwp.td_instituicao.id_unidade = '${bairroIds.id_unidade}'`), and += 1)
        :
        id_unidade = ``;

    id_uf || id_municipio || no_bairro || id_tipo_unidade || id_unidade != `` ? where = `where` : where = ``;
    this._connection.query(`SELECT DISTINCT dbgeral.tb_municipio.id_uf , dbgeral.tb_uf.uf_sigla , dbgeral.tb_municipio.id_municipio , dbgeral.tb_municipio.no_municipio , dfdwp.td_instituicao.no_bairro , dfdwp.td_instituicao.id_tipo_unidade , dfdwp.td_tipo_unidade.ds_tipo_unidade , dfdwp.td_instituicao.id_unidade , dfdwp.td_instituicao.no_fantasia FROM dfdwp.td_instituicao   INNER JOIN dbgeral.tb_municipio ON dbgeral.tb_municipio.id_municipio = dfdwp.td_instituicao.id_municipio INNER JOIN dfdwp.td_tipo_unidade ON dfdwp.td_instituicao.id_tipo_unidade = dfdwp.td_tipo_unidade.id_tipo_unidade INNER JOIN dbgeral.tb_uf ON dbgeral.tb_uf.id_uf = dbgeral.tb_municipio.id_uf ${where} ${id_uf} ${id_municipio} ${no_bairro} ${id_tipo_unidade} ${id_unidade};`, callback);
}

module.exports = function () {
    return InstituicaoSaudeDAO;
}
