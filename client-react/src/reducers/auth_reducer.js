import * as actions from '../actions/types';
export default function(state = {}, action) {
    switch(action.type) {
        case actions.AUTH_USER:
            return { ...state, error: '', authenticated: true, userRole: action.payload }; //return all of our existing state and append to it the authenticated flag        
        case actions.UNAUTH_USER:
            return { ...state, authenticated: false }; //return all of our existing state and append to it the authenticated flag
        case actions.AUTH_ERR:
            return { ...state, error: action.payload, authenticated: false };   
        case actions.FETCH_MESSAGE:
            return { ...state, message: action.payload };        
    }

    return state;
}