import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PainelOperacionalService } from './painel-operacional.service';
import { PainelOperacionalComponent } from './painel-operacional.component';
import { PainelOperacionalRoutingModule } from './painel-operacional.router';

@NgModule({
  imports: [
    CommonModule,
    PainelOperacionalRoutingModule
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
