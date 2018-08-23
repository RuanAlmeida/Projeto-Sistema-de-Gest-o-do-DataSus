module.exports = function(app){
    let api = {};

    //tras todos os municipios do banco
    api.municipios = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        municipiosDAO = new app.infra.municipiosDAO(connection);
    
        municipiosDAO.listaMinicipios((error, result) => {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            }
            res.status(200).send(result);
        });
        connection.end();
    }

    //tras todos as ufs do banco
    api.ufs = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        municipiosDAO = new app.infra.municipiosDAO(connection);
    
        municipiosDAO.listaUfs((error, result) => {
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
