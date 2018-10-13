const pg = require('pg');	
 //conexão com o banco	
var connPG = function(){	
	const config = {	
        host: '', //host
        user: '', //usuário
        password: '',	//senha
        database: '', //nome do banco de dados
        port: 5432 //porta
    };	
    return pool = new pg.Pool(config);	
}	
module.exports = () => {	
    return connPG;	
} 