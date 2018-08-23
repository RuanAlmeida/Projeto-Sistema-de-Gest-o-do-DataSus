function GestoresDAO(connection) {
    this._connection = connection;
}

//-------------- QUERYS GENÉRICAS  -------------
GestoresDAO.prototype.listaMunicipios = function (callback) {
    this._connection.query(`SELECT * FROM sistemagestaodb.municipios`, callback);
}

GestoresDAO.prototype.listarEstados = function (callback) {
    this._connection.query(`SELECT id_uf, uf_sigla, dbgeral.tb_regiao.no_regiao FROM dbgeral.tb_uf INNER JOIN dbgeral.tb_regiao ON dbgeral.tb_uf.id_regiao = dbgeral.tb_regiao.id_regiao `, callback);
}


//--------------ADMINISTAÇÃO - PÁGINA PRINCIPAL-------------
GestoresDAO.prototype.listaGestores = function (callback) {
    this._connection.query(`SELECT * FROM sistemagestaodb.gestores`, callback);
}

GestoresDAO.prototype.removeGestor = function (params, callback) {
    this._connection.query(`
    DELETE FROM sistemagestaodb.endereco WHERE (cpf = '${params.cpf}'); 
    DELETE FROM sistemagestaodb.contatos WHERE (cpf = '${params.cpf}'); 
    DELETE FROM sistemagestaodb.gestores WHERE (cpf = '${params.cpf}');`, callback);
}


//--------------GESTOR - ABA EMRPESA  -------------

GestoresDAO.prototype.cadastrarEmpresa = function (empresa, callback) {
    this._connection.query(`
    INSERT INTO sistemagestaodb.enderecos (endereco, numero, complemento, cep, idibge) VALUES ('${empresa.endereco}', '${empresa.numero}', '${empresa.complemento}', '${empresa.cep}', '${empresa.idibge}');
    SET @idEnderecos = LAST_INSERT_ID();
    INSERT INTO sistemagestaodb.empresas_trabalho (cnpj, razao_social, num_cnes, idEnderecos) VALUES ('${empresa.cnpj}', '${empresa.razao_social}', '${empresa.num_cnes}', @idEnderecos);`
        , callback);
}

//--------------GESTOR - ABA GESTOR  -------------

GestoresDAO.prototype.cadastrarGestor = function (gestor, callback) {
    console.log(gestor)
    this._connection.query(`INSERT INTO sistemagestaodb.gestores(cpf, nome, login, password, cargo, cnpj, idEnderecos) VALUES (${gestor.cpf}, '${gestor.nome}', '${gestor.login}', '${gestor.password}', '${gestor.cargo}', ${gestor.cnpj} , ${gestor.idEnderecos});`, callback);
}



//--------------GESTOR - ABA ENDEREÇO  -------------

GestoresDAO.prototype.listaEndereco = function (params, callback) {
    this._connection.query(`SELECT * FROM sistemagestaodb.enderecos where cpf = '${params.cpf}'`, callback);
}

GestoresDAO.prototype.novoEndereco = function (endereco, callback) {
    console.log(endereco)
    this._connection.query(`  INSERT INTO sistemagestaodb.enderecos (endereco, numero, complemento, cep, idibge) VALUES ('${endereco.endereco}', '${endereco.numero}', '${endereco.complemento}', '${endereco.cep}', '${endereco.idibge}');`, callback);
}

GestoresDAO.prototype.atualizaEndereco = function (params, endereco, callback) {
    this._connection.query(`UPDATE sistemagestaodb.enderecos SET endereco = '${endereco.endereco}', numero = '${endereco.numero}', bairro = '${endereco.bairro}', complemento = '${endereco.complemento}', uf = '${endereco.uf}', municipio = '${endereco.municipio}', cep = '${endereco.cep}' WHERE cpf = '${params.cpf}';`, callback);
}


//--------------GESTOR - ABA CONTATO  -------------
GestoresDAO.prototype.listaContatoTelefone = function (params, callback) {
    this._connection.query(`
    SELECT telefone, tipo, idtelefones FROM gestores
    INNER JOIN telefones ON telefones.idGestores = gestores.idGestores
    where gestores.idGestores = ${params.idGestores};`,
        callback);
}

GestoresDAO.prototype.listaContatoEmail = function (params, callback) {
    this._connection.query(`
    SELECT email, idemail FROM gestores
    INNER JOIN emails ON emails.idGestores = gestores.idGestores
    where emails.idGestores = ${params.idGestores};`,
        callback);
}

GestoresDAO.prototype.cadastrarContato = function (contato, callback) {
    this._connection.query(`
    INSERT INTO sistemagestaodb.emails (email, idGestores) VALUES ('${contato.email}', '${contato.idGestores}' );
    INSERT INTO sistemagestaodb.telefones (telefone, tipo, idGestores) VALUES ('${contato.telefone}','${contato.tipo}', '${contato.idGestores}' );`,
        callback);
}

GestoresDAO.prototype.atualizaContato = function (params, contato, callback) {
    this._connection.query(`UPDATE sistemagestaodb.contatos SET email = '${contato.email}', telefone = '${contato.telefone}', telefone2 = '${contato.telefone2}' WHERE cpf = '${params.cpf}';`, callback);
}



GestoresDAO.prototype.listarMunicipios = function (params, callback) {
    this._connection.query(`SELECT id_municipio, no_mun_completo FROM dbgeral.tb_municipio where id_uf = '${params.id_uf}' `, callback);
}

GestoresDAO.prototype.listaGestor = function (cpf, callback) {
    this._connection.query(`SELECT * FROM sistemagestaodb.gestores WHERE cpf = '${cpf}'`, callback);
}

GestoresDAO.prototype.listaInstituicoes = function (callback) {
    this._connection.query(`SELECT * FROM sistemagestaodb.instituicoes`, callback);
}



GestoresDAO.prototype.atualizarGestor = function (params, gestor, callback) {
    this._connection.query(`UPDATE sistemagestaodb.gestores SET nome = '${gestor.nome}', login = '${gestor.login}', password = '${gestor.password}', cargo = '${gestor.cargo}', funcao = '${gestor.funcao}' WHERE (cpf = '${params.cpf}') and (cnpj = '${gestor.cnpj}');`, callback);
}


GestoresDAO.prototype.verificaIdTipoInstituicao = function (contato, callback) {
    this._connection.query(`SELECT * FROM sistemagestaodb.tipo_instituicao where descricao = '${contato.ds_tipo_unidade}'`, callback);
}

GestoresDAO.prototype.cadastrarInstituicao = function (contato, condicao, callback) {

    // arrumar
    if (!!condicao.idtipo_Instituicao) {
        this._connection.query(`
        INSERT INTO sistemagestaodb.instituicao_saude (descricao, idtipo_Instituicao) 
        SELECT '${contato.no_fantasia}', ${condicao.idtipo_Instituicao}  WHERE NOT EXISTS (SELECT 1 FROM sistemagestaodb.instituicao_saude WHERE descricao = '${contato.no_fantasia}');
        SET @instituicao_saude = LAST_INSERT_ID();
        INSERT INTO sistemagestaodb.localidade_inst_saude (idInstituicao_saude, uf, municipio, bairro) 
        SELECT @instituicao_saude, '${contato.uf_sigla}', '${contato.no_municipio}',  '${contato.no_bairro}' WHERE NOT EXISTS  (SELECT 1 FROM sistemagestaodb.localidade_inst_saude WHERE municipio = '${contato.no_municipio}');
        INSERT INTO sistemagestaodb.perfis_inst_saude (idInstituicao_saude, idperfil) VALUES (@instituicao_saude , '1');       
        `, callback);


    } else {
        this._connection.query(`
        INSERT INTO sistemagestaodb.tipo_instituicao (descricao) VALUES ('${contato.ds_tipo_unidade}');
        SET @tipo_instituicao = LAST_INSERT_ID();

        INSERT INTO sistemagestaodb.instituicao_saude (descricao,  idtipo_Instituicao) SELECT '${contato.no_fantasia}', @tipo_instituicao  WHERE NOT EXISTS (SELECT 1 FROM sistemagestaodb.instituicao_saude WHERE descricao = '${contato.no_fantasia}');
        
        SET @instituicao_saude = LAST_INSERT_ID();

        INSERT INTO sistemagestaodb.localidade_inst_saude (idInstituicao_saude, uf, municipio, bairro) SELECT @instituicao_saude, '${contato.uf_sigla}', '${contato.no_municipio}',  '${contato.no_bairro}' WHERE NOT EXISTS  (SELECT 1 FROM sistemagestaodb.localidade_inst_saude WHERE municipio = '${contato.no_municipio}');
         `, callback);
    }

}

module.exports = () => {
    return GestoresDAO;
}