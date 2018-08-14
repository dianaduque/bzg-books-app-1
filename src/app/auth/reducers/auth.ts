import {AuthActions,AuthActionTypes} from "../actions/auth";

export interface State {
    loggedIn: boolean;
    user_id: string | null;
    error: any | null;
    pending: boolean;
}

export const initialState : State = {
    loggedIn: false,
    user_id: null,
    error: null,
    pending: false
}

export function reducer(state=initialState, action: AuthActions): State{
    switch(action.type){
        case AuthActionTypes.Login:{
            return {
                ...state,
                pending: true
            }
        }
        case AuthActionTypes.LoginSuccess:{
            return {
                ...state,
                pending: false,
                error: null,
                loggedIn: true,
                user_id: action.payload
            }
        }
        case AuthActionTypes.LoginFailure:{
            return {
                ...state,
                pending: false,
                error: action.payload,
            }
        }
        case AuthActionTypes.Logout:{
            return initialState
        }

        default:
            return state;
    }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUserId = (state: State) => state.user_id;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
