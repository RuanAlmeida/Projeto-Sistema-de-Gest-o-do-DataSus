module.exports = function(app){
    var autenticar = app.api.autenticar;

    app.route('/autentica')
        .post(autenticar.autentica);

    app.use('/iradarsaude/*', autenticar.verificaToken);

    // app.route('/iradarsaude/deslogar')
    //     .post(autenticar.desloga);
}