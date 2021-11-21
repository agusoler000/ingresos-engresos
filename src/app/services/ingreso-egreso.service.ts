import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore'
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore,
    private authService: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){

    const uid = this.authService.getuser()
    console.log(uid.uid);
    
    return this.firestore.doc(`${uid.uid}/ingresos-egresos`)
    .collection('items')
    .add({...ingresoEgreso})
    
  }

  initIngresosEgresosListener(uid:string){

   return this.firestore.collection(`${uid}/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map( snapshot => { return snapshot.map ( doc=>({      
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any         
            })       
        )}
      )      
    );
  }

  borrarItem(uidItem: string ){
    const uid = this.authService.getuser()
    return this.firestore.doc(`${uid.uid}/ingresos-egresos/items/${uidItem}`).delete()

  }

}
