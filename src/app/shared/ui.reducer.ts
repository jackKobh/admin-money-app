import { createReducer, on } from '@ngrx/store';
import * as loadingActions from './ui.actions';

export interface State {
    isLoading: boolean;
}

export const initialState: State = {
   isLoading: false,
}

const _uiReducer = createReducer(initialState,

    on(loadingActions.isLoading, state => ({ ...state, isLoading: true})),
    on(loadingActions.stopLoading, state => ({ ...state, isLoading: false})),

);

export function uiReducer(state, action) {
    return _uiReducer(state, action);
}
