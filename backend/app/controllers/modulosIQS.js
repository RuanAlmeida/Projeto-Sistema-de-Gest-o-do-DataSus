//Controle da perspectivaAvaliativa, tras todos os modulosIQS do banco
module.exports.perspectivaAvaliativa = function (application, req, res) {

    var connectSQL = application.config.conexaoBD();
    var model = new application.app.models.modulosIQSDAO(connectSQL);

    model.listarPerspectivaAvaliativa(function (error, result) {
        
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result);
    });
}

//Controle da abrangenciaVisoes, tras todos os modulosIQS do banco
module.exports.abrangenciaVisoes = function (application, req, res) {

    var connectSQL = application.config.conexaoBD();
    var model = new application.app.models.modulosIQSDAO(connectSQL);

    model.listarAbrangenciaVisoes(function (error, result) {
        
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result);
    });
}
//Controle da dimenssaoAnalitica, tras todos os modulosIQS do banco
module.exports.dimenssaoAnalitica = function (application, req, res) {

    var params = req.params;

    var connectSQL = application.config.conexaoBD();
    var model = new application.app.models.modulosIQSDAO(connectSQL);

    model.listarDimenssaoAnalitica(params ,function (error, result) {
        
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result);
    });
}



