import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRouters } from './dashboard/dashboard.routes';
import { AuthguardGuard } from './services/authguard.guard';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: '', 
  canLoad:[AuthguardGuard] ,
  loadChildren: ()=> import('./ingreso-egreso/ingreso-egreso.module').then( m => m.IngresoEgresoModule)
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
