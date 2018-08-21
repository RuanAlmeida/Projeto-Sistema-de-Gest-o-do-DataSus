var jwt = require('jsonwebtoken');

module.exports = function(app){
    let api = {};

    //Valida o Login do Usuário e cria o Token de acesso. 
    api.autentica = (app, req, res) => {
    	var connection = app.config.conexaoBD();
        const gestoresDAO = new app.app.models.gestoresDAO(connection);
        var user = req.body;
        console.log('usuario', user);

        gestoresDAO.listaGestores((erro, resultado) => {
            if (erro){
                console.log(erro);
                res.sendStatus(500);
            }else{
                var usuario = resultado.find((usuario) => usuario.login == user.login && usuario.password == user.senha);

                if(!usuario){
                    res.sendStatus(401);
                }else{
                    var token = jwt.sign({login: usuario.login}, app.get('secret'), { expiresIn: 950400 }); //28800 = 8H
                    console.log(token);
                    res.set({'x-access-token': token});
                    res.status(200).json(token);
                }
            }
        });
        connection.end();
    };


    //Verifica o Token de acesso do Usuário.
    api.verificaToken = (app, req, res, next) => {
        var token = req.headers['x-access-token'];
        
        if(req.headers['access-control-request-headers'])
        return next();
        
        if(token){
            jwt.verify(token, app.get('secret'), (erro, decoded) => {
                if(erro){
                    return res.sendStatus(401);
                }else{
                    req.usuario = decoded;
                    next();
                }
            });
        }else{
            return res.sendStatus(401);
        }
        
    };

    return api;
}