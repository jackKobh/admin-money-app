import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import { StringTools, ValidatorsTools } from 'src/app/tools';
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
        private messagesService: MessagesService,
        private autService: AuthService
    ) { }

    ngOnInit(): void {


        this.subscriptions.push(
            this.store.select('auth').subscribe(({ user }) => {
                this.usuario = user;
                this.loadForm();
                this.loadFormPeriodicity();
            })
        );

        this.subscriptions.push(
            this.configUserForm.get('avatar').valueChanges.subscribe( result => {
                console.log('image change:', result)
                this.guardar();
            })
        )
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    guardar() {
        const { email, nombre, avatar } = this.configUserForm.value;
        const { tipo } = this.periodicityForm.value;

        this.store.dispatch(isLoading());


        this.autService.updateUser({
            nombre,
            email,
            uid: this.usuario.uid,
            avatar,
            periodicidad: {
                tipo
            }
        }).then(() => {
            this.store.dispatch(stopLoading());
            this.messagesService.fireSuccessMessage('Exito al actualizar usuario')
        }).catch(error => {
            this.store.dispatch(stopLoading());
            this.messagesService.fireErrorMessage('Error', error);
        });
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

    updateImage(img: string) {
        this.configUserForm.get('avatar').setValue(img, ValidatorsTools.notUpdateValueField());
        this.guardar();
    }

}
