function InstituicaoIRSDAO(connection) {
    this._connection = connection;
}

InstituicaoIRSDAO.prototype.listaInstituicoes = function (callback) {
    this._connection.query('SELECT * FROM instituicoes_saude', callback);
}

InstituicaoIRSDAO.prototype.listaInstituicoesGestor = function (cpf, callback) {
    this._connection.query(
        `SELECT pis.*, inst.descricao, tip.descricao AS tipo_inst, m.descricao AS municipio, m.uf FROM perfis_inst_saude pis 
         INNER jOIN instituicoes_saude inst ON pis.idInstituicao_saude = inst.idInstituicao_saude
         INNER JOIN tipo_instituicoes tip ON inst.idTipo_Instituicao = tip.idTipo_Instituicao
         INNER JOIN bairros b ON inst.idbairro = b.idbairro
         INNER JOIN municipios m ON b.idibge = m.idibge
         WHERE pis.cpf = ${cpf};`, 
        callback
        );
}

module.exports = function () {
    return InstituicaoIRSDAO;
}