import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';

import { AdministracaoService } from '../administracao.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  ufs: any;

  params: any;
  paramsByPost: any;
  visoes: any;
  formLocal: any;
  perfisIQSs: boolean;

  // declarações da aba Empresa
  empresa = {
    endereco: ''
    // idEmpresa: ''
    // cnpj: '',
    // num_cnes: '',
    // razao_social: '',
    // endereco: '',
    // complemento: '',
    // numero: '',
    // cep: '',
    // idibge: '',
    // bairro: ''
  };


  enderecoEmpresa = {

  };

  // declarações da aba endereço
  endereco = {
    empresagestores: 0,
    gestor: 0,
    idEndereco: 0
    // numero: '',
    // bairro: '',
    // complemento: '',
    // cep: '',
    // uf: '',
    // municipio: ''
  };

  enderecoGestor = {

  };

  // {
  //   "contato": 0,
  //   "dsEmail": [
  //     "string"
  //   ],
  //   "dsTelefone": [
  //     "string"
  //   ],
  //   "idEmail": [
  //     0
  //   ],
  //   "idGestor": 0,
  //   "idTelefone": [
  //     0
  //   ],
  //   "tipoContato": "string",
  //   "tpTelefone": [
  //     "string"
  //   ]
  // }

  // declarações da aba Gestor
  gestor = {};

  // declarações da aba Contato
  contato = {
    email: '',
    telefone: '',
    tipo: ''
  };
  contatosGestor: any;

  // declarações da aba instituições
  instituicao = {
    id_uf: '',
    id_municipio: '',
    idInstituicao_saude: '',
    id_tipo_unidade: '',
    no_bairro: ''
  };

  instituicoesGestor: any;
  saveDados = {
    getInstituicao: {},
    getTipoInst: {},
    getUfs: {},
    getMunicipio: {}
  };


  perfil = {
    idPerfil: ''
  };

  novoPerfil = {
    nomeperfil: '',
    nomeModuloperfil: ''
  };

  // declarações das váriaveis das abas
  public empresaActive = false;
  public gestorActive = false;
  public enderecoActive = true;
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

  empresasIquality = [1, 2, 3, 4];
  municipiosAbaInst: any;
  bairros: Object;
  tipInsts: Object;
  instsSau: Object;
  cnpj: any;
  cpf: any;
  idEnderecosEmpresa: any;
  idGestor: any;
  telefones: any = [];
  emails: any = [];

  constructor(
    private appService: AppService,
    private administracaoService: AdministracaoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
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
        console.log(this.empresa, this.endereco);
        this.administracaoService.postEndereco(fAddEndereco).subscribe(
          (res: String) => {
            this.paramsByPost = res;
            this.empresa.endereco = this.paramsByPost;

            console.log(res);
            this.salvarEmpresa(this.empresa);
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


  // -----------    ABA EMPRESA ------------------


  // função para Salvar os dados da empresa do gestor
  salvarEmpresa(enderecoEmpresa) {
    if (enderecoEmpresa.status !== 'INVALID') {
      if (this.params.id) {
        this.administracaoService.putEmpresa(enderecoEmpresa.value, this.params.id).subscribe(
          res => {
            console.log(res);
            // this.getGestorById();
            this.gestorActive = true;
          },
          erro => {
            console.log(erro);
          }
        );
      } else {
        console.log(enderecoEmpresa);
        this.administracaoService.postEmpresa(enderecoEmpresa.value).subscribe(
          (res: String) => {
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
  salvarGestor(gestor) {
    if (gestor.status !== 'INVALID') {
      if (this.params.id) {
        this.administracaoService.putGestor(gestor.value, this.params.id).subscribe(
          res => {
            // this.getGestorEndereco();
            this.enderecoActive = true;
          },
          erro => {
            console.log(erro);
          }
        );
      } else {
        // this.salvarEndereco(this.enderecoGestor);
        // this.gestor.empresagestor = this.idEnderecosEmpresa;
        // gestor.endereco = this.paramsByPost;
        this.administracaoService.postGestor(gestor).subscribe(
          res => {
            this.idGestor = res;
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


  // -----------  INICIO ABA CONTATOS ------------------

  // função para Salvar os contatos do gestor
  salvarContato() {
    // if (fAddContato.status !== 'INVALID') {
    console.log('contato');

    this.idGestor = 3;

    // tslint:disable-next-line:prefer-const
    let form = {
      idGestor: null,
      emails: null,
      telefones: null
    };
    form.idGestor = this.idGestor;
    form.emails = this.telefones;
    form.telefones = this.emails;
    console.log(form);
    this.administracaoService.postContato(form).subscribe(
      res => {
        console.log(res);
        // this.getContatoById(this.idGestor.insertId);
      },
      erro => {
        console.log(erro);
      }
    );
    // this.getAbaInstituicoes();
    // } else {
    //   console.log('campos inválidos');
    // }
  }


  getContatoById(idGestor) {
    this.administracaoService.getContatoId(idGestor).subscribe(
      res => {
        console.log(res);
        this.contatosGestor = res;
      },
      erro => {
        console.log(erro);
      }
    );
  }

  adicionarContato(form) {
    this.telefones.push({ dsTelefone: form.value.dsTelefone, tpTelefone: form.value.tpTelefone });
    this.emails.push({ dsEmail: form.value.dsEmail });
  }


  // -----------  FIM ABA CONTATOS ------------------



  // // função para Salvar os contatos do gestor
  // salvarInstituicao(fAddInstituicao) {
  //   if (fAddInstituicao.status !== 'INVALID') {
  //     fAddInstituicao = this.correcaoInstituicao();
  //     // if (this.putPermitido) {
  //     //   this.putPermitido = false;
  //     //   this.administracaoService.putInstituicao(fAddInstituicao.value, this.paramsById()).subscribe(
  //     //     res => {
  //     //       this.perfilActive = true;
  //     //     },
  //     //     erro => {
  //     //       console.log(erro);
  //     //     }
  //     //   );
  //     // } else {
  //     this.administracaoService.postInstituicao(fAddInstituicao).subscribe(
  //       res => {
  //         console.log(res);
  //         // this.instituicoesGestor.unshift(fAddInstituicao);
  //         // console.log()
  //       },
  //       erro => {
  //         console.log(erro);
  //       }
  //     );
  //     // }
  //   } else {
  //     console.log('campos inválidos');
  //   }
  // }


  // salvarPerfil(fAddPerfilNovo, salvarPerfil) {
  //   if (this.controleSelePerfilExistent) {
  //     this.formLocal = salvarPerfil;
  //   } else {
  //     this.formLocal = fAddPerfilNovo;
  //   }

  //   if (this.formLocal.status !== 'INVALID') {
  //     if (this.controleSelePerfilExistent) {
  //       this.administracaoService.putInstituicao(this.formLocal.value, this.paramsById()).subscribe(
  //         res => {
  //           this.perfilActive = true;
  //         },
  //         erro => {
  //           console.log(erro);
  //         }
  //       );
  //     } else {
  //       this.administracaoService.postInstituicao(this.formLocal.value).subscribe(
  //         res => {
  //           this.paramsByPost = res;
  //           this.perfilActive = true;
  //         },
  //         erro => {
  //           console.log(erro);
  //         }
  //       );
  //     }
  //   } else {
  //     console.log('campos inválidos');
  //   }

  // }


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



  // getGestorInstituicaoById() {
  //   if (this.paramsById()) {
  //     this.administracaoService.getInstituicaoId(this.paramsById()).subscribe(
  //       res => {
  //         // this.instActive = true;
  //         this.instituicoesGestor = res;
  //       },
  //       erro => {
  //         console.log(erro);
  //       }
  //     );
  //   }
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
    this.administracaoService.getSelecioneTipoInt().subscribe(dados => {
      this.tipInsts = dados;
      this.tipoInstsAbaInst = dados;
      this.saveDados.getTipoInst = dados;
    });
  }

  getBairros(idMunicipio) {
    this.administracaoService.getSelecioneBairro(idMunicipio).subscribe(dados => {
      console.log(dados);
      this.bairros = dados;
      this.bairrosAbaInst = dados;
      this.tipoInstsAbaInst = dados;
      this.instituicoesAbaInst = dados;
    });
  }

  getUfs() {
    this.ufs = this.appService.getUfsIQS();
  }

  getUfsLocal() {
    this.ufsLocal = this.appService.getUfsLocal();
    console.log(this.ufsLocal);
  }

  selectUf(codUf) {
    this.municipios = this.appService.getMunicipiosIQS(codUf);
  }

  selectUfLocal(codUf) {
    this.municipiosLocal = this.appService.getMunicipiosLocal(codUf);
    console.log(this.municipiosLocal);
  }

  getMunicipio() {
    this.administracaoService.getSelecioneMunicipios().subscribe(dados => {
      this.municipiosAbaInst = dados;
      this.saveDados.getMunicipio = dados;
    });
  }

  getInsts(form) {
    this.administracaoService.getSelecioneInt(form.municipio, form.bairro, form.tipInst)
      .subscribe(
        res => this.instsSau = res
      );
  }


  atualizaUf(campo) {
    this.resetarCampos();
    if (campo) {
      this.administracaoService.getAtualizaUf(campo.id_uf)
        .subscribe(dados => {
          this.municipios = dados;
          this.bairrosAbaInst = dados;
          this.tipoInstsAbaInst = dados;
          this.instituicoesAbaInst = dados;
        });
    }
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

  resetarCampos() {
    this.instituicao = {
      id_uf: '',
      id_municipio: '',
      idInstituicao_saude: '',
      id_tipo_unidade: '',
      no_bairro: ''
    };

    this.instituicoesAbaInst = this.saveDados.getInstituicao;
    this.tipoInstsAbaInst = this.saveDados.getTipoInst;
    this.ufsAbaInst = this.saveDados.getUfs;
    this.municipios = this.saveDados.getMunicipio;
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

  adicionarInstituicao(form) {
    console.log(form);
  }

  ngOnInit() {
    setTimeout(() => {
      // this.getGestorInstituicao();
      this.activatedRoute.params.subscribe(res => (this.params = res));
      this.getUfs();
      this.getUfsLocal();
      this.getTipoInst();
    }, 1000);
  }
}
