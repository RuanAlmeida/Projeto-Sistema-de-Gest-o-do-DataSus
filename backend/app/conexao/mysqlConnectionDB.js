//Carrega o modulo do mysql.
const mysql = require('mysql');

//Cria a conexão com o Banco de Dados.

//Caso tenha erro: Client does not support authentication protocol requested by server; consider upgrading MySQL client   
//usar na linnha de comando do MySql: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'novaSenha';
const connectMYSQL = () => {
	return mysql.createConnection({
		host: '', //host
		user: '', //usuário
		password: '', //senha
		database: '', //nome do banco de dados
		port: 3306, //porta
		multipleStatements: true
	});
};

//Retorna a conexão.
module.exports = () => {
	return connectMYSQL;
};
