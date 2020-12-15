import { createReducer, on } from '@ngrx/store';
import { Movement } from '../models/ingreso-egreso.model';
import * as movementsActions from './movements.actions';

export interface State {
    items: Movement[];
}

export const initialState: State = {
   items: [],
}

const _movementsReducer = createReducer(initialState,

    on( movementsActions.setItems, (state, { items }) => ({ ...state, items: [ ...items ] })),
    on( movementsActions.unSetItems, (state) => ({ ...state, items: [] })),

);

export function movementsReducer(state, action) {
    return _movementsReducer(state, action);
}
