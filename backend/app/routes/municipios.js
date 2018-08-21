// rostas de ufs
module.exports = function (application) {
    application.get('/municipios', function (req, res) {
        application.app.controllers.municipios.municipios(application, req, res);
    });
    application.get('/ufs', function (req, res) {
        application.app.controllers.municipios.ufs(application, req, res);
    });
}