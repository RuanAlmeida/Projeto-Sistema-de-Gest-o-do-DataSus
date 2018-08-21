// rostas de modulosIRS
module.exports = function (application) {
    application.get('/modulosIRS', function (req, res) {
        application.app.controllers.modulosIRS.modulosIRS(application, req, res);
    });
}