const pg = require('pg');	
 //conexão com o banco	
var connPG = function(){	
	const config = {	
        host: '',	
        user: '',	
        database: '',	
        password: '',	
        port: 	
    };	
    return pool = new pg.Pool(config);	
}	
module.exports = function () {	
    return connPG;	
} 