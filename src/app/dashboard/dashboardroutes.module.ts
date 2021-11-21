import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRouters } from './dashboard.routes';
//import { AuthguardGuard } from '../services/authguard.guard';


const rutasHijas = [
  {path: '', component: DashboardComponent,
   children: dashboardRouters,
  // canActivate: [AuthguardGuard]
}]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( rutasHijas )
    
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardroutesModule { }
