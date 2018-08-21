//Carrega o modulo do knex.
var knex = require('knex');

//Cria conexão com o Banco de Dados MySql.
var connectKnex = function(){
    return knex({
        client: '',
        connection: {
            host: '',
            user: '',
			password: '',
			database: ''
        }
    });
}

//Retorna a conexão.
module.exports = function(){
	return connectKnex;
};