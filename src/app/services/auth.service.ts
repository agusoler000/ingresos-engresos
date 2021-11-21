import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { AppState } from '../app.reducer';
import * as authAction from '../auth/auth.actions';
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.action';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription
  private _user!: Usuario | null

  getuser(){
    return {...this._user}
  }


  constructor(public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthListener(){

    this.auth.authState.subscribe(user =>{
     // console.log(user?.uid);
     if( user ){
    this.userSubscription = this.firestore.doc(`${user.uid}/usuario`).valueChanges().subscribe( fstUser => {
      const user = Usuario.fromFirebase(fstUser)
      this._user = user
      this.store.dispatch(authAction.setUser({user}))
      
      
    })
  }else{
    this._user = null
    this.userSubscription?.unsubscribe()
    this.store.dispatch(authAction.unSetUser())
    this.store.dispatch(unSetItems())
      

    }
    })

  }

  createUsuario( nombre: string, email:string, password: string){
    
    return this.auth.createUserWithEmailAndPassword(email,password)
            .then (({user}) => {

              const newUser = new Usuario( user!.uid, nombre , email )
              return this.firestore.doc(`${user?.uid}/usuario`)
               .set( {...newUser} )
              
            })
    
  }

  loguinUser(usuario:string, password: string){

    console.log(usuario, password);
    

    return this.auth.signInWithEmailAndPassword(usuario,password)

  }

  logOut(){
   return this.auth.signOut()
  }

  isAuth(){
   return this.auth.authState.pipe(
    map( user => user != null)

   )
  }


}
