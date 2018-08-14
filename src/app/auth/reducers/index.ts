import {createSelector, createFeatureSelector} from "@ngrx/store";
import * as fromRoot from "../../reducers";
import * as fromAuth from "./auth";

export interface State extends fromRoot.State{
    auth: fromAuth.State
}

export const reducers = fromAuth.reducer;

export const selectAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getLoggedIn = createSelector(
    selectAuthState,
    fromAuth.getLoggedIn
);
export const getUserId = createSelector(
    selectAuthState,
    fromAuth.getUserId
);
export const getError= createSelector(
    selectAuthState,
    fromAuth.getError
);
export const getPending = createSelector(
    selectAuthState,
    fromAuth.getPending
);