import { createAction, props } from '@ngrx/store';
import { IngreoEgresoInterface } from '../shared/interfaces/ingreso-egreso.interface';

export const unSetItems = createAction('[IngresoEgreso] UnSet Items');

export const setItems = createAction(
    '[IngresoEgreso] Set Items',
    props<{ items: IngreoEgresoInterface[] }>()
);
