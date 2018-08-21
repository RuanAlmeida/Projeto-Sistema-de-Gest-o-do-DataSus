import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'telaSeletores',
    loadChildren: 'app/tela-seletores/tela-seletores.module#TelaSeletoresModule',
  },
  {
    path: 'painelOperacional',
    loadChildren:
      'app/painel-operacional/painel-operacional.module#PainelOperacionalModule'
  },
  {
    path: 'admin',
    loadChildren: 'app/administracao/administracao.module#AdministracaoModule'
  }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
