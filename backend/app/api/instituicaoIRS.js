module.exports = function(app){
    let api = {};

//Controle de do moduloIQS, tras todos os modulosIQS do banco
    api.intiuicaoIRS = (req, res) => {
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

    return api;
};