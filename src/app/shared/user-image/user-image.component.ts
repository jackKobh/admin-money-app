import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { StringTools } from 'src/app/tools';

@Component({
    selector: 'app-user-image',
    templateUrl: './user-image.component.html',
    styleUrls: ['./user-image.component.scss']
})
export class UserImageComponent implements OnInit {

    @Input() control: AbstractControl;

    @Input() user: Usuario;
    @Output() updateEvent: EventEmitter<string> = new EventEmitter<string>();
    defaultImage: string = '';

    mensajeArchivo: string = 'No hay un archivo seleccionado';
    datosFormulario: FormData = new FormData();
    nombreArchivo: string = '';
    URLPublica: string = '';
    porcentaje: number = 0;
    finalizado: boolean = false;
    cambioFile: boolean = false;

    idControlFile: string = `${StringTools.generateNewRandomString(8)}-FileComponent`;


    constructor(
        private firebaseStorage: FirestoreService
    ) { }

    ngOnInit(): void {
    }

    exeFile() {
        let elementFile: HTMLElement = document.getElementById(this.idControlFile);
        elementFile.click();
    }

    public cambioArchivo(event) {
        let obserbableFile: Subscription;
        if (event.target.files.length > 0) {
            this.cambioFile = true;
            // console.log('files: ', event.target.files)
            for (let i = 0; i < event.target.files.length; i++) {
                this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
                this.nombreArchivo = `${StringTools.generateNewRandomString(4)}-${StringTools.generateNewRandomString(4)}-${StringTools.generateNewRandomString(4)}-${event.target.files[i].name}`;

                let referencia = this.firebaseStorage.referenciaCloudStorage(`userImages/${this.nombreArchivo}`);
                // console.log('reference firestore: ', referencia)
                let tarea = this.firebaseStorage.tareaCloudStorage(`userImages/${this.nombreArchivo}`, event.target.files[i]);

                // console.log('firebase task');

                tarea.percentageChanges().subscribe((porcentaje) => {
                    this.porcentaje = Math.round(porcentaje);
                    if (this.porcentaje == 100) {
                        this.finalizado = true;
                        this.cambioFile = false;
                    }
                });

                // console.log('llegue hasta aqui')

                let snapshot: Observable<any> = tarea.snapshotChanges().pipe(
                    tap(console.log),
                    // The file's download URL
                    finalize(async () => {
                        let downloadURL = await referencia.getDownloadURL().toPromise();
                        this.updateEvent.emit(downloadURL);

                        // this.updateControl(downloadURL);
                    }),
                );

                snapshot.subscribe(result => {
                    // console.log('URL:::::::', result);
                })





                //     console.log('urlFile', URL);
                //     this.URLPublica = URL;
                // });
            }
        } else {
            this.mensajeArchivo = 'No hay un archivo seleccionado';
        }
    }

    updateControl(downloadURL: string) {
        console.log('url:::::', downloadURL);
        this.control.setValue(downloadURL);
    }



}
