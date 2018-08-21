//tras todos os municipios do banco
module.exports.municipios = function (application, req, res) {

    var conexaoPool = application.config.conexaoBD();
    var model = new application.app.models.municipiosDAO(conexaoPool);

    model.listaMinicipios(function (error, result) {
        
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result);
    });
}

//tras todos as ufs do banco
module.exports.ufs = function (application, req, res) {

    var conexaoPool = application.config.conexaoBD();
    var model = new application.app.models.municipiosDAO(conexaoPool);

    model.listaUfs(function (error, result) {
        
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result);
    });
}