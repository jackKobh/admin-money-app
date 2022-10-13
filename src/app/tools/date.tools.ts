import { StringTools } from "./string.tools";




export class DateTools {

    static dateNumbers: any = [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12'

    ]

    static getDateRequestFormat(date: Date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    static getLocalDateFromUTC(value: Date | string | number) {
        let localDate: Date = new Date(value);
        return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localDate.getHours(), localDate.getMinutes(), localDate.getSeconds()));
    }

    static getLocalDateFromISO(value: Date | string | number) {
        let localDate: Date = new Date(value);
        return localDate.toISOString()
    }

    static getUTCDate() {
        let localDate: Date = new Date();

        // console.log('local date', localDate)
        // console.log('utc date', new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(),  localDate.getHours(), localDate.getMinutes(), localDate.getSeconds())));
        return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localDate.getHours(), localDate.getMinutes(), localDate.getSeconds(), localDate.getMilliseconds()));
    }

    static getUTCDateString() {
        let utcDate: Date = new Date();
        let response: string = `${utcDate.getUTCFullYear()}-${StringTools.leftPad(utcDate.getUTCMonth() + 1, 2)}-${StringTools.leftPad(utcDate.getUTCDate(), 2)} ${StringTools.leftPad(utcDate.getUTCHours(), 2)}:${StringTools.leftPad(utcDate.getUTCMinutes(), 2)}:${StringTools.leftPad(utcDate.getUTCSeconds(), 2)}`
        // console.log('response date', response)
        return response
    }





    static getTicks() {

        let date: Date = this.getUTCDate();

        return (((date.getTime() + (date.getTimezoneOffset() * 60000)) * 10000) + 621355968000000000)
    }

    static getLocalHourFromUTC(value: string) {
        let localDate: Date = new Date();
        let arrayHour: string[] = value.split(':');
        return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), +arrayHour[0], +arrayHour[1], +arrayHour[2]));
    }

    static getLocalHourFromUTCAddHours(value: string, value2: string) {
        let localDate: Date = new Date();
        let arrayHour: string[] = value.split(':');
        let arrayHour2: string[] = value2.split(':');

        let initialDate: Date = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), +arrayHour[0], +arrayHour[1], +arrayHour[2]));
        initialDate.setTime(initialDate.getTime() + (+arrayHour2[0] * 60 * 60 * 1000))
        return initialDate;
    }
    static getLocalHourFromUTCAddDays(value: string, days: number) {
        let localDate: Date = new Date();
        let arrayHour: string[] = value.split(':');
        return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate() + days, +arrayHour[0], +arrayHour[1], +arrayHour[2]));
    }

    static getLocalDateFromUTCAddDays(inputDate: Date, days: number) {
        let localDate: Date = new Date(inputDate);
        return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate() + days, localDate.getHours(), localDate.getMinutes(), localDate.getSeconds()));
    }

    static dateToYMD(date: Date) {
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    static getDateString(date: Date) {
        return `${date.getFullYear()}-${DateTools.dateNumbers[date.getMonth()]}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
    }

    static getFirstDayYear(dateIn, convertString: boolean = true) {
        if (convertString) return this.getDateString(new Date(dateIn.getFullYear(), 0, 1))
        else return new Date(dateIn.getFullYear(), 1, 1);
    }

    static getFirstDayYearhNow(convertString: boolean = true) {
        return DateTools.getFirstDayYear(new Date(), convertString);
    }

    static getFirstDayMonth(dateIn) {
        return new Date(dateIn.setDate(1));
    }

    static getFirstDayMonthNow() {
        return DateTools.getFirstDayMonth(new Date());
    }

    static getFirstDayMonthOper(numberMonths: number) {
        let date: Date = new Date();
        let subsMonths: number 
        return DateTools.getFirstDayMonth(new Date(date.getFullYear(), date.getMonth() + numberMonths, date.getDate()));
    }

    static getFirstDayWeekNow() {
        return DateTools.getFirstDayWeek(new Date());
    }

    static getFirstDayWeek(dateIn) {
        let currentDate = new Date(dateIn);
        var day = currentDate.getDay(),
            diff = currentDate.getDate() - day + (day == 0 ? -6 : 1);
        currentDate = new Date(currentDate.setDate(diff));

       
        return currentDate;
    }

    static getLastDayWeek(dateIn) {
        let currentDate = new Date(dateIn);
        var day = currentDate.getDay(),
            diff = currentDate.getDate() - day + (day == 0 ? -6 : 1);
        let d2 = new Date(currentDate.setDate(diff));
        d2.setDate(d2.getDate() + 6);

        return d2;
    }

    static getLastDayWeekNow() {
        return DateTools.getLastDayWeek(new Date());
    }



    static getLastDayMonth(dateIn) {
        let date = new Date(dateIn);
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        return new Date(date.setDate(lastDay));
    }

    static getLastDayMonthNow() {
        return DateTools.getLastDayMonth(new Date());
    }

}
