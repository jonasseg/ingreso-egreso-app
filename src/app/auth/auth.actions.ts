import { createAction, props } from '@ngrx/store';
import { UserInterface } from '../shared/interfaces/user.interface';

export const setUser = createAction(
    '[Counter Component] setUser',
    props<{ user: UserInterface }>()
);

export const unSetUser = createAction('[Counter Component] unSetUser');
