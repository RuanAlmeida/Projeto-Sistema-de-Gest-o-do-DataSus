// rostas de perfis
module.exports = function (application) {
    application.get('/perfis', function (req, res) {
        application.app.controllers.perfil.perfil(application, req, res);
    });
}