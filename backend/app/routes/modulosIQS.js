
// rostas de modulosIQS
module.exports = function (application) {
    application.get('/perspectivaAvaliativa', function (req, res) {
        application.app.controllers.modulosIQS.perspectivaAvaliativa(application, req, res);
    });

// rostas de modulosIQS
    application.get('/abrangenciaVisoes', function (req, res) {
        application.app.controllers.modulosIQS.abrangenciaVisoes(application, req, res);
    });

// rostas de modulosIQS
    application.get('/dimenssaoAnalitica', function (req, res) {
        application.app.controllers.modulosIQS.dimenssaoAnalitica(application, req, res);
    });
}

