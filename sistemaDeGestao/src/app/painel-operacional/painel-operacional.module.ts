import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { PainelOperacionalService } from './painel-operacional.service';
import { PainelOperacionalComponent } from './painel-operacional.component';
import { PainelOperacionalRoutingModule } from './painel-operacional.router';

@NgModule({
  imports: [
    CommonModule,
    PainelOperacionalRoutingModule,
    ChartsModule
  ],
  declarations: [
    PainelOperacionalComponent
  ],
    exports: [
    ],
  providers: [
    PainelOperacionalService
  ]
})
export class PainelOperacionalModule { }
