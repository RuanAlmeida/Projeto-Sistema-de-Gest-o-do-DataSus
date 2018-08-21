//Controle de do moduloIRS, tras todos os modulosIRS do banco
module.exports.modulosIRS = function (application, req, res) {

    var conexaoPool = application.config.conexaoBD();
    var model = new application.app.models.modulosIRSDAO(conexaoPool);

    model.listaModuloIRS(function (error, result) {
        
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result.rows);
    });
}