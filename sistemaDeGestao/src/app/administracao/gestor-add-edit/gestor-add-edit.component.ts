import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';

import { AdministracaoService } from '../administracao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServicesMsg } from '../../api-service/api-services-msg';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestor-add-edit',
  templateUrl: './gestor-add-edit.component.html',
  styleUrls: ['./gestor-add-edit.component.scss']
})
export class GestorAddEditComponent implements OnInit {

  municipiosLocal: any;
  ufsLocal: any;
  controleSelePerfilExistent = false;
  controleCriarNovoPerfil = false;
  BotoesPrincipais = true;
  perfisForm = false;
  DetalhePerfil = false;

  ufs: any = [];
  allMunicipios: any = [];

  params: any;
  paramsByPost: any;
  visoes: any;
  formLocal: any;
  perfisIQSs: boolean;

  // declarações da aba Empresa
  empresa = {
    cnpj: '',
    num_cnes: '',
    razao_social: '',
    endereco: '',
    complemento: '',
    numero: '',
    cep: '',
    idibge: '',
    bairro: ''
  };


  // declarações da aba Gestor
  gestor = {
    nome: '',
    cpf: '',
    login: '',
    password: '',
    cargo: '',
    instituicao: '',
    cnpj: ''
  };
  // declarações da aba endereço
  endereco = {
    endereco: '',
    numero: '',
    bairro: '',
    complemento: '',
    cep: '',
    uf: '',
    municipio: ''
  };
  // declarações da aba Contato
  contato = {
    email: '',
    telefone: '',
    tipo: ''
  };
  contatosGestor: any;

  //////declarações da aba instituições////////

  //Loadings
  loadingEstados: boolean;
  loadingMunicipios: boolean;
  loadingBairros: boolean;
  loadingTipoInsts: boolean;
  loadingInsts: boolean;

  instituicao: any = {
    uf: '',
    municipio: '',
    bairro: '',
    tipInst: '',
    idInstituicao_saude: ''
  };

  instsGestor: any = [];

  /////////////////////////////////// /////////

  perfil = {
    idPerfil: ''
  };

  novoPerfil = {
    nomeperfil: '',
    nomeModuloperfil: ''
  };

  // declarações das váriaveis das abas
  public empresaActive = true;
  public gestorActive = false;
  public enderecoActive = false;
  public contatoActive = false;
  public instActive = false;
  public perfilActive = false;

  gestorInstituicao: any;
  estados: any;
  municipios: any;
  putPermitido = false;
  instituicoesAbaInst: any;
  bairrosAbaInst: any;
  tipoInstsAbaInst: any;
  ufsAbaInst: any;

  municipiosAbaInst: any;
  bairros: Object;
  tipInsts: any;
  instsSau: Object;
  cnpj: any;
  cpf: any;
  idEnderecosEmpresa: any;
  idGestores: any;

  constructor(
    private appService: AppService,
    private administracaoService: AdministracaoService,
    private apiServicesMsg: ApiServicesMsg,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  verifyId() {
    return !((this.params !== undefined) && (this.params.id));
  }

  ativarFuncionalidade(varialvel) {
    if (varialvel === 'existente') {
      this.controleSelePerfilExistent = true;
      this.BotoesPrincipais = false;
      this.DetalhePerfil = true;
    } else {
      this.controleCriarNovoPerfil = true;
      this.BotoesPrincipais = false;
      this.perfisForm = true;
    }
  }

  // -----------    ABA EMPRESA ------------------


  // função para Salvar os dados da empresa do gestor
  salvarEmpresa(fAddEmpresa) {
    if (fAddEmpresa.status !== 'INVALID') {
      if (this.params.id) {
        this.administracaoService.putEmpresa(fAddEmpresa.value, this.params.id).subscribe(
          res => {
            // this.getGestorById();
            this.gestorActive = true;
          },
          erro => {
            console.log(erro);
          }
        );
      } else {
        this.cnpj = fAddEmpresa.value.cnpj;
        this.administracaoService.postEmpresa(fAddEmpresa.value).subscribe(
          res => {
            this.idEnderecosEmpresa = res[0].insertId;
            this.gestorActive = true;
          },
          erro => {
            console.log(erro);
          }
        );
      }
    } else {
      console.log('campos inválidos');
    }
  }

  getEstadoLocal() {

  }

  getEmpresaById() {
    if (this.paramsById()) {
      this.administracaoService.getEmpresaId(this.paramsById()).subscribe(
        res => {
          this.gestor = res[0];
        },
        erro => {
          console.log(erro);
        }
      );
    }
  }

  // funções para retornar para página antrior e fazer get

  backEmpresa() {
    this.getEmpresaById();
    this.router.navigate([`admin/edit/${this.paramsById()}`]);
  }


  cancelarEmpresa() {
    this.router.navigate(['/admin']);
  }

  // -----------  FIM  ABA EMPRESA ------------------




  // -----------   ABA GESTOR ------------------

  // função para Salvar os dados básicos gestor
  salvarGestor(fAddGestor) {
    if (fAddGestor.status !== 'INVALID') {
      if (this.params.id) {
        this.administracaoService.putGestor(fAddGestor.value, this.params.id).subscribe(
          res => {
            // this.getGestorEndereco();
            this.enderecoActive = true;
          },
          erro => {
            console.log(erro);
          }
        );
      } else {
        this.cpf = fAddGestor.value.cpf;
        fAddGestor.value.cnpj = this.cnpj;
        fAddGestor.value.idEnderecos = this.idEnderecosEmpresa;
        console.log(this.cpf);
        this.administracaoService.postGestor(fAddGestor.value).subscribe(
          res => {
            this.idGestores = res;
            this.enderecoActive = true;
          },
          erro => {
            console.log(erro);
          }
        );
      }
      // this.getEstado();
    } else {
      console.log('campos inválidos');
    }
  }
  // -----------  FIM  ABA GESTOR ------------------


  // -----------  INICIO ABA ENDEREÇO ------------------

  // função para Salvar os endereço do gestor
  salvarEndereco(fAddEndereco) {
    if (fAddEndereco.status !== 'INVALID') {
      if (this.putPermitido) {
        // this.putPermitido = false;
        // this.administracaoService.putEndereco(fAddEndereco.value, this.paramsById()).subscribe(
          //   res => {
            //     // this.getContatoById();
            //     this.contatoActive = true;
            //   },
            //   erro => {
              //     console.log(erro);
              //   }
              // );
            } else {
              fAddEndereco.value.cpf = this.paramsById();
              this.administracaoService.postEndereco(fAddEndereco.value).subscribe(
                res => {
                  console.log(res);
                  this.paramsByPost = res;
                  this.contatoActive = true;
                },
                erro => {
                  console.log(erro);
                }
              );
            }
            // this.getContatoById();
    } else {
      console.log('campos inválidos');
    }
  }

  // -----------  FIM ABA ENDEREÇO ------------------


  // -----------  INICIO ABA CONTATOS ------------------

  // função para Salvar os contatos do gestor
  salvarContato(fAddContato) {
    if (fAddContato.status !== 'INVALID') {
      fAddContato.value.idGestores = this.idGestores.insertId;
      this.administracaoService.postContato(fAddContato.value).subscribe(
        res => {
          console.log(res);
          this.getContatoById(this.idGestores.insertId);
        },
        erro => {
          console.log(erro);
        }
      );
      // this.getAbaInstituicoes();
    } else {
      console.log('campos inválidos');
    }
  }


    getContatoById(idGestores) {
      this.administracaoService.getContatoId(idGestores).subscribe(
        res => {
          console.log(res);
          this.contatosGestor = res;
        },
        erro => {
          console.log(erro);
        }
      );
  }


  // -----------  FIM ABA CONTATOS ------------------


  // getVisao() {
  //   this.administracaoService.getVisao().subscribe(
  //     res => {
  //       console.log(res);
  //       this.visoes = true;
  //     },
  //     erro => {
  //       console.log(erro);
  //     }
  //   );
  // }

  // getModulosIQS() {
  //   this.administracaoService.getModulosIQS().subscribe(
  //     res => {
  //       console.log(res);
  //       this.perfisIQSs = true;
  //     },
  //     erro => {
  //       console.log(erro);
  //     }
  //   );
  // }

  // getModulosIRS() {
  //   this.administracaoService.getModulosIRS().subscribe(
  //     res => {
  //       console.log(res);
  //       this.perfisIQSs = true;
  //     },
  //     erro => {
  //       console.log(erro);
  //     }
  //   );
  // }



  getGestorById() {
    if (this.paramsById()) {
      this.administracaoService.getGestorId(this.paramsById()).subscribe(
        res => {
          this.gestor = res[0];
        },
        erro => {
          console.log(erro);
        }
      );
    }
  }

  // getGestorEndereco() {
  //   if (this.paramsById()) {
  //     this.administracaoService.getEnderecoId(this.paramsById()).subscribe(
  //       res => {
  //         if (!!res[0]) {
  //           this.endereco = res[0];
  //           this.putPermitido = true;
  //         }
  //       },
  //       erro => console.log(erro)
  //     );
  //   }
  // }


  // getGestorInstituicao() {
  //   this.administracaoService.getGestorInstituicao().subscribe(
  //     res => {
  //       this.gestorInstituicao = res;
  //     },
  //     erro => console.log(erro)
  //   );
  // }

  // getEstado() {
  //   this.administracaoService.getEstado().subscribe(
  //     res => {
  //       this.estados = res;
  //       // this.selectMunicipio();
  //     },
  //     erro => console.log(erro)
  //   );
  // }

  getMunicipios() {
    this.administracaoService.getMunicipios().subscribe(
      res => {
        this.municipios = res;
        console.log(res);
      },
      erro => console.log(erro)
    );
  }

  // ----- inicio Funções da aba instituições -----

  getInstituicao() {
    // this.administracaoService.getSelecioneInt()
    //   .subscribe(dados => {
    //     this.instituicoesAbaInst = dados;
    //     this.saveDados.getInstituicao = dados;
    //   });
  }

  getTipoInst() {
    this.loadingTipoInsts = true;
    this.administracaoService.getSelecioneTipoInt().subscribe((dados: any) => {
      this.tipInsts = dados.rows;
      this.tipoInstsAbaInst = dados.rows;
      this.loadingTipoInsts = false;
     },
     erro => {
       console.error(erro);
       this.loadingTipoInsts = false;
     }
    );
  }

  getInstsIQS() {
    this.loadingInsts = true;
    this.administracaoService.getInstsIQS().subscribe((dados: any) => {
      this.instsSau = dados.rows;
      this.loadingInsts = false;
    }, 
    erro => {
      console.error(erro);
      this.loadingInsts = false;
    }
    );
  }

  getBairros(idMunicipio) {
    this.instituicao.bairro = '';
    this.loadingBairros = true;
    this.administracaoService.getSelecioneBairro(idMunicipio).subscribe(dados => {
      this.bairros = dados;
      this.loadingBairros = false;
      // this.bairrosAbaInst = dados;
      // this.tipoInstsAbaInst = dados;
      // this.instituicoesAbaInst = dados;
    },
    erro => {
      console.error(erro);
      this.loadingBairros = false;
    }
      );
  }

  getUfs() {
    this.loadingEstados = true;
    this.appService.getUfsIQS()
    .subscribe(
      res => {
        this.ufs = res;
        this.loadingEstados = false;
      },
      erro => {
        console.error(erro);
        this.loadingEstados = false;
      }
      );
  }

  getAllMunicipios() {
    this.appService.getMunicipiosIQS()
    .subscribe(res => this.allMunicipios = res);
  }

  getUfsLocal() {
    this.ufsLocal = this.appService.getUfsLocal();
  }

  selectUf(codUf) {
    this.instituicao.bairro = '';
    this.instituicao.municipio = '';
    this.loadingMunicipios = true;
    this.municipios = this.allMunicipios.filter(elem => Number(elem.id_uf) === Number(codUf) );
    this.loadingMunicipios = false;
  }

  selectUfLocal(codUf) {
    this.municipiosLocal = this.appService.getMunicipiosLocal(codUf);
  }

  getMunicipio() {
    this.administracaoService.getSelecioneMunicipios().subscribe(dados => {
      this.municipiosAbaInst = dados;
    });
  }

  getInsts(form) {
    this.loadingInsts = true;
    this.administracaoService.getSelecioneInt(form.municipio, form.bairro, form.tipInst)
      .subscribe(
        res => {
          this.instsSau = res;
          this.loadingInsts = false;
        },
        erro => {
          console.error(erro);
          this.loadingInsts = false;
        }
      );
  }

  atualizaMunicipio(campo) {
    if (campo) {
      this.administracaoService.getAtualizaMunicipio(campo.id_municipio)
        .subscribe(dados => {
          // this.municipios = dados;
          this.instituicoesAbaInst = dados;
          this.tipoInstsAbaInst = dados;
          this.bairrosAbaInst = dados;
        });
    }
  }

  atualizaBairro(campo) {
    // erro
    this.administracaoService.getAtualizaBairro(campo).subscribe(dados => {
      // console.log(dados)
      // if(dados.length != 0) {
      //   this.instituicao.id_uf = dados[0].id_uf;
      //   this.instituicao.id_municipio = dados[0].id_municipio;
      //   this.instituicao.id_tipo_unidade = dados[0].id_tipo_unidade;
      //   this.instituicao.idInstituicao_saude = dados[0].idInstituicao_saude;
      //   this.instituicao.id_uf = dados[0].id_uf;
      //   // this.instituicao.no_bairro = dados[0].no_bairro;
      // }
      //  this.bairros = dados;
      this.municipios = dados;
      this.tipoInstsAbaInst = dados;
      this.instituicoesAbaInst = dados;
    });
  }

  atualizaTipo(campo) {
    if (campo) {
      this.administracaoService.getAtualizaTipo(campo.id_tipo_unidade, campo.id_municipio)
        .subscribe(dados => {
          this.municipios = dados;
          this.instituicoesAbaInst = dados;
          this.tipoInstsAbaInst = dados;
          this.bairrosAbaInst = dados;
        });
    }
  }

  atualizaInstituicao(campo) {
    if (campo) {
      this.administracaoService.getAtualizaInstituicao(campo.idInstituicao_saude)
        .subscribe(dados => {
          this.tipoInstsAbaInst = dados;
          this.instituicao.id_municipio = dados[0].id_municipio;
          this.instituicao.id_tipo_unidade = dados[0].id_tipo_unidade;
          this.instituicao.idInstituicao_saude = dados[0].idInstituicao_saude;
          this.instituicao.id_uf = dados[0].id_uf;
          this.instituicao.no_bairro = dados[0].no_bairro;
        });
    }
  }

  getAbaInstituicoes() {
    // this.getInstituicao();
    // this.getTipoInst();
    // this.getUfs();
    // this.getMunicipio();
    // this.getBairros();
  }

  correcaoInstituicao() {

    delete this.tipoInstsAbaInst[0].id_municipio;
    delete this.tipoInstsAbaInst[0].id_uf;
    delete this.tipoInstsAbaInst[0].idInstituicao_saude;
    return this.tipoInstsAbaInst[0];
  }

  // ----- Fim Funções da aba instituições -----




  paramsById() {
    if (this.params.id) {
      return this.params.id;
    } else if (this.paramsByPost) {
      return this.paramsByPost.cpf;
    }
  }



  // backGestor() {
  //   this.getGestorById();
  //   this.router.navigate([`admin/edit/${this.paramsById()}`]);
  // }

  // backEndereco() {
  //   this.getGestorEndereco();
  //   this.router.navigate([`admin/edit/${this.paramsById()}`]);
  // }

  // backContato() {
  //   this.getContatoById();
  //   this.router.navigate([`admin/edit/${this.paramsById()}`]);
  // }

  // backInstituicao() {
  //   this.getGestorInstituicaoById();
  //   this.router.navigate([`admin/edit/${this.paramsById()}`]);
  // }



  VoltarBotoesPrin() {
    this.BotoesPrincipais = true;
    this.perfisForm = false;
    this.controleSelePerfilExistent = false;
    this.controleCriarNovoPerfil = false;
    this.DetalhePerfil = false;
  }

  selectInst(value) {
    let uf = this.allMunicipios.find(elem => elem.id_municipio === value.id_municipio).id_uf;
    this.selectUf(uf);
    this.getBairros(value.id_municipio);
    this.instituicao.tipInst = value.id_tipo_unidade;
    this.instituicao.uf = uf;
    this.instituicao.municipio = value.id_municipio;
    this.instituicao.bairro = value.no_bairro;
  }

  getInstsIQSByParams() {
    let form = this.instituicao;
    delete form.idInstituicao_saude;
    console.log(form);
    this.loadingInsts = true;
    this.administracaoService.getInstsIQSByParams(form)
    .subscribe(
      (res: any) => {
        console.log(res.rows);
        this.instsSau = res.rows;
        this.loadingInsts = false;
      },
      erro => {
        console.error(erro);
        this.loadingInsts = false;
      }
    );
  }

  getCodIbge(idIQSUf, idIQSMunicipio) {
    let siglaIQSUf = '',
    nameIQSMunicipio = '',
    municipiosLocal = [],
    codIbge = '';
    siglaIQSUf = this.ufs.find(e => Number(e.id_uf) === Number(idIQSUf)).uf_sigla;
    municipiosLocal = this.appService.getMunicipiosLocal(siglaIQSUf);
    nameIQSMunicipio = this.allMunicipios.find(elem => elem.id_municipio === idIQSMunicipio).no_mun_completo;
    codIbge = municipiosLocal.find(elemento => elemento.descricao === nameIQSMunicipio).idibge;
    return codIbge;
  }

  getTipoInstName(codTipInst) {
    return this.tipInsts.find(ele => ele.id_tipo_unidade === codTipInst).ds_tipo_unidade;
  }
  
  resetarCamposInstituicaoGestor() {
    this.instituicao = {
      uf: '',
      municipio: '',
      bairro: '',
      tipInst: '',
      idInstituicao_saude: ''
    };
  }

  adicionarInstituicao(form) {
    let formulario = {
      instGestor : {
        cpf: this.params.id,
        idInstituicao_saude:  form.value.idInstituicao_saude.id_unidade
      },
      bairro: {
        idibge: this.getCodIbge(form.value.uf, form.value.municipio),
        descricao: form.value.idInstituicao_saude.no_bairro
      },
      tipInst: {
        idTipo_Instituicao: form.value.idInstituicao_saude.id_tipo_unidade,
        descricao: this.getTipoInstName(form.value.idInstituicao_saude.id_tipo_unidade)
      },
      instSaude: {
        idInstituicao_saude:  form.value.idInstituicao_saude.id_unidade,
        descricao:  form.value.idInstituicao_saude.no_fantasia,
        idTipo_Instituicao:  form.value.idInstituicao_saude.id_tipo_unidade,
        idbairro: null
      }
    }
    this.administracaoService.postBairro(formulario.bairro)
    .subscribe(
      res => {
        formulario.instSaude.idbairro = res;
        this.administracaoService.postTipoInstituicao(formulario.tipInst)
        .subscribe(
          res => {
            this.administracaoService.postInstituicaoSaude(formulario.instSaude)
            .subscribe(
              res => {
                this.administracaoService.postInstituicaoGestor(formulario.instGestor)
                .subscribe(
                  res => {
                    this.apiServicesMsg.setMsg('success', 'Instituição cadastrada com sucesso.', 3000);
                    this.getInstituicoesGestor(this.params.id);
                    this.resetarCamposInstituicaoGestor();
                  },
                  erro => Swal('Erro', `${erro.error}`, 'error')
                )
              },
              erro => Swal('Erro', `${erro.error}`, 'error')
            )
          },
          erro => Swal('Erro', `${erro.error}`, 'error')
        )
      },
      erro => Swal('Erro', `${erro.error}`, 'error')
    )
  }

  excluirInstituicaoGestor(instituicao) {
    Swal({
      title: 'Você tem certeza?',
      text: `Você tem certeza que deseja remover esta instituição?`,
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Não, manter',
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        let cpf = instituicao.cpf,
        idInst = instituicao.idInstituicao_saude;
        this.administracaoService.deleteInstituicaoGestor(cpf, idInst)
        .subscribe(
          res => {
            this.apiServicesMsg.setMsg('success', 'Instituição excluída com sucesso.', 3000);
            this.getInstituicoesGestor(this.params.id);
          },
          erro => Swal('Erro', `${erro.error}`, 'error')
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.apiServicesMsg.setMsg('error', 'Ação cancelada.', 3000);
      }
    });
  }

  getInstituicoesGestor(cpf) {
    this.administracaoService.getInstituicoesGestor(cpf)
    .subscribe(
      res => this.instsGestor = res,
      erro => Swal('Erro', `${erro.error}`, 'error')
      )
  }

  ngOnInit() {
    setTimeout(() => {
        this.activatedRoute.params.subscribe(res => (this.params = res));
        this.getUfs();
        this.getAllMunicipios();
        this.getUfsLocal();
        this.getTipoInst();
        this.getInstsIQS();
        if (this.params.id) {
          this.getInstituicoesGestor(this.params.id);
        }
      }, 500);
  }
}
