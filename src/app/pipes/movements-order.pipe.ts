import { Pipe, PipeTransform } from '@angular/core';
import { Movement } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'movementsOrder'
})
export class MovementsOrderPipe implements PipeTransform {

  transform(items: Movement[]): Movement[] {
    return items.slice().sort((a, b) => {
      if( a.tipo === 'ingreso') return -1;
      else return 1;
    });
  }

}
