// //Controle de do moduloIQS, tras todos os modulosIQS do banco
// module.exports.contatoById = function (application, req, res) {

//     var cpf = req.params.cpf;

//     var conexaoPool = application.config.conexaoBD();
//     var model = new application.app.models.contatosDAO(conexaoPool);

//     model.listaContatoById(cpf, function (error, result) {
        
//         if (error) {
//             console.log(error);
//             res.status(400).send(error);
//         }
//         res.status(200).send(result);
//     });
// }