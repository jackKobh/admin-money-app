import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { PeriodicidadEnum } from '../enumerations/periodicidad.enum';
import * as movementsActions from '../ingreso-egreso/movements.actions';
import { Usuario } from '../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userSubs: Subscription;
    private _user: Usuario;

    get user() {
        return { ...this._user };
    }

    constructor(private angularFireAuth: AngularFireAuth,
        private firestore: AngularFirestore,
        private store: Store<AppState>) { }

    initAuthListener() {
        this.angularFireAuth.authState.subscribe(user => {
            if (user) {
                this.userSubs = this.firestore.doc(`${user.uid}/usuario`).valueChanges()
                    .subscribe((firestoreUser: any) => {
                        //console.log(firestoreUser);
                        const user: Usuario = {
                            ...firestoreUser
                        } 
                        this._user = user;
                        this.store.dispatch(authActions.setUser({ user }));
                    })
            }
            else {
                this.userSubs?.unsubscribe();
                this._user = null;
                this.store.dispatch(authActions.unSetUser());
                this.store.dispatch(movementsActions.unSetItems());
            }

        })
    }

    createUser(name: string, email: string, password: string) {
        return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
            .then(({ user }) => {
                const newUser: Usuario = {
                    uid: user.uid,
                    nombre: name,
                    email: user?.email,
                    periodicidad: {
                        tipo: PeriodicidadEnum.Mensual
                    }
                } ;
                return this.firestore.doc(`${user?.uid}/usuario`)
                    .set({ ...newUser })
            });
    }


    updateUser(user: Usuario) {
        return this.firestore.doc(`${user?.uid}/usuario`).set({ ...user });
    }

    login(email: string, password: string) {
        return this.angularFireAuth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.angularFireAuth.signOut();
    }

    isAuth() {
        return this.angularFireAuth.authState.pipe(
            map(fbUser => fbUser != null)
        )
    }
}
