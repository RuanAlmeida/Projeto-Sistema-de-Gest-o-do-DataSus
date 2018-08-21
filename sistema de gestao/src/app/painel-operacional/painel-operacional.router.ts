import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PainelOperacionalComponent } from './painel-operacional.component';


    const PainelOperacionalRoutes = [
        { path: '', component: PainelOperacionalComponent },
    ];


@NgModule({
    imports: [
        RouterModule.forChild(PainelOperacionalRoutes)
    ],
    exports: [RouterModule]
})
export class PainelOperacionalRoutingModule {}
