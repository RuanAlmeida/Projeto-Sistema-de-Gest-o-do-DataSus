module.exports = (app) => {

    let enderecos = app.api.enderecos,
    gestores = app.api.gestores,
    instituicaoIRS = app.api.instituicaoIRS,
    instituicaoSaude = app.api.instituicaoSaude,
    modulosIQS = app.api.modulosIQS,
    modulosIRS = app.api.modulosIRS,
    municipios = app.api.municipios,
    perfil = app.api.perfil;

    //*************** Rotas em endereco ***************//
    //Enderecos
    app.route('/enderecoIQS/:cpf')
        .get(enderecos.listaEnderecos);

    // ------------------ ROTAS DE GENÉRICAS ---------------
    app.route('/municipios')
        .get(gestores.municipios);

    // ------------------ ROTAS DE EMPRESA ---------------
    app.route('/empresa')
        .post(gestores.cadastrarEmpresa);

    // ------------------ ROTAS DE GESTOR ---------------
    app.route('/gestores')
        .get(gestores.gestores);

    app.route('/gestor/:cpf')
        .get(gestores.gestor);

    // ------------------ CONTATO DO GESTOR ---------------
    app.route('/contato/:idGestores')
        .get(gestores.listarContato);

    app.route('/contato')
        .post(gestores.cadastrarContato);

    app.route('/contato/:cpf')
        .put(gestores.atualizaContato);

    // rostas para listar todas as instituicoes dos gestores
    app.route('/gestorInstituicao')
        .get(gestores.instituicoesGestor);

    // inserir novo gestor
    app.route('/gestorNovo')
        .post(gestores.novoGestor);

    // atualizar novo gestor
    // remove gestor
    app.route('/gestor/:cpf')
        .put(gestores.updateGestor)
        .delete(gestores.deleteGestor);

    // ROTAS DE ESTADO E MUNICIPIO DOS GESTORES
    app.route('/estados')
        .get(gestores.estados);

    // ROTAS DE ENDERECO
    app.route('/endereco/:cpf')
        .get(gestores.endereco)
        .put(gestores.atualizaEndereco);

    app.route('/endereco')
        .post(gestores.novoEndereco);

    app.route('/instituicao')
        .post(gestores.cadastrarInstituicao);

    // rostas de instituicao
    app.route('/institucaoIRS')
        .get(instituicaoIRS.intiuicaoIRS);

    // Rota para requisição dos dados da pagina Instituição de saude
    app.route('/instituicaoSaude/estados')
        .get(instituicaoSaude.estado);

    app.route('/instituicaoSaude/municipios')
        .get(instituicaoSaude.municipio);

    app.route('/instituicaoSaude/tipoInstituicao')
        .get(instituicaoSaude.tipoInstituicao);

    app.route('/instituicaoSaude/instituicao/:municipio/:bairro/:tipo')
        .get(instituicaoSaude.instituicao);

    app.route('/instituicaoSaude/bairros/:id')
        .get(instituicaoSaude.bairros);
        
    app.route('/instituicaoSaude/estadosAtualizados/:ufId')
        .get(instituicaoSaude.estadosAtualizados);

    app.route('/instituicaoSaude/municipiosAtualizados/:municipioId')
        .get(instituicaoSaude.municipiosAtualizados);

    app.route('/instituicaoSaude/tipoInstituicaoAtualizada/:tipoId')
        .get(instituicaoSaude.tipoInstituicaoAtualizada);

    app.route('/instituicaoSaude/tipoInstituicaoAtualizada/:tipoId/:idMunicipio')
        .get(instituicaoSaude.tipoInstituicaoAtualizadaUf);

    app.route('/instituicaoSaude/instituicaoAtualizada/:instituicaoId')
        .get(instituicaoSaude.instituicaoAtualizada);

    app.route(`/instituicaoSaude/bairroAtualizado/:id_uf/:id_municipio/:no_bairro/:id_tipo_unidade/:id_unidade`)
        .get(instituicaoSaude.bairroAtualizado);

    // rostas de modulosIQS
    app.route('/perspectivaAvaliativa')
        .get(modulosIQS.perspectivaAvaliativa);

    app.route('/abrangenciaVisoes')
        .get(modulosIQS.abrangenciaVisoes);

    app.route('/dimenssaoAnalitica')
        .get(modulosIQS.dimenssaoAnalitica);

    // rostas de modulosIRS   
    app.route('/modulosIRS')
        .get(modulosIRS.modulosIRS);

    // rostas de ufs
    app.route('/municipios')
        .get(municipios.municipios);

    app.route('/ufs')
        .get(municipios.ufs);

    // rostas de perfis
    app.route('/perfis')
        .get(perfil.perfil);

}