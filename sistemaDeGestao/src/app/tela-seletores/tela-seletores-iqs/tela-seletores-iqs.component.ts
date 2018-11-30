import { TelaSeletoresService } from './../tela-seletores.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-seletores-iqs',
  templateUrl: './tela-seletores-iqs.component.html',
  styleUrls: ['./tela-seletores-iqs.component.scss']
})
export class TelaSeletoresIqsComponent implements OnInit {

  // declarações dos gráficos

  // Gráfico de linha
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: '#3d94667a',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#3d9466',
      pointHoverBackgroundColor: '#3d9466',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: '#9c212180',
      borderColor: '#9c212180',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';


  // Gráficos de barra
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];


  // Gráficos de pizza
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType = 'doughnut';

  // PolarArea
  public polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
  public polarAreaLegend = true;

  public polarAreaChartType = 'polarArea';

  // declarações dos gráficos Final

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
    private telaSeletoresService: TelaSeletoresService,
    private router: Router
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



  // GRÁFICOS
  public randomize(): void {
    const _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  public randomizeBar(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  painelOperacional() {
    this.router.navigate(['/painelOperacional']);
  }

}

