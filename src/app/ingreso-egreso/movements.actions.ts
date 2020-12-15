import { createAction, props } from '@ngrx/store';
import { Movement } from '../models/ingreso-egreso.model';

export const setItems = createAction('[Movements] Set Items',
  props<{ items: Movement[] }>());
export const unSetItems = createAction('[Movements] Unset Items');
