//Controle de gestores, retorna os dados do gestor de acordo com id
module.exports.endereco = function (application, req, res) {

    var cpf = req.params.cpf;

    var conexaoPool = application.config.conexaoBD();
    var model = new application.app.models.enderecosDAO(conexaoPool);

    model.listaEnderecoById(cpf, function (error, result) {
        
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result.rows);
    });
}