//--------------- ABA EMPRESA ------------------
module.exports.municipios = function (application, req, res) {

    var conexaoPool = application.config.conexaoBD();
    var model = new application.app.models.gestoresDAO(conexaoPool);

    model.listaMunicipios(function (error, result) {

        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result);
    });
}

module.exports.cadastrarEmpresa = function (application, req, res) {

    empresa = req.body

    var conexaoPool = application.config.conexaoBD();
    var model = new application.app.models.gestoresDAO(conexaoPool);

    model.cadastrarEmpresa(empresa ,function (error, result) {

        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result);
    });
}


//Controle de gestores, retorna todos os gestores
module.exports.gestores = function (application, req, res) {



    var conexaoPool = application.config.conexaoBD();
    var model = new application.app.models.gestoresDAO(conexaoPool);

    model.listaGestores(function (error, result) {

        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result);
    });
}



//Controle de gestores, retorna os dados do gestor de acordo com id
module.exports.gestor = function (application, req, res) {

    var cpf = req.params.cpf;

    var conexaoPool = application.config.conexaoBD();
    var model = new application.app.models.gestoresDAO(conexaoPool);

    model.listaGestor(cpf, function (error, result) {

        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result);
    });
}

//Controle de gestores, insere os dados do gestor e retornar falha ou sucesso
module.exports.novoGestor = function (application, req, res) {
    var gestor = req.body;

    var conexaoMySql = application.config.conexaoBD();
    var model = new application.app.models.gestoresDAO(conexaoMySql);

    model.cadastrarGestor(gestor, function (error, result) {

        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result);
    });
}

//Controle de gestores, insere os dados do gestor e retornar falha ou sucesso
module.exports.updateGestor = function (application, req, res) {

    var params = req.params;
    var gestor = req.body;

    var conexaoMySql = application.config.conexaoBD();
    var model = new application.app.models.gestoresDAO(conexaoMySql);


    model.atualizarGestor(params, gestor, function (error, result) {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(req.params);
    });


}

//Controle de gestores, remove o gestor passando seu cpf e cnpj
module.exports.deleteGestor = function (application, req, res) {

    var params = req.params;

    var conexaoMySql = application.config.conexaoBD();
    var model = new application.app.models.gestoresDAO(conexaoMySql);

    model.removeGestor(params, function (error, result) {

        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(req.params);
    });
}

//Controle de gestores, lista todas as instituicoes dos gestores
module.exports.instituicoesGestor = function (application, req, res) {

    var conexaoMySql = application.config.conexaoBD();
    var model = new application.app.models.gestoresDAO(conexaoMySql);

    model.listaInstituicoes(function (error, result) {

        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result);
    });
}


module.exports.estados = function (application, req, res) {

    var conexaoPool = application.config.dbConnection();
    var model = new application.app.models.gestoresDAO(conexaoPool);

    model.listarEstados(function (error, result) {

        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result.rows);
    });
}




// module.exports.municipios = function (application, req, res) {

//     var params = req.params;

//     var conexaoPool = application.config.dbConnection();
//     var model = new application.app.models.gestoresDAO(conexaoPool);

//     model.listarMunicipios(params, function (error, result) {

//         if (error) {
//             console.log(error);
//             res.status(400).send(error);
//         }
//         res.status(200).send(result.rows);
//     });
// }

module.exports.endereco = function (application, req, res) {

    var params = req.params;

    var conexaoMySQL = application.config.conexaoBD();
    var model = new application.app.models.gestoresDAO(conexaoMySQL);

    model.listaEndereco(params, function (error, result) {

        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result);
    });
}

module.exports.novoEndereco = function (application, req, res) {

    var endereco = req.body;

    var conexaoMySQL = application.config.conexaoBD();
    var model = new application.app.models.gestoresDAO(conexaoMySQL);

    model.novoEndereco(endereco, function (error, result) {

        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send({ cpf: endereco.cpf });
    });
}

module.exports.atualizaEndereco = function (application, req, res) {

    var params = req.params;
    var endereco = req.body;

    var conexaoMySQL = application.config.conexaoBD();
    var model = new application.app.models.gestoresDAO(conexaoMySQL);

    model.atualizaEndereco(params, endereco, function (error, result) {

        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result);
    });
}

module.exports.listarContato = function (application, req, res) {

    var params = req.params;

    var conexaoMySQL = application.config.conexaoBD();
    var model = new application.app.models.gestoresDAO(conexaoMySQL);

    model.listaContato(params, function (error, result) {

        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result);
    });
}

module.exports.cadastrarContato = function (application, req, res) {

    var contato = req.body;

    var conexaoMySQL = application.config.conexaoBD();
    var model = new application.app.models.gestoresDAO(conexaoMySQL);

    model.cadastrarContato(contato, function (error, result) {

        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).end();
    });
}

module.exports.atualizaContato = function (application, req, res) {

    var params = req.params;
    var contato = req.body

    var conexaoMySQL = application.config.conexaoBD();
    var model = new application.app.models.gestoresDAO(conexaoMySQL);

    model.atualizaContato(params, contato, function (error, result) {

        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result);
    });
}
module.exports.cadastrarInstituicao = function (application, req, res) {

    var instituicao = req.body;

    var conexaoMySQL = application.config.conexaoBD();
    var model = new application.app.models.gestoresDAO(conexaoMySQL);

    model.verificaIdTipoInstituicao(instituicao, function (error, resultTipoInst) {

        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        if (resultTipoInst[0]) {
            model.cadastrarInstituicao(instituicao, resultTipoInst[0], function (error, existente) {
                if (error) {
                    console.log(error);
                    res.status(400).send(error);
                }
                res.status(200).send(existente);
            });
           
        } else {
            model.cadastrarInstituicao(instituicao, !resultTipoInst[0], function (error, result) {
                if (error) {
                    console.log(error);
                    res.status(400).send(error);
                }
                res.status(200).send(result);
            });
        }
    });
}









