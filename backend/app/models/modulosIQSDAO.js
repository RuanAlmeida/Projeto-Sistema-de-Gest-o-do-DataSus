function modulosIQSDAO(connection) {
    this._connection = connection;
}

modulosIQSDAO.prototype.listarPerspectivaAvaliativa = function (callback) {
    this._connection.query('SELECT * FROM sistemagestaodb.modulosiqs where idvisoes = 1;', callback);
}
modulosIQSDAO.prototype.listarAbrangenciaVisoes = function (callback) {
    this._connection.query('SELECT * FROM sistemagestaodb.modulosiqs where idvisoes = 2;', callback);
}
modulosIQSDAO.prototype.listarDimenssaoAnalitica = function (callback) {
    this._connection.query('SELECT * FROM sistemagestaodb.modulosiqs where idvisoes = 3;', callback);
}

module.exports = function () {
    return modulosIQSDAO;
}