function InstituicaoIRSDAO(connection) {
    this._connection = connection;
}

InstituicaoIRSDAO.prototype.listaInstituicoes = function (callback) {
    this._connection.query('SELECT * FROM "ISaudeRadar".instituicoes', callback);
}

module.exports = function () {
    return InstituicaoIRSDAO;
}