import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'telaSeletores',
    loadChildren: 'app/tela-seletores/tela-seletores.module#TelaSeletoresModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'painelOperacional',
    loadChildren:
      'app/painel-operacional/painel-operacional.module#PainelOperacionalModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: 'app/administracao/administracao.module#AdministracaoModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
