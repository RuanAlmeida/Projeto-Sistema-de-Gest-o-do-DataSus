module.exports = function(app){
    let api = {};

    //Controle da perspectivaAvaliativa, tras todos os modulosIQS do banco
    api.perspectivaAvaliativa = (req, res) => {
        connection = app.conexao.mysqlConnectionDB(),
        modulosIQSDAO = new app.infra.modulosIQSDAO(connection);
    
        modulosIQSDAO.listarPerspectivaAvaliativa((error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).send(result);
        });
        connection.end();
    }

    //Controle da abrangenciaVisoes, tras todos os modulosIQS do banco
    api.abrangenciaVisoes = (req, res) => {
        connection = app.conexao.mysqlConnectionDB(),
        modulosIQSDAO = new app.infra.modulosIQSDAO(connection);
    
        modulosIQSDAO.listarAbrangenciaVisoes((error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).send(result);
        });
        connection.end();
    }

    //Controle da dimenssaoAnalitica, tras todos os modulosIQS do banco
    api.dimenssaoAnalitica = (req, res) => {
        connection = app.conexao.mysqlConnectionDB(),
        modulosIQSDAO = new app.infra.modulosIQSDAO(connection),
        params = req.params;
    
        modulosIQSDAO.listarDimenssaoAnalitica(params ,(error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).send(result);
        });
        connection.end();
    }

    return api;
};
