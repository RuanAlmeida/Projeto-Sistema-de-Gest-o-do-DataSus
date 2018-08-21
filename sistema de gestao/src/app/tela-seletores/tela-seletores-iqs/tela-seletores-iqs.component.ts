import { TelaSeletoresService } from './../tela-seletores.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-seletores-iqs',
  templateUrl: './tela-seletores-iqs.component.html',
  styleUrls: ['./tela-seletores-iqs.component.scss']
})
export class TelaSeletoresIqsComponent implements OnInit {

  instituicoes: any;
  tipoInsts: any;
  ufs: any;
  municipios: any;
  saveDados = {
    getInstituicao: {},
    getTipoInst: {},
    getUfs: {},
    getMunicipio: {}
  };

  boteosSeletores: boolean;
  templateIRS: boolean;
  templateIQS: boolean;
  boteosVoltar: boolean;

  seletorLocal = {
    id_uf: '',
    id_municipio: '',
    id_unidade: '',
    id_tipo_unidade: '',
    no_bairro: ''
  };

  seletorIRS = {
    persAva: '',
    abranVi: '',
    dimAn: ''
  };

  seletorIQS = {
    persAva: '',
    abranVi: '',
    dimAn: ''
  };
  bairros: any;
  persAvas: any;
  abranVis: any;
  dimAns: any;

  constructor(
    private telaSeletoresService: TelaSeletoresService

  ) { }


  getInstituicao() {
    this.telaSeletoresService.getSelecioneInt()
      .subscribe(dados => {
        this.instituicoes = dados;
        this.saveDados.getInstituicao = dados;
      });
  }

  getTipoInst() {
    this.telaSeletoresService.getSelecioneTipoInt().subscribe(dados => {
      this.tipoInsts = dados;
      this.saveDados.getTipoInst = dados;
      // console.log(this.tipoInsts);
    });
  }

  getBairros() {
    this.telaSeletoresService.getSelecioneBairro().subscribe(dados => {
      this.municipios = dados;
      this.bairros = dados;
      this.tipoInsts = dados;
      this.instituicoes = dados;
    });
  }

  getUfs() {
    this.telaSeletoresService.getSelecioneEstado().subscribe(dados => {
      this.ufs = dados;
      this.saveDados.getUfs = dados;
    });
  }

  getMunicipio() {
    this.telaSeletoresService.getSelecioneMunicipios().subscribe(dados => {
      this.municipios = dados;
      this.saveDados.getMunicipio = dados;
    });
  }

  exibirTemp() {
    this.boteosSeletores = true;
    this.templateIRS = false;
    this.templateIQS = false;
    this.boteosVoltar = false;
  }

  exibirTempIQS() {
    this.templateIQS = true;
    this.boteosVoltar = true;
    this.boteosSeletores = false;
  }

  exibirTempIRS() {
    this.templateIRS = true;
    this.boteosVoltar = true;
    this.boteosSeletores = false;
  }

  atualizaUf(campo) {
    this.resetarCampos();
    if (campo) {
      this.telaSeletoresService.getAtualizaUf(campo.id_uf)
        .subscribe(dados => {

          this.municipios = dados;
          this.bairros = dados;
          this.tipoInsts = dados;
          this.instituicoes = dados;
        });
    }
  }

  atualizaMunicipio(campo) {
    if (campo) {
      this.telaSeletoresService.getAtualizaMunicipio(campo.id_municipio)
        .subscribe(dados => {

          // this.municipios = dados;
          this.instituicoes = dados;
          this.tipoInsts = dados;
          this.bairros = dados;
        });
    }
  }

  atualizaBairro(campo) {
    // erro
    this.telaSeletoresService.getAtualizaBairro(campo).subscribe(dados => {
      // console.log(dados)
      // if(dados.length != 0) {
      //   this.seletorLocal.id_uf = dados[0].id_uf;
      //   this.seletorLocal.id_municipio = dados[0].id_municipio;
      //   this.seletorLocal.id_tipo_unidade = dados[0].id_tipo_unidade;
      //   this.seletorLocal.id_unidade = dados[0].id_unidade;
      //   this.seletorLocal.id_uf = dados[0].id_uf;
      //   // this.seletorLocal.no_bairro = dados[0].no_bairro;
      // }
      //  this.bairros = dados;
      this.municipios = dados;
      this.tipoInsts = dados;
      this.instituicoes = dados;
    });
  }

  atualizaTipo(campo) {
    if (campo) {
      this.telaSeletoresService.getAtualizaTipo(campo.id_tipo_unidade, campo.id_municipio)
        .subscribe(dados => {
          this.municipios = dados;
          this.instituicoes = dados;
          this.tipoInsts = dados;
          this.bairros = dados;
        });
    }
  }

  atualizaInstituicao(campo) {
    if (campo) {
      this.telaSeletoresService.getAtualizaInstituicao(campo.id_unidade)
        .subscribe(dados => {
          this.tipoInsts = dados;
          this.seletorLocal.id_municipio = dados[0].id_municipio;
          this.seletorLocal.id_tipo_unidade = dados[0].id_tipo_unidade;
          this.seletorLocal.id_unidade = dados[0].id_unidade;
          this.seletorLocal.id_uf = dados[0].id_uf;
          this.seletorLocal.no_bairro = dados[0].no_bairro;
        });
    }
  }

  getModuloPersAvas() {
    this.telaSeletoresService.getPersAvas()
      .subscribe(dados => {
        this.persAvas = dados;
      });
  }
  getModuloAbranVis() {
    this.telaSeletoresService.getAbranVis()
      .subscribe(dados => {
        this.abranVis = dados;
      });
  }
  getModuloDimAns() {
    this.telaSeletoresService.getDimAns()
      .subscribe(dados => {
        this.dimAns = dados;
      });
  }

  resetarCampos() {
    this.seletorLocal = {
      id_uf: '',
      id_municipio: '',
      id_unidade: '',
      id_tipo_unidade: '',
      no_bairro: ''
    };

    this.instituicoes = this.saveDados.getInstituicao;
    this.tipoInsts = this.saveDados.getTipoInst;
    this.ufs = this.saveDados.getUfs;
    this.municipios = this.saveDados.getMunicipio;
  }

  ngOnInit() {
    this.boteosSeletores = true;
    this.templateIRS = false;
    this.templateIQS = false;
    this.boteosVoltar = false;

    this.getInstituicao();
    this.getTipoInst();
    this.getUfs();
    this.getMunicipio();
    this.getBairros();

    this.getModuloPersAvas();
    this.getModuloAbranVis();
    this.getModuloDimAns();
  }
}

