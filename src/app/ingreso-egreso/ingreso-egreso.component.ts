import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movement, ValidMovementType } from '../models/ingreso-egreso.model';
import { MovementsService } from '../services/movements.service';

import Swal from 'sweetalert2';

//store avtions
import * as uiActions from '../shared/ui.actions';

//ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-ingreso-egreso',
    templateUrl: './ingreso-egreso.component.html',
    styles: [
    ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
    movementForm: FormGroup;
    type: ValidMovementType = 'ingreso';

    //Store values
    procesando: boolean = false;

    //Subscriptions
    loadingSubs: Subscription;
    constructor(private fb: FormBuilder,
        private movementsService: MovementsService,
        private store: Store<AppState>) {
        this.movementForm = this.fb.group({
            descripcion: ['', Validators.required],
            monto: ['', Validators.required]
        })
    }

    ngOnInit(): void {
        this.loadingSubs = this.store.select('ui').subscribe(({ isLoading }) => {
            this.procesando = isLoading;
        })
    }

    ngOnDestroy() {
        this.loadingSubs.unsubscribe();
    }

    guardar() {
        if (this.movementForm.invalid) return;
        console.log(this.movementForm.value);

        const { descripcion, monto } = this.movementForm.value;

        const movement: Movement = new Movement(descripcion, monto, this.type);
        this.movementsService.createMovement(movement)
            .then((ref) => {
                Swal.fire('Registro creado', descripcion, 'success');
                this.movementForm.reset();
                this.store.dispatch(uiActions.stopLoading());
            })
            .catch(err => {
                Swal.fire('Ho rayos', err.message, 'error');
                this.store.dispatch(uiActions.stopLoading());
            });
    }



}
