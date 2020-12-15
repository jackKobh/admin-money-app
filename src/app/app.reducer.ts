import { ActionReducerMap } from '@ngrx/store';
import * as auth from './auth/auth.reducer';
import * as ui from './shared/ui.reducer';
import * as movements from './ingreso-egreso/movements.reducer';


export interface AppState {
   ui: ui.State,
   auth: auth.State,
   movements: movements.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui:ui.uiReducer,
   auth: auth.authReducer,
   movements: movements.movementsReducer
}
