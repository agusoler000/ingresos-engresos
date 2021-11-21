import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  datosUsuario: any

  userSubs!: Subscription

  constructor(private authService: AuthService,
    private router: Router,
    private store:Store<AppState>) { }

  ngOnInit(): void {

    this.userSubs = this.store.select('user')        
        .pipe(
          filter( ({user}) => user !== null)
        )
        .subscribe( ({user}) => {this.datosUsuario = user 
        console.log(this.datosUsuario);
        }
    )    
  }

  ngOnDestroy(): void {
   this.userSubs.unsubscribe()
  }

  logOut(){

    Swal.fire({
      title: 'Hasta la proxima!',      
      didOpen: () => {
        Swal.showLoading()      
      }
    })  

    this.authService.logOut()
    .then( ()=> {
      
        Swal.close()
        
        this.router.navigate(['/login'])
        
    
    })
  }

}
