import { Md5 } from 'ts-md5/dist/md5';
import { NumberTools } from './number.tools';

export class StringTools {

    static generateNewRandomString(length: number): string {
        let result: string = '';
        let characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength: number = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static generateNewIdString(): string {
        let length = NumberTools.generateRandomNumber(NumberTools.generateRandomNumber(100000))
        return StringTools.generateNewRandomString(length);
    }

    static generateNewHashString(): string {
        return Md5.hashStr(StringTools.generateNewIdString()).toString()
    }

    static getGraphErrorMessage(error: string): string {
        // console.log('error message object', error);

        let errorString: string = error?.replace('GraphQL.ExecutionError: ', '');
        errorString = errorString?.substring(0, errorString.length - 1);

        let errors: string[] = errorString?.split('|') || [];

        if (errors?.length !== 0) return errors[0];
        else return '';
    }

    static getGraphErrorException(error:any) {
        return this.getGraphErrorMessage(error?.networkError?.error?.Message)
    }

    static getGraphErrorMessageList(error: any, startPosition:number = 0): string{
        
        let errorString: string = error?.networkError?.error?.Message?.replace('GraphQL.ExecutionError: ', '');
        errorString = errorString.substring(0, errorString.length - 1);
         
        let errors: string[] = errorString.split('|');
        let returnError: string = '';

        if(errors.length <= 1) return '';

        for (let index = startPosition; index < errors.length; index++) {
           returnError += `${errors[index]} `
            
        }
        return returnError;
    }

    static formatDateCard(inputDate: string, separator: string = '/') {
        let date:Date = new Date(inputDate);
        return `${this.formatPartialDateMonth(date.getMonth() + 1)}${separator}${this.formatPartialDateYear(date.getFullYear())}`;
    }

    private static formatPartialDateMonth(date: number) {
       if(date < 10) return `0${date}`;
       else return `${date}`;
    }

    private static formatPartialDateYear(date: number) {
        return `${date - 2000}`;
       
     }

    static copyTextToClipboard(value: string) {
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = value;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    static capitalizeFirstLetter(value: string): string {
        return value.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
    }

    static capitalizeFirstLetterEachWord(value: string): string {
        return value.toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    }

    static leftPad(str: any, length: number, chr: string = '0') {
        return (str as string).padStart(length, chr);
    }
}

