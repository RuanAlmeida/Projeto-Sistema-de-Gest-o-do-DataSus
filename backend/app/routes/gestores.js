module.exports = function (application) {

    // ------------------ ROTAS DE GENÉRICAS ---------------

    application.get('/municipios', function (req, res) {
        application.app.controllers.gestores.municipios(application, req, res);
    });
    
    
    
    // ------------------ ROTAS DE EMPRESA ---------------
    
    
    application.post('/empresa', function (req, res) {
        application.app.controllers.gestores.cadastrarEmpresa(application, req, res);
    });


    // ------------------ ROTAS DE GESTOR ---------------
    application.get('/gestores', function (req, res) {
        application.app.controllers.gestores.gestores(application, req, res);
    });

    application.get('/gestor/:cpf', function (req, res) {
        application.app.controllers.gestores.gestor(application, req, res);
    });




    
      // -------------  CONTATO DO GESTOR ---------------
    application.get('/contato/:cpf', function (req, res) {
        application.app.controllers.gestores.listarContato(application, req, res);
    });
    application.post('/contato', function (req, res) {
        application.app.controllers.gestores.cadastrarContato(application, req, res);
    });
    application.put('/contato/:cpf', function (req, res) {
        application.app.controllers.gestores.atualizaContato(application, req, res);
    });

    

    // rostas para listar todas as instituicoes dos gestores
    application.get('/gestorInstituicao', function (req, res) {
        application.app.controllers.gestores.instituicoesGestor(application, req, res);
    });

    // inserir novo gestor
    application.post('/gestorNovo', function (req, res) {
        application.app.controllers.gestores.novoGestor(application, req, res);
    });

    // atualizar novo gestor
    application.put('/gestor/:cpf', function (req, res) {
        application.app.controllers.gestores.updateGestor(application, req, res);
    });

    // remove gestor
    application.delete('/gestor/:cpf', function (req, res) {
        application.app.controllers.gestores.deleteGestor(application, req, res);
    });



    // ROTAS DE ESTADO E MUNICIPIO DOS GESTORES
    application.get('/estados', function (req, res) {
        application.app.controllers.gestores.estados(application, req, res);
    });

    // application.get('/municipios/:id_uf', function (req, res) {
    //     application.app.controllers.gestores.municipios(application, req, res);
    // });


    // ROTAS DE ENDERECO
    application.get('/endereco/:cpf', function (req, res) {
        application.app.controllers.gestores.endereco(application, req, res);
    });

    application.post('/endereco', function (req, res) {
        application.app.controllers.gestores.novoEndereco(application, req, res);
    });

    application.put('/endereco/:cpf', function (req, res) {
        application.app.controllers.gestores.atualizaEndereco(application, req, res);
    });




    application.post('/instituicao', function (req, res) {
        application.app.controllers.gestores.cadastrarInstituicao(application, req, res);
    });

}
