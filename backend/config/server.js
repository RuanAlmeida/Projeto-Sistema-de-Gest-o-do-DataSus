const app = require('express')(),
	  consign = require('consign'),
      cors = require('cors'),
      bodyParser = require('body-parser');
	  
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});

app.set('secret', '');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

consign()
    .include('app/routes')
    .then('config/conexaoBD.js')
    .then('config/dbConnection.js')
    .then('config/conexaoBDKnex.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app;