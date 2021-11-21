import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  datosUser:any
  navBarSub!: Subscription

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.navBarSub = this.store.select('user').subscribe(({user})=> this.datosUser = user )
  }

  ngOnDestroy(): void {
      this.navBarSub.unsubscribe();
  }

}
