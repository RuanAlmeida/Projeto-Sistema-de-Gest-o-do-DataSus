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
    app.route('/iradarsaude/iradarsaude/enderecoIQS/:cpf')
        .get(enderecos.listaEnderecos);

    // ------------------ ROTAS DE EMPRESA ---------------
    app.route('/iradarsaude/empresa')
        .post(gestores.cadastrarEmpresa);

    // ------------------ ROTAS DE GESTOR ---------------
    app.route('/iradarsaude/gestores')
        .get(gestores.gestores);

    app.route('/iradarsaude/gestor/:cpf')
        .get(gestores.gestor);

    // ------------------ CONTATO DO GESTOR ---------------
    app.route('/iradarsaude/contato/:idGestores')
        .get(gestores.listarContato);

    app.route('/iradarsaude/contato')
        .post(gestores.cadastrarContato);

    app.route('/iradarsaude/contato/:cpf')
        .put(gestores.atualizaContato);

    // rostas para listar todas as instituicoes dos gestores
    app.route('/iradarsaude/gestorInstituicao')
        .get(gestores.instituicoesGestor);

    // inserir novo gestor
    app.route('/iradarsaude/gestorNovo')
        .post(gestores.novoGestor);

    // atualizar novo gestor
    // remove gestor
    app.route('/iradarsaude/gestor/:cpf')
        .put(gestores.updateGestor)
        .delete(gestores.deleteGestor);

    // ROTAS DE ESTADO E MUNICIPIO DOS GESTORES
    app.route('/iradarsaude/estados')
        .get(instituicaoSaude.estado);

    // ROTAS DE ENDERECO
    app.route('/iradarsaude/endereco/:cpf')
        .get(gestores.endereco)
        .put(gestores.atualizaEndereco);

    app.route('/iradarsaude/endereco')
        .post(gestores.novoEndereco);

    app.route('/iradarsaude/instituicao')
        .post(gestores.cadastrarInstituicao);

    // rostas de instituicao
    app.route('/iradarsaude/instituicoesIRS')
        .get(instituicaoIRS.listaInstituicoes);

    // Rota para requisição dos dados da pagina Instituição de saude
    app.route('/iradarsaude/instituicaoSaude/estados')
        .get(instituicaoSaude.estado);

    app.route('/iradarsaude/instituicaoSaude/municipios')
        .get(instituicaoSaude.municipios);

    app.route('/iradarsaude/instituicaoSaude/tipoInstituicao')
        .get(instituicaoSaude.tipoInstituicao);


    //////////////////////////////////////////////////
    ////               INSTITUIÇÃO                ////
    //////////////////////////////////////////////////

    // Trás todas as intituições IQS
    app.route('/iradarsaude/instituicaoSaude/instituicoesIQS')
        .get(instituicaoSaude.instituicoesIQS);

    app.route('/iradarsaude/instituicaoSaude/instituicao')
        .get(instituicaoSaude.instituicao)
        .post(instituicaoIRS.adicionaPerfilInstituicaoSaude);

    app.route('/iradarsaude/instituicaoSaude/listaInstByParams')
        .get(instituicaoSaude.listaInstByParams);

    app.route('/iradarsaude/instituicaoSaude/bairros/:id')
        .get(instituicaoSaude.bairros);

    //Trás as instituições relacionadas ao gestor
    app.route('/iradarsaude/instituicoesGestor/:cpf')
        .get(instituicaoIRS.getInstituicoesGestor);

    //Deleta a instituição relacionada ao gestor
    app.route('/iradarsaude/instituicaoGestor/:cpf/:idInst')
        .delete(instituicaoIRS.deleteInstituicoesGestor);

    //Adiciona o bairro no banco de dados caso não exista
    app.route('/iradarsaude/bairro')
        .post(instituicaoIRS.adicionaBairro);

    //Adiciona o tipo de instituição no banco de dados caso não exista
    app.route('/iradarsaude/tipoInstituicao')
        .post(instituicaoIRS.adicionaTipoInstituicao);

    //Adiciona a instituição de saúde no banco de dados caso não exista
    app.route('/iradarsaude/instituicaoSaude')
        .post(instituicaoIRS.adicionaInstituicaoSaude);
        
     //////////////////////////////////////////////////
        
    app.route('/iradarsaude/instituicaoSaude/estadosAtualizados/:ufId')
        .get(instituicaoSaude.estadosAtualizados);

    app.route('/iradarsaude/instituicaoSaude/municipiosAtualizados/:municipioId')
        .get(instituicaoSaude.municipiosAtualizados);

    app.route('/iradarsaude/instituicaoSaude/tipoInstituicaoAtualizada/:tipoId')
        .get(instituicaoSaude.tipoInstituicaoAtualizada);

    app.route('/iradarsaude/instituicaoSaude/tipoInstituicaoAtualizada/:tipoId/:idMunicipio')
        .get(instituicaoSaude.tipoInstituicaoAtualizadaUf);

    app.route('/iradarsaude/instituicaoSaude/instituicaoAtualizada/:instituicaoId')
        .get(instituicaoSaude.instituicaoAtualizada);

    app.route(`/instituicaoSaude/bairroAtualizado/:id_uf/:id_municipio/:no_bairro/:id_tipo_unidade/:id_unidade`)
        .get(instituicaoSaude.bairroAtualizado);

    // rostas de modulosIQS
    app.route('/iradarsaude/perspectivaAvaliativa')
        .get(modulosIQS.perspectivaAvaliativa);

    app.route('/iradarsaude/abrangenciaVisoes')
        .get(modulosIQS.abrangenciaVisoes);

    app.route('/iradarsaude/dimenssaoAnalitica')
        .get(modulosIQS.dimenssaoAnalitica);

    // rostas de modulosIRS   
    app.route('/iradarsaude/modulosIRS')
        .get(modulosIRS.modulosIRS);

    // rostas de ufs
    app.route('/iradarsaude/municipiosLocal')
        .get(municipios.municipios);

    app.route('/iradarsaude/ufs')
        .get(municipios.ufs);

    // rostas de perfis
    app.route('/iradarsaude/perfis')
        .get(perfil.perfil);

}