import { TelaSeletoresService } from './../tela-seletores.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-seletores-irs',
  templateUrl: './tela-seletores-irs.component.html',
  styleUrls: ['./tela-seletores-irs.component.scss']
})
export class TelaSeletoresIrsComponent implements OnInit {


  instituicoes: any;
  tipoInsts: any;
  ufs: any;
  municipios: any;

  seletorLocal = {
    uf: '',
    municipio: '',
    bairro: '',
    tipInst: '',
    instSau: ''
  };

  seletorIRS = {
    persAva: '',
    abranVi: '',
    dimAn: ''
  };

  persAvas: any;
  abranVis: any;
  dimAns: any;


  constructor(
    private telaSeletoresService: TelaSeletoresService
  ) { }


  getInstituicao() {
    this.telaSeletoresService.getSelecioneInt().subscribe(dados => {
      this.instituicoes = dados;
      console.log(this.instituicoes);
    });
  }

  getTipoInst() {
    this.telaSeletoresService.getSelecioneTipoInt().subscribe(dados => {
      this.tipoInsts = dados;
      console.log(this.tipoInsts);
    });
  }

  getUfs() {
    this.telaSeletoresService.getSelecioneEstado().subscribe(dados => {
      this.ufs = dados;
      console.log(this.ufs);
    });
  }

  getMunicipio() {
    this.telaSeletoresService.getSelecioneMunicipios().subscribe(dados => {
      this.municipios = dados;
      console.log(this.municipios);
    });
  }

  ngOnInit() {
    this.getUfs();
  }


}
