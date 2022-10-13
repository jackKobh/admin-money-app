import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorLanguages } from 'src/assets/translates/error_lang';
import Swal, { SweetAlertOptions, SweetAlertPosition } from 'sweetalert2';
import { AlertConfigModel } from '../models/alert.config';
import { ConfirmationMessage } from '../models/confirmation.swal';
import { ErrorModel } from '../models/error.model';



import { ErrorMessageModel } from '../models/errormessage.model';
import { StringTools } from '../tools';
import { LocalService } from './local.service';





@Injectable({
    providedIn: 'root'
})
export class MessagesService {

    // New messages service with custom modal
    private systemMessage = new BehaviorSubject<AlertConfigModel>(null);
    currentSystemMessage = this.systemMessage.asObservable();


    constructor(

        private localService: LocalService
        ) { }

 

    clearSystemMessage() {
        this.systemMessage.next(null);
    }

    fireErrorMessageWithModel( message: ErrorMessageModel, functionExecWillClose: any = null, time: number = 0, footerMessage: string = null) {
       
     
        setTimeout(() => {
            Swal.fire({
                icon: 'error',
                title: message.header,
                text: message.message,
                willClose: functionExecWillClose,
                footer: message.footer
            })
        }, time);
    }

    fireErrorMessage(tittle: string, message: string, functionExecWillClose: any = null, time: number = 0, footerMessage: string = null) {
       

     
        setTimeout(() => {
            Swal.fire({
                icon: 'error',
                title: tittle,
                text: message,
                willClose: functionExecWillClose,
                footer: footerMessage
            })
        }, time);
    }

   

    fireErrorMessageException(code:string, footerMessage: string = null) {
        this.fireErrorMessageWithModel(this.getErrorByCode(code));
    }

    fireWarningMessage(tittle: string, message: string, functionExecWillClose: any = null, time: number = 0) {
        
        setTimeout(() => {
            Swal.fire({
                icon: 'warning',
                title: tittle,
                text: message,
                willClose: functionExecWillClose
            })
        }, time);
    }
    fireErrorMessageManage(tittle: string, payload: any, functionExecWillClose: any = null, time: number = 0) {
        // console.log('payload error', this.getGraphErrorString(payload));
    }

    fireErrorMessageGraph(title: string, graphObject: any, functionExecWillClose: any = null, time: number = 0) {
        this.fireErrorMessage(title, this.getGraphErrorString(graphObject), functionExecWillClose, time);
    }

    getGraphErrorString(error: any) {
        return error?.networkError?.error?.Message?.replace('GraphQL.ExecutionError:', '').replace('|', '').trim();
    }

    fireSystemErrorMessage(data: any, functionExecWillClose: any = null) {
        
        setTimeout(() => {
            Swal.fire({
                icon: 'error',
                title: data?.title,
                text: data?.message,
                willClose: functionExecWillClose
            })
        }, 2000);
    }

  



    fireErrorModelMessage(error: ErrorModel) {
        
        setTimeout(() => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
        }, 2000);

    }

    fireSuccessMessage(title: string, timeSeconds: number = 1.2, position: SweetAlertPosition = 'center', timeToFire: number = 0) {
       
        setTimeout(() => {
            Swal.fire({
                position,
                icon: 'success',
                title,
                showConfirmButton: false,
                timer: timeSeconds * 1000
            })
        }, timeToFire);

    }

    fireTimeOutMessage(title: string, subtitle: string, extraInformation: string, imageTimeOut: any, placeholder: string, titleButton: string, cancelButtonText: string, execFunction: any) {
        return Swal.fire({
            title: "<img src='" + imageTimeOut + "'>",
            input: "password",
            inputPlaceholder: placeholder,
            html:
                '<div class="highlighted-text fs-22"><p><strong>' + title + '</strong></p></div>' +
                '<div class="normal-text-legal fs-18"><p>' + subtitle + '</p></div>',
            showConfirmButton: true,
            confirmButtonText: titleButton,
            confirmButtonColor: '#5867DB',
            showCancelButton: true,
            cancelButtonText: cancelButtonText,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            reverseButtons: false,
            showLoaderOnConfirm: true,
            footer: '<div class="normal-text-legal fs-13"><p><strong>' + extraInformation + '</strong></p></div>',
            backdrop: 'rgba(255,255,255,1)',
            preConfirm: (value) => { return value }
        }).then(execFunction)
    }

    fireErrorMessageTimer(title: string, message: string,) {
        return Swal.fire({
            icon: 'error',
            title: title,
            text: message,
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        });
    }
    fireSuccessMessageTimer(title: string) {
        Swal.fire({
            icon: 'success',
            title,
            showConfirmButton: false,
            timer: 2000
        })
    }

    fireConfirmationMessage(config: ConfirmationMessage, actionFunction: any) {
        Swal.fire(config).then(actionFunction)
    }

    getErrorByCode(error:any) : ErrorMessageModel {
        let message:string = StringTools.getGraphErrorException(error);
        let errorMessage: string = ErrorLanguages[this.localService.getStorage('language') || 'en'][message];
        let complementMessage: string = StringTools.getGraphErrorMessageList(error, 1);

        let messageToSend: string;

        
        
        // console.log('getErrorByCode ', errorMessage)
        if(errorMessage) messageToSend =  `${errorMessage}${complementMessage === '' ? '' : ':'} ${complementMessage}` ;
        else messageToSend = `Unknown Error!: ${ message }${complementMessage === '' ? '' : ':'} ${complementMessage}`;


        return {
            header: this.getHeaderMessage(message),
            message: messageToSend,
            footer: this.getFooterMessage(message)
        };
    }

    getFooterMessage(code: string) {
        switch (code) {
            case 'E00000011':
                return '<div class="highlighted-text fs-12">Try the following: <div class="highlighted-text fs-12"><ul><li>Clear your cache [windows (ctrl + shift + R), mac (cmd + shift + R)]</li><li>Check that the version of your browser is the latest available</li></ul></div></div> '

        
            default:
                return null;
        }
    }


    getHeaderMessage(code: string) {
        switch (code) {
            case 'E00000011':
                return 'Dime que otro capricho quieren'

        
            default:
                return 'A problem ocurred!';
        }
    }

}
