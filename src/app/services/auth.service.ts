import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
    private firestore: AngularFirestore) { }

  initAuthListener(){

    this.auth.authState.subscribe(user =>{
      console.log(user);
      console.log(user?.uid);
      console.log(user?.email);
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
