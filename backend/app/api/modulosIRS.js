module.exports = function(app){
    let api = {};

//Controle de gestores, retorna os dados do gestor de acordo com id
    api.modulosIRS = (req, res) => {
        const connection = app.conexao.mysqlConnectionDB(),
        modulosIRSDAO = new app.infra.modulosIRSDAO(connection);

        modulosIRSDAO.listaModuloIRS((error, result) => {
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