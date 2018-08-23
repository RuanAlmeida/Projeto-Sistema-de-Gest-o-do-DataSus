const app = require('express')(),
	  consign = require('consign'),
      cors = require('cors'),
      bodyParser = require('body-parser');
      
//Configuração do Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});

//Chave do token
app.set('secret', '');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

consign({cwd: 'app'})
    .include('conexao')
    .then('infra')
    .then('api')
	.then('routes')
    .into(app);

module.exports = app;