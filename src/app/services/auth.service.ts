import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private angularFireAuth: AngularFireAuth,
                private firestore: AngularFirestore) { }

  initAuthListener() {
    this.angularFireAuth.authState.subscribe( user => {
      console.log(user);
    })
  }

  createUser(name: string, email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
            .then( ({ user }) => {
              const newUser = new Usuario(user?.uid, name, user?.email);
              return this.firestore.doc( `${user?.uid}/usuario`)
              .set( { ...newUser } )
            });
  }

  login(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.angularFireAuth.signOut();
  }

  isAuth() {
    return this.angularFireAuth.authState.pipe(
      map( fbUser =>  fbUser != null)
    )
  }
}
