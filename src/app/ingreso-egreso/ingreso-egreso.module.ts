import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenaringresosPipe } from '../pipes/ordenaringresos.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardroutesModule } from '../dashboard/dashboardroutes.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingres-egreso.reducer';





@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,    
    OrdenaringresosPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresosegresos', ingresoEgresoReducer),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardroutesModule
  ]
})
export class IngresoEgresoModule { }
