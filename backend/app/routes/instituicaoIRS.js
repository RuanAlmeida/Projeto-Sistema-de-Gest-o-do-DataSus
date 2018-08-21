// rostas de instituicao
module.exports = function (application) {
    application.get('/institucaoIRS', function (req, res) {
        application.app.controllers.instituicaoIRS.intiuicaoIRS(application, req, res);
    });
}