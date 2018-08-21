function municipiosDAO(connection) {
    this._connection = connection;
}

municipiosDAO.prototype.listaMinicipios = function (callback) {
    this._connection.query('SELECT * FROM municipios', callback);
}

municipiosDAO.prototype.listaUfs = function (callback) {
    this._connection.query('SELECT DISTINCT(uf) FROM municipios order by uf', callback);
}


module.exports = function () {
    return municipiosDAO;
}