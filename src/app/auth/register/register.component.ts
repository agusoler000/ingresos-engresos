import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

   register!: FormGroup;
   public cargando: boolean = false
   public uiSubscription!: Subscription;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) { 
  
  }

  ngOnInit(): void {
    this.register = this.fb.group({

      nombre: ['',  Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
 
    }) 

    this.uiSubscription = this.store.select("ui").subscribe( ui => {this.cargando = ui.isLoading 
     // console.log('subsssssss')
    })
    
  }

  ngOnDestroy(): void {

    this.uiSubscription.unsubscribe()
      
  }

  crearUsuario(){

    if (this.register.invalid) {return}

    this.store.dispatch(isLoading())

    // Swal.fire({
    //   title: 'Cargando...',      
    //   didOpen: () => {
    //     Swal.showLoading()      
    //   }
    // })

    const {nombre, correo, password} = this.register.value
    this.authService.createUsuario(nombre,correo,password)
    

    .then( credentials => {      
      console.log(credentials); 
      this.store.dispatch(stopLoading())
     // Swal.close()
      this.router.navigate(['/'])     
    })
    .catch (err => {
      this.store.dispatch(stopLoading())
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
        
      })}
      
    )

  }

}
