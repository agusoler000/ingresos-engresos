import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as actions from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingEgForm!: FormGroup;
  tipo: string = 'ingreso'
  public cargando: boolean = false
  uiSubscription!: Subscription

  constructor(private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store:Store<AppState>) { }

  ngOnInit(): void {
    this.ingEgForm = this.fb.group({

      descripcion: ['', Validators.required],
      monto: ['', Validators.required]


    })

    this.uiSubscription = this.store.select( 'ui' ).subscribe(({isLoading})=>{ this.cargando = isLoading})
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
    
  }

  guardar(){
    setTimeout(() => {
    }, 2500);
    
    
    if(this.ingEgForm.invalid){return}
    // console.log(this.ingEgForm.value);
    this.store.dispatch(actions.isLoading())
    // console.log(this.tipo);
    
    const { descripcion, monto } = this.ingEgForm.value
    
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo)
    
    console.log(ingresoEgreso);
    
    
    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
    .then( () =>{ 
      this.ingEgForm.reset()
      this.store.dispatch( actions.stopLoading())
      Swal.fire('Registro Creado', descripcion, 'success')
    })
    .catch (err => {Swal.fire('Error', err.message, 'error')
    this.store.dispatch( actions.stopLoading())}
    )
    



  }

}
