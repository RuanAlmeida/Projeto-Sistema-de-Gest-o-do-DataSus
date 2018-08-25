module.exports = function(app){
    let api = {};

    // Traz os municipios do banco IQuality
    api.municipios = (req, res) => {
        const connection = app.conexao.postgresqlConnectionDB(),
        gestoresDAO = new app.infra.gestoresDAO(connection);

        gestoresDAO.listaMunicipios((error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).send(result);
        });
        connection.end();
    }

    // Cadastra a empresa
    api.cadastrarEmpresa = (req, res) => {
        const empresa = req.body,
        connection = app.conexao.mysqlConnectionDB(),
        gestoresDAO = new app.infra.gestoresDAO(connection);

        gestoresDAO.cadastrarEmpresa(empresa, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).send(result);
        });
        connection.end();
    }

    //Controle de gestores, retorna todos os gestores
    api.gestores = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        gestoresDAO = new app.infra.gestoresDAO(connection);

        gestoresDAO.listaGestores((error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).send(result);
        });
        connection.end();
    }

    //Controle de gestores, retorna os dados do gestor de acordo com id
    api.gestor = (req, res) => {
        const { cpf } = req.params,
        connection = app.conexao.mysqlConnectionDB(),
        gestoresDAO = new app.infra.gestoresDAO(connection);

        gestoresDAO.listaGestor(cpf, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).send(result);
        });
        connection.end();
    }
    
    //Controle de gestores, insere os dados do gestor e retornar falha ou sucesso
    api.novoGestor = (req, res) => {
        const gestor = req.body;
        connection = app.conexao.mysqlConnectionDB(),
        gestoresDAO = new app.infra.gestoresDAO(connection);

        gestoresDAO.cadastrarGestor(gestor, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).send(result);
        });
        connection.end();
    }

    //Controle de gestores, insere os dados do gestor e retornar falha ou sucesso
    api.updateGestor = (req, res) => {
        const params = req.params,
        gestor = req.body,
        connection = app.conexao.mysqlConnectionDB(),
        gestoresDAO = new app.infra.gestoresDAO(connection);

        gestoresDAO.atualizarGestor(params, gestor, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).send(req.params);
        });
        connection.end();
    }

    //Controle de gestores, remove o gestor passando seu cpf e cnpj
    api.deleteGestor = (req, res) => {
        const params = req.params,
        connection = app.conexao.mysqlConnectionDB(),
        gestoresDAO = new app.infra.gestoresDAO(connection);

        gestoresDAO.removeGestor(params, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).send(req.params);
        });
        connection.end();
    }

    //Controle de gestores, lista todas as instituicoes dos gestores
    api.instituicoesGestor = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        gestoresDAO = new app.infra.gestoresDAO(connection);   
    
        gestoresDAO.listaInstituicoes((error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).send(result);
        });
        connection.end();
    }

    api.estados = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        gestoresDAO = new app.infra.gestoresDAO(connection);
    
        gestoresDAO.listarEstados((error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).send(result.rows);
        });
        connection.end();
    }

    api.endereco = (req, res) => {
        const params = req.params,
        connection = app.conexao.mysqlConnectionDB(),
        gestoresDAO = new app.infra.gestoresDAO(connection);
    
        gestoresDAO.listaEndereco(params, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).send(result);
        });
        connection.end();
    }

    api.novoEndereco = (req, res) => {
        var endereco = req.body,
        connection = app.conexao.mysqlConnectionDB(),
        gestoresDAO = new app.infra.gestoresDAO(connection);

        gestoresDAO.novoEndereco(endereco, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).send({ cpf: endereco.cpf });
        });
        connection.end();
    }

    api.atualizaEndereco = (req, res) => {
        var params = req.params,
        endereco = req.body,
        connection = app.conexao.mysqlConnectionDB(),
        gestoresDAO = new app.infra.gestoresDAO(connection);
    
        gestoresDAO.atualizaEndereco(params, endereco, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).send(result);
        });
        connection.end();
    }

    api.listarContato = (req, res) => {
        finalContatos = [],
        params = req.params,
        connection = app.conexao.mysqlConnectionDB(),
        gestoresDAO = new app.infra.gestoresDAO(connection);
    
        gestoresDAO.listaContatoTelefone(params, (error1, resultTelefone) => {
            gestoresDAO.listaContatoEmail(params, (error2, resultEmail) => {
                console.log('telefone', resultTelefone);
                console.log('email', resultEmail);
                if (resultTelefone.length === resultEmail.length) {
                    for (let i = 0; i < resultTelefone.length; i++) {
                        finalContatos[i] = {
                            telefone: resultTelefone[i].telefone,
                            tipo: resultTelefone[i].tipo,
                            email: resultEmail[i].email,
                            idemail  : resultEmail[i].idemail,
                            idtelefone : resultTelefone[i].idtelefones
                        }
                    }
                }
                if (error2 || error1) {
                    console.log(error2 || error1);
                    res.status(400).send(error2 || error1);
                }
                res.status(200).send(finalContatos);
            });
        });
        connection.end();
    }

    api.cadastrarContato = (req, res) => {
        const contato = req.body,
        connection = app.conexao.mysqlConnectionDB(),
        gestoresDAO = new app.infra.gestoresDAO(connection);

        gestoresDAO.cadastrarContato(contato, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).end();
    });
        connection.end();
    }

    api.atualizaContato = (req, res) => {
        const params = req.params,
        contato = req.body,
        connection = app.conexao.mysqlConnectionDB(),
        gestoresDAO = new app.infra.gestoresDAO(connection);

        gestoresDAO.atualizaContato(params, contato, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        }
        res.status(200).send(result);
    });
        connection.end();
    }

    api.cadastrarInstituicao = (req, res) => {
        const instituicao = req.body,
        connection = app.conexao.mysqlConnectionDB(),
        gestoresDAO = new app.infra.gestoresDAO(connection);
    
        gestoresDAO.verificaIdTipoInstituicao(instituicao, (error, resultTipoInst) => {
    
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            if (resultTipoInst[0]) {
                gestoresDAO.cadastrarInstituicao(instituicao, resultTipoInst[0], (error, existente) => {
                    if (error) {
                        console.log(error);
                        res.status(400).send(error);
                    }
                    res.status(200).send(existente);
                });
    
            } else {
                gestoresDAO.cadastrarInstituicao(instituicao, !resultTipoInst[0], (error, result) => {
                    if (error) {
                        console.log(error);
                        res.status(400).send(error);
                    }
                    res.status(200).send(result);
                });
            }
        });
        connection.end();
    }

    return api;
};
