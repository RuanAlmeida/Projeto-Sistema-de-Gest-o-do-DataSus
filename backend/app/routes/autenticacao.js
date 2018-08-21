module.exports = function (application) {
    application.post('/autentica', function (req, res) {
        application.app.controllers.autenticar.autentica(application, req, res);
    });

    // application.use('/irs/*', autenticar.verificaToken);
}