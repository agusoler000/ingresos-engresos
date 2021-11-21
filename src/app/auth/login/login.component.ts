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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm!: FormGroup
  public cargando: boolean = false
  public uiSubscription!: Subscription;


  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.uiSubscription = this.store.select("ui").subscribe( ui => {this.cargando = ui.isLoading
    //console.log('cargando subs');
    } )

  }
  ngOnDestroy(): void {
      this.uiSubscription.unsubscribe();
  }

  public login(){
    if (this.loginForm.invalid) {return}

    this.store.dispatch(isLoading())

    // Swal.fire({
    //   title: 'Cargando...',      
    //   didOpen: () => {
    //     Swal.showLoading()      
    //   }
    // })   

    const {email, password} = this.loginForm.value
    console.log(email, password);
    
    this.authService.loguinUser(email,password)    

    .then( credentials => {
      console.log(credentials); 
     // Swal.close()
     this.store.dispatch(stopLoading())
      this.router.navigate(['/'])     
    })
    .catch (err => 
      {this.store.dispatch(stopLoading())
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There is no user record corresponding to this identifier. The user may have been deleted.',
        
      })}
    )

  }

  

}
