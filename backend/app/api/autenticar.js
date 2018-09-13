var jwt = require('jsonwebtoken'),
    passwordHash = require('password-hash');

module.exports = function(app){
    let api = {};

    //Valida o Login do Usuário e cria o Token de acesso. 
    api.autentica = (req, res) => {
    	const knex = app.conexao.conexaoBDKnex();
        var user = req.body;

        knex.select('*').from('gestores').where('login', user.login)
            .then(resultado => {
                knex.destroy();
                if(resultado[0]){
                        if(resultado[0].password === user.password){
                            var token = jwt.sign({login: resultado[0].login}, app.get('secret'), { expiresIn: 43200 }); //28800s = 8H
                            res.set({'x-access-token': token});
                            
                            idGestores_cript = passwordHash.generate(resultado[0].idGestores.toString(), {saltLength: 100});

                            console.log(`O usuário ${resultado[0].nome} acabou de logar.`);
                            res.status(200).json({token, 'idGestores': resultado[0].idGestores, 'nome': resultado[0].nome, idGestores_cript});

                        } else { res.status(401).send('Senha incorreta'); }

                } else { res.status(401).send('Este login não existe.'); }

            })
            .catch(erro => {
                console.log(erro);
                knex.destroy();
                res.status(500).send(app.api.erroPadrao());
            });
    };

    //Exibe o nome do usuário que deslogou.
    // api.desloga = (req, res) => {
    //     const knex = app.conexao.conexaoBDKnex();
    //     const cod_usuario = req.body.cod_usuario;

    //     knex.select('nome').from('gestores').where('idGestores', idGestores)
    //         .then(resultado => {
    //             console.log(`O usuário ${resultado[0].nome} acabou de deslogar.`);
    //             res.status(200).end();
    //         })
    //         .catch(erro => {
    //             console.log(erro);
    //             knex.destroy();
    //             res.status(500).send(app.api.erroPadrao());
    //         });
    // }

    //Verifica o Token de acesso do Usuário.
    api.verificaToken = (req, res, next) => {
        let token = req.headers['x-access-token'];
        let idGestores = req.headers['id-gestores']
        let idGestores_cript = req.headers['id-gestores-cript'];
        
        if(req.headers['access-control-request-headers'])
        return next();
        
        if(token){
            jwt.verify(token, app.get('secret'), (erro, decoded) => {
                if(erro){
                    return res.sendStatus(401);
                }else{
                    if(passwordHash.verify(idGestores, idGestores_cript)){
                        req.usuario = decoded;
                        next();
                    }else{
                        return res.sendStatus(401);
                    }
                }
            });
        } else {
            return res.sendStatus(401);
        }
        
    };

    return api;
}