import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as uiActions from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-loggin',
    templateUrl: './loggin.component.html',
    styles: [
    ]
})
export class LogginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    cargando: boolean = false;
    uiSubscription: Subscription;
    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private store: Store<AppState>) {
        this.loginForm = this.formBuilder.group({
            correo: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        })
    }

    ngOnInit(): void {
        this.uiSubscription = this.store.select('ui').subscribe(ui => {
            this.cargando = ui.isLoading;
        });
    }

    ngOnDestroy() {
        this.uiSubscription.unsubscribe();
    }

    login() {

        if (this.loginForm.invalid) return;
        this.store.dispatch(uiActions.isLoading());


        /* Swal.fire({
          title: 'Espere por favor!',
    
          didOpen: () => {
            Swal.showLoading()
          }
        });
     */


        const { correo, password } = this.loginForm.value;
        this.authService.login(correo, password)
            .then(credenciales => {
                console.log(credenciales);
                /* Swal.close(); */
                this.store.dispatch(uiActions.stopLoading());
                this.router.navigate(['/']);
            })
            .catch(err => Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message
            }))
    }

}
