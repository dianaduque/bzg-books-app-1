import { ActionReducerMap, 
    createSelector, 
    createFeatureSelector,
    ActionReducer,
    MetaReducer
} from '@ngrx/store';

import { storeFreeze } from "ngrx-store-freeze";
import { environment } from "../../environments/environment";
import * as fromLayout from "../core/reducers/layout";

export interface State{
    layout: fromLayout.State;
    router: null;
}

export const reducers: ActionReducerMap<State> = {
    layout: fromLayout.reducer,
    router: null
}

export function logger(reducer: ActionReducer<State>): ActionReducer<State>{
    return function (state: State, action: any): State{
        console.info('state', state);
        console.info('action', action);
        return reducer(state, action);
    }
}

export const metaReducer: MetaReducer<State>[] = !environment.production ? [logger, storeFreeze]: [];

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');
export const getShowSideNav = createSelector(
    getLayoutState,
    fromLayout.getShowSideNav
)