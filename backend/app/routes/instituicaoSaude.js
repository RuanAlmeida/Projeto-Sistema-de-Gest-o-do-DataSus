// Rota para requisição dos dados da pagina Instituição de saude

module.exports = function (application) {
    application.get('/instituicaoSaude/estados', function (req, res) {
        application.app.controllers.instituicaoSaude.estado(application, req, res);
    });
    application.get('/instituicaoSaude/municipios', function (req, res) {
        application.app.controllers.instituicaoSaude.municipio(application, req, res);
    });
    application.get('/instituicaoSaude/tipoInstituicao', function (req, res) {
        application.app.controllers.instituicaoSaude.tipoInstituicao(application, req, res);
    });
    application.get('/instituicaoSaude/instituicao/:municipio/:bairro/:tipo', function (req, res) {
        application.app.controllers.instituicaoSaude.instituicao(application, req, res);
    });
    application.get('/instituicaoSaude/bairros/:id', function (req, res) {
        application.app.controllers.instituicaoSaude.bairros(application, req, res);
    });


    application.get('/instituicaoSaude/estadosAtualizados/:ufId', function (req, res) {
        application.app.controllers.instituicaoSaude.estadosAtualizados(application, req, res);
    });
    application.get('/instituicaoSaude/municipiosAtualizados/:municipioId', function (req, res) {
        application.app.controllers.instituicaoSaude.municipiosAtualizados(application, req, res);
    });
    application.get('/instituicaoSaude/tipoInstituicaoAtualizada/:tipoId', function (req, res) {
        application.app.controllers.instituicaoSaude.tipoInstituicaoAtualizada(application, req, res);
    });
    application.get('/instituicaoSaude/tipoInstituicaoAtualizada/:tipoId/:idMunicipio', function (req, res) {
        application.app.controllers.instituicaoSaude.tipoInstituicaoAtualizadaUf(application, req, res);
    });
    application.get('/instituicaoSaude/instituicaoAtualizada/:instituicaoId', function (req, res) {
        application.app.controllers.instituicaoSaude.instituicaoAtualizada(application, req, res);
    });
    application.get(`/instituicaoSaude/bairroAtualizado/:id_uf/:id_municipio/:no_bairro/:id_tipo_unidade/:id_unidade`, function (req, res) {
        application.app.controllers.instituicaoSaude.bairroAtualizado(application, req, res);
    });
}