import * as actions from '../actions/types';
export default function (state = { }, action) {        
    switch (action.type) {
        case actions.AUTH_USER:
            //return all of our existing state and append to it
            return { ...state, error: '', authenticated: true, isBeingAuthenticated: false };
        case actions.UNAUTH_USER:
            //return all of our existing state and append to it the authenticated flag
            return { ...state, authenticated: false, error: ''};
        case actions.AUTH_ERR:
            return { ...state, error: action.payload, authenticated: false };        
    }

    return state;
}