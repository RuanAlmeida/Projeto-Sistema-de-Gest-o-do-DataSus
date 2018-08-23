// module.exports.sexo = function (application, req, res) {

//     var conexaoPool = application.config.dbConnection();
//     var model = new application.app.models.dadosBasicosDAO(conexaoPool);

//     model.getSexo(function (error, result) {
//         if (error) {
//             console.log(error);
//             res.status(400).send(error);
//         }
//         res.status(200).send(result.rows);
//     });
// }


// module.exports.escolaridade = function (application, req, res) {

//     var conexaoPool = application.config.dbConnection();
//     var model = new application.app.models.dadosBasicosDAO(conexaoPool);

//     model.getEscolaridade(function (error, result) {
//         if (error) {
//             console.log(error);
//             res.status(400).send(error);
//         }
//         res.status(200).send(result.rows);
//     });
// }


