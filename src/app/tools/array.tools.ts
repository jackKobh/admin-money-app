const LEVELS: any = {
    ONE: 0,
    TWO: 1,
    THREE: 2,
    FOUR: 3,
}

const ORDERS: any = {
    ASC: 'asc',
    DESC: 'desc'
}


export type orderArrayTypes = 'asc' | 'desc';

export class ArrayTools {

    static orderArray(array: Array<any>, fields: Array<any>, order: string = ORDERS.ASC) {

        switch (fields.length - 1) {
            case LEVELS.ONE:
                return order == ORDERS.ASC ?
                    array.sort((currentObject, nextObject) => currentObject[fields[LEVELS.ONE]] - nextObject[fields[LEVELS.ONE]]) :
                    array.sort((currentObject, nextObject) => currentObject[fields[LEVELS.ONE]] - nextObject[fields[LEVELS.ONE]]).reverse();

            case LEVELS.TWO:
                return order == ORDERS.ASC ?
                    array.sort((currentObject, nextObject) => currentObject[fields[LEVELS.ONE]][fields[LEVELS.TWO]] - nextObject[fields[LEVELS.ONE]][fields[LEVELS.TWO]]) :
                    array.sort((currentObject, nextObject) => currentObject[fields[LEVELS.ONE]][fields[LEVELS.TWO]] - nextObject[fields[LEVELS.ONE]][fields[LEVELS.TWO]]).reverse();

            case LEVELS.THREE:
                return order == ORDERS.ASC ?
                    array.sort((currentObject, nextObject) => currentObject[fields[LEVELS.ONE]][fields[LEVELS.TWO]][fields[LEVELS.THREE]] - nextObject[fields[LEVELS.ONE]][fields[LEVELS.TWO]][fields[LEVELS.THREE]]) :
                    array.sort((currentObject, nextObject) => currentObject[fields[LEVELS.ONE]][fields[LEVELS.TWO]][fields[LEVELS.THREE]] - nextObject[fields[LEVELS.ONE]][fields[LEVELS.TWO]][fields[LEVELS.THREE]]).reverse();
            default:
                return array;
        }



    }

    static orderArrayDateFieldAny(data: any[], field: string, type: orderArrayTypes) {
        let resultArray: any[];
        type === 'asc' ? 
            resultArray = data.slice().sort((a, b) => new Date(a[field]).getTime() - new Date(b[field]).getTime()) :
            resultArray = data.slice().sort((a, b) => new Date(b[field]).getTime() - new Date(a[field]).getTime());

        return resultArray;
    }

    static orderArrayDateField<T>(data: T[], field: string, type: orderArrayTypes) {
        let resultArray: T[];
        type === 'asc' ? 
            resultArray = data.slice().sort((a, b) => new Date(a[field]).getTime() - new Date(b[field]).getTime()) :
            resultArray = data.slice().sort((a, b) => new Date(b[field]).getTime() - new Date(a[field]).getTime());

        return resultArray;
    }

    static orderArrayNumberField<T>(data: T[], field: string, type: orderArrayTypes) {
        let resultArray: T[];
        type === 'asc' ? 
            resultArray = data.slice().sort((a, b) => parseFloat(a[field]) - parseFloat(b[field])) :
            resultArray = data.slice().sort((a, b) => parseFloat(b[field]) - parseFloat(a[field])) ;

        return resultArray;
    }


    static orderArrayAlphabetic<T>(data: T[], field: string, type: orderArrayTypes = 'asc') {
        let resultArray: T[];
        type === 'asc' ? 
            resultArray = data.slice().sort((a, b) => {
                var textA = a[field].toUpperCase();
                var textB = b[field].toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
            }) :
            resultArray = data.slice().sort((a, b) => {
                var textA = a[field].toUpperCase();
                var textB = b[field].toUpperCase();
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0
            }) ;

        return resultArray;
    }




}
