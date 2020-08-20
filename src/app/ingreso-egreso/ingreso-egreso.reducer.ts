import { createReducer, on } from '@ngrx/store';
import { unSetItems, setItems } from './ingreso-egreso.actions';
import { IngreoEgresoInterface } from '../shared/interfaces/ingreso-egreso.interface';
import { AppState } from '../app.reducer';

export interface State {
    items: IngreoEgresoInterface[];
}

export interface AppStateWithIngreso extends AppState {
    ingresosEgresos: State;
}

export const initialState: State = {
   items: [],
};

const _ingresoEgresoReducer = createReducer(initialState,
    on(setItems, (state, { items }) => ({ ...state, items: [...items]})),
    on(unSetItems, state => ({ ...state, items: [] })),
);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}
