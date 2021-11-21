import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setItems } from '../ingreso-egreso/ingreso-egreso.action';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  private userSubs!: Subscription;
  private ingresosEsgresosSub!: Subscription

  constructor(private store:Store<AppState>,
    private ingresoegresoservice: IngresoEgresoService) {
   
   }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
    .pipe(
      filter(auth => auth.user !== null)
    )    
    .subscribe(( {user}) =>{ console.log(user)
    this.ingresosEsgresosSub = this.ingresoegresoservice.initIngresosEgresosListener(user!.uid)
      .subscribe( data => { 

        this.store.dispatch( setItems({items: data} ) )
      })
    })
  }

  ngOnDestroy(): void {
      this.userSubs?.unsubscribe()
      this.ingresosEsgresosSub?.unsubscribe()
  }

}
