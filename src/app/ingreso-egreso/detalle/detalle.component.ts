import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  subcripcion!: Subscription

  ingresosEgresos: IngresoEgreso[] = []

  constructor(private store: Store<AppState>,
    private ingresoegresoService: IngresoEgresoService) { }

  ngOnInit(): void {

    this.subcripcion = this.store.select('ingresosegresos').subscribe( data => {
      this.ingresosEgresos = data.items      
    });
  }

  ngOnDestroy(): void {
      this.subcripcion.unsubscribe()
  }

  borrar( item:any ){
   this.ingresoegresoService.borrarItem(item.uid)
   .then( ()=> Swal.fire('Borrado', 'Item Borrado Correctamente' , 'success'))
   .catch( err => Swal.fire('Error', err.message  , 'error'))
  }

}
