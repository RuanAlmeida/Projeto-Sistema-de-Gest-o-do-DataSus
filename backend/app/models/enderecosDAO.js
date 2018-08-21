function enderecoDAO(connection) {
    this._connection = connection;
}

enderecoDAO.prototype.listaEnderecoById = function (cpf, callback) {
    this._connection.query(`SELECT * FROM "ISaudeRadar".endereco WHERE cpf = '${cpf}'`, callback);
}

module.exports = function () {
    return enderecoDAO;
}