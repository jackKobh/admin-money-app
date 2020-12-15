import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Movement } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  constructor( private firestore: AngularFirestore,
              private authService: AuthService,
              ) { }

  createMovement(movement: Movement) {
    //console.log(movement);
    return this.firestore.doc(`${ this.authService.user.uid }/movements`)
    .collection('items')
    .add({ ...movement });
  }

  initMovementsListener(uid: string) {
    return this.firestore.collection(`${ uid }/movements/items`)
    .snapshotChanges()
    .pipe(
      map( snapshot => snapshot.map( doc => ({
            ...doc.payload.doc.data() as any,
            uid: doc.payload.doc.id
          })
        )
      )
    );
  }

  deleteMovement(uidItem: string) {
    return this.firestore.doc(`${ this.authService.user.uid }/movements/items/${ uidItem }`).delete();
  }
}
