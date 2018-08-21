//Controle de estado, caso sucesso, retorna o estado do esquema dbgeral.tb_uf
module.exports.estado = function (application, req, res) {

    var conexaoPool = application.config.dbConnection();
    var model = new application.app.models.instituicaoSaudeDAO(conexaoPool);

    model.getEstado(function (error, result) {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        
        res.status(200).json(result.rows);
    });
}

//Controle de municipio, caso sucesso, retorna o estado do esquema dbgeral.tb_municipio
module.exports.municipio = function (application, req, res) {

    var conexaoPool = application.config.dbConnection();
    var model = new application.app.models.instituicaoSaudeDAO(conexaoPool);

    model.getMunicipios(function (error, result) {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        console.log(result);
        res.status(200).json(result.rows);
    });
}
//Controle de bairros, caso sucesso, retorna o estado do esquema dfdwp..bairros
module.exports.bairros = function (application, req, res) {

    var conexaoPool = application.config.dbConnection();
    var model = new application.app.models.instituicaoSaudeDAO(conexaoPool);

    var idMunicipio = req.params.id;

    model.getBairros(idMunicipio, function (error, result) {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }

        res.status(200).json(result.rows);
    });
}

//Controle de tipo de insituição, caso sucesso, retorna o estado do esquema dfdwp.td_tipo_unidade
module.exports.tipoInstituicao = function (application, req, res) {

    var conexaoPool = application.config.dbConnection();
    var model = new application.app.models.instituicaoSaudeDAO(conexaoPool);

    model.getTipoUnidade(function (error, result) {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        console.log(result);
        res.status(200).json(result.rows);
    });
}

//Controle de insituição, caso sucesso, retorna o estado do esquema dfdwp.td_instituicao
module.exports.instituicao = function (application, req, res) {

    var conexaoPool = application.config.dbConnection();
    var model = new application.app.models.instituicaoSaudeDAO(conexaoPool);
    var municipio = req.params.municipio, 
    bairro = req.params.bairro, 
    tipo = req.params.tipo;

    model.getInstituicao(municipio, bairro, tipo,function (error, result) {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).json(result.rows);
    });
}




//Controle de insituição, caso sucesso, retorna o estado do esquema dfdwp.td_instituicao
module.exports.estadosAtualizados = function (application, req, res) {

    var ufId = req.params.ufId;
    
    var conexaoPool = application.config.dbConnection();
    var model = new application.app.models.instituicaoSaudeDAO(conexaoPool);

    model.getEstadosAtualizados(ufId, function (error, result) {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).json(result.rows);
    });
}

//Controle de insituição, caso sucesso, retorna o estado do esquema dfdwp.td_instituicao
module.exports.municipiosAtualizados = function (application, req, res) {

    var municipioId = req.params.municipioId;

    var conexaoPool = application.config.dbConnection();
    var model = new application.app.models.instituicaoSaudeDAO(conexaoPool);

    model.getMunicipiosAtualizados(municipioId, function (error, result) {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).json(result.rows);
    });
}

//Controle de insituição, caso sucesso, retorna o estado do esquema dfdwp.td_instituicao
module.exports.tipoInstituicaoAtualizada = function (application, req, res) {

    var tipoId = req.params.tipoId;

    var conexaoPool = application.config.dbConnection();
    var model = new application.app.models.instituicaoSaudeDAO(conexaoPool);

    model.getTipoInstituicaoAtualizada(tipoId, function (error, result) {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).json(result.rows);
    });
}

//Controle de insituição, caso sucesso, retorna o estado do esquema dfdwp.td_instituicao
module.exports.tipoInstituicaoAtualizadaUf = function (application, req, res) {

    var tipoId = req.params.tipoId;
    var idMunicipio = req.params.idMunicipio;
    
    var conexaoPool = application.config.dbConnection();
    var model = new application.app.models.instituicaoSaudeDAO(conexaoPool);

    model.getTipoInstituicaoAtualizadaUf(tipoId, idMunicipio, function (error, result) {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).json(result.rows);
    });
}

//Controle de insituição, caso sucesso, retorna o estado do esquema dfdwp.td_instituicao
module.exports.instituicaoAtualizada = function (application, req, res) {

    var instituicaoId = req.params.instituicaoId;
    var conexaoPool = application.config.dbConnection();
    var model = new application.app.models.instituicaoSaudeDAO(conexaoPool);

    model.getInstituicaoAtualizada(instituicaoId, function (error, result) {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).json(result.rows);
    });
}

//Controle de insituição, caso sucesso, retorna o bairro um ou mais
//instituições de acordo  com os parametros passados
module.exports.bairroAtualizado = function (application, req, res) {

    var bairroIds = req.params;

    var conexaoPool = application.config.dbConnection();
    var model = new application.app.models.instituicaoSaudeDAO(conexaoPool);

    model.getBairroAtualizado(bairroIds, function (error, result) {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).json(result.rows);
    });
}
