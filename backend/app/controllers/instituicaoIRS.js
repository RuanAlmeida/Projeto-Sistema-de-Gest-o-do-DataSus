//Controle de do moduloIQS, tras todos os modulosIQS do banco
module.exports.intiuicaoIRS = function (application, req, res) {

    var conexaoPool = application.config.conexaoBD();
    var model = new application.app.models.instituicaoIRSDAO(conexaoPool);

    model.listaInstituicoes(function (error, result) {
        
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result.rows);
    });
}