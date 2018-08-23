module.exports = function(app){
    let api = {};

    //Controle de estado, caso sucesso, retorna o estado do esquema dbgeral.tb_uf
    api.estado = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        instituicaoSaudeDAO = new app.infra.instituicaoSaudeDAO(connection);
    
        instituicaoSaudeDAO.getEstado((error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).json(result.rows);
        });
        connection.end();
    }

    api.municipio = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        instituicaoSaudeDAO = new app.infra.instituicaoSaudeDAO(connection);
    
        instituicaoSaudeDAO.getMunicipios((error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).json(result.rows);
        });
        connection.end();
    }

    //Controle de bairros, caso sucesso, retorna o estado do esquema dfdwp..bairros
    api.bairros = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        instituicaoSaudeDAO = new app.infra.instituicaoSaudeDAO(connection),
        idMunicipio = req.params.id;
    
        instituicaoSaudeDAO.getBairros(idMunicipio, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).json(result.rows);
        });
        connection.end();
    }

    //Controle de tipo de insituição, caso sucesso, retorna o estado do esquema dfdwp.td_tipo_unidade
    api.tipoInstituicao = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        instituicaoSaudeDAO = new app.infra.instituicaoSaudeDAO(connection);

        instituicaoSaudeDAO.getTipoUnidade((error, result) => {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).json(result.rows);
    });
        connection.end();
    }

    //Controle de insituição, caso sucesso, retorna o estado do esquema dfdwp.td_instituicao
    api.instituicao = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        instituicaoSaudeDAO = new app.infra.instituicaoSaudeDAO(connection),
        { municipio } = req.params, 
        { bairro } = req.params, 
        { tipo } = req.params;

        instituicaoSaudeDAO.getInstituicao(municipio, bairro, tipo, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
            res.status(200).json(result.rows);
        });
        connection.end();
    }

    //Controle de insituição, caso sucesso, retorna o estado do esquema dfdwp.td_instituicao
    api.estadosAtualizados = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        instituicaoSaudeDAO = new app.infra.instituicaoSaudeDAO(connection),
        { ufId } = req.params;
    
        instituicaoSaudeDAO.getEstadosAtualizados(ufId, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).json(result.rows);
        });
        connection.end();
    }

    //Controle de insituição, caso sucesso, retorna o estado do esquema dfdwp.td_instituicao
    api.municipiosAtualizados = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        instituicaoSaudeDAO = new app.infra.instituicaoSaudeDAO(connection),
        { municipioId } = req.params;
    
        instituicaoSaudeDAO.getMunicipiosAtualizados(municipioId, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).json(result.rows);
        });
        connection.end();
    }

    //Controle de insituição, caso sucesso, retorna o estado do esquema dfdwp.td_instituicao
    api.tipoInstituicaoAtualizada = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        instituicaoSaudeDAO = new app.infra.instituicaoSaudeDAO(connection),
        { tipoId } = req.params;
        
        instituicaoSaudeDAO.getTipoInstituicaoAtualizada(tipoId, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).json(result.rows);
        });
        connection.end();
    }

    
    //Controle de insituição, caso sucesso, retorna o estado do esquema dfdwp.td_instituicao    
    api.tipoInstituicaoAtualizadaUf = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        instituicaoSaudeDAO = new app.infra.instituicaoSaudeDAO(connection),
        { tipoId } = req.params,
        { idMunicipio } = req.params;
    
        instituicaoSaudeDAO.getTipoInstituicaoAtualizadaUf(tipoId, idMunicipio, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).json(result.rows);
        });
        connection.end();
    }

    //Controle de insituição, caso sucesso, retorna o estado do esquema dfdwp.td_instituicao
    api.instituicaoAtualizada = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        instituicaoSaudeDAO = new app.infra.instituicaoSaudeDAO(connection),
        { instituicaoId } = req.params;
    
        instituicaoSaudeDAO.getInstituicaoAtualizada(instituicaoId, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).json(result.rows);
        });
        connection.end();
    }

    //Controle de insituição, caso sucesso, retorna o bairro um ou mais
    //instituições de acordo  com os parametros passados
    api.bairroAtualizado = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        instituicaoSaudeDAO = new app.infra.instituicaoSaudeDAO(connection);
        bairroIds = req.params;
    
        instituicaoSaudeDAO.getBairroAtualizado(bairroIds, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).json(result.rows);
        });
        connection.end();
    }

    return api;
};
