import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { MessagesService } from 'src/app/services/messages.service';
import { StringTools } from 'src/app/tools';
import { Usuario } from '../../models/usuario.model';

@Component({
    selector: 'app-configuraciones',
    templateUrl: './configuraciones.component.html',
    styleUrls: ['./configuraciones.component.scss']
})
export class ConfiguracionesComponent implements OnInit, OnDestroy {
    configUserForm: FormGroup;
    periodicityForm: FormGroup;
    subscriptions: Subscription[] = [];

    usuario: Usuario;
    constructor(
        private fb: FormBuilder,
        private store: Store<AppState>,
        private messagesService: MessagesService
    ) { }

    ngOnInit(): void {


        this.subscriptions.push(
            this.store.select('auth').subscribe(({ user }) => {
                this.usuario = user;
                this.loadForm();
                this.loadFormPeriodicity();
            })
        )
    }

    ngOnDestroy(): void {   
        this.subscriptions.forEach( s => s.unsubscribe() );
    }

    guardar() {
        // this.configUserForm.touched
    }

    loadForm() {
        this.configUserForm = this.fb.group({
            email: [this.usuario?.periodicidad?.tipo, Validators.required],
            nombre: [this.usuario?.nombre, Validators.required],
            avatar: [this.usuario?.avatar]
        })
    }

    loadFormPeriodicity() {
        this.periodicityForm = this.fb.group({
            tipo: [this.usuario?.periodicidad?.tipo, Validators.required]
        })
    }
    copyId() {
        StringTools.copyTextToClipboard(this.usuario.uid);
        this.messagesService.fireSuccessMessage('Success copy to clipboard');
    }

}
