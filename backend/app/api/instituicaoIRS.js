module.exports = function(app){
    let api = {};

//Controle de do moduloIQS, tras todos os modulosIQS do banco
    api.listaInstituicoes = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        instituicaoIRSDAO = new app.infra.instituicaoIRSDAO(connection);

        instituicaoIRSDAO.listaInstituicoes((error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).send(result.rows);
        });
    connection.end();
}
api.adicionaBairro = (req, res) => {
    let bairro = req.body;
    if (bairro.descricao && bairro.idibge) {
        const knex = app.conexao.knexConnection();
        knex('bairros').where('descricao', bairro.descricao).andWhere('idibge', bairro.idibge)
            .then(resultBairro => {
                if (resultBairro.length > 0) {
                    res.status(200).json(resultBairro[0].idbairro);
                } else {
                    knex('bairros').returning('idbairro').insert(bairro)
                    .then(result => {
                        res.status(200).json(result[0]);
                    })
                    .catch(erro => {
                        console.error(erro);
                        knex.destroy();
                        res.status(500).send(app.api.erroPadrao());
                    });
                }
            })
            .catch(erro => {
                console.error(erro);
                knex.destroy();
                res.status(500).send(app.api.erroPadrao());
            });
    } else { 
        res.status(400).send(app.api.erroPadrao()); 
    }
}

api.adicionaTipoInstituicao = (req, res) => {
    let tipInst = req.body;
    if (tipInst.idTipo_Instituicao && tipInst.descricao) {
        const knex = app.conexao.knexConnection();
        knex('tipo_instituicoes').where('idTipo_Instituicao', tipInst.idTipo_Instituicao)
        .then(resultTipInst => {
            if (resultTipInst.length > 0) {
                res.status(200).end();
            } else {
                knex('tipo_instituicoes').insert(tipInst)
                    .then(result => {
                        res.status(200).end();
                    })
                    .catch(erro => {
                        console.error(erro);
                        knex.destroy();
                        res.status(500).send(app.api.erroPadrao());
                    });
            }
        })
        .catch(erro => {
            console.error(erro);
            knex.destroy();
            res.status(500).send(app.api.erroPadrao());
        });
    } else { 
        res.status(400).send(app.api.erroPadrao()); 
    }
    
}

api.adicionaInstituicaoSaude = (req, res) => {
    let instSaude = req.body;
    if (instSaude.idInstituicao_saude &&
        instSaude.descricao &&
        instSaude.idTipo_Instituicao &&
        instSaude.idbairro) {
        const knex = app.conexao.knexConnection();
        knex('instituicoes_saude').where('idInstituicao_saude', instSaude.idInstituicao_saude)
        .then(resultInstSaude => {
            if (resultInstSaude.length > 0) {
                res.status(200).end();
            } else {
                knex('instituicoes_saude').insert(instSaude)
                    .then(result => {
                        res.status(200).end();
                    })
                    .catch(erro => {
                        console.error(erro);
                        knex.destroy();
                        res.status(500).send(app.api.erroPadrao());
                    });
            }
        })
        .catch(erro => {
            console.error(erro);
            knex.destroy();
            res.status(500).send(app.api.erroPadrao());
        });
    } else { 
        res.status(400).send(app.api.erroPadrao()); 
    }
    
}

//Controle de do moduloIQS, tras todos os modulosIQS do banco
api.adicionaPerfilInstituicaoSaude = (req, res) => {
    const knex = app.conexao.knexConnection();
    let instGestor = req.body;
    if (instGestor.cpf && instGestor.idInstituicao_saude) {
        knex('perfis_inst_saude').insert(instGestor)
            .then(result => {
                res.status(200).end();
            })
            .catch(erro => {
                if(erro.errno == 1062){
                    res.status(500).send('Esta instituição já está cadastrada.');
                } else {
                    res.status(500).send(app.api.erroPadrao());
                }
            });
    } else { 
        res.status(400).send(app.api.erroPadrao()); 
    }
}

api.getInstituicoesGestor = (req, res) => {
    let { cpf } =  req.params;
    if (cpf) {
        const connection = app.conexao.mysqlConnectionDB(),
        InstituicaoIRSDAO = new app.infra.instituicaoIRSDAO(connection);

        InstituicaoIRSDAO.listaInstituicoesGestor(cpf, (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send(app.api.erroPadrao());
            }
            res.status(200).json(result);
        });
        connection.end();
    } else {
        res.status(500).send(app.api.erroPadrao());
    }
}

api.deleteInstituicoesGestor = (req, res) => {
    let { cpf, idInst } =  req.params;
    if(cpf && idInst){
        const knex = app.conexao.knexConnection();
        knex('perfis_inst_saude').where('cpf', cpf).andWhere('idInstituicao_saude', idInst).delete()
            .then(resultado => {
                knex.destroy();
                res.status(200).end();
            })
            .catch(erro => {
                console.error(erro);
                knex.destroy();
                res.status(500).send(app.api.erroPadrao());
            });
    } else { 
        res.status(400).send(app.api.erroPadrao()); 
    }
}

    return api;
};