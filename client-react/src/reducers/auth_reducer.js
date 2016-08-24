/**
 * Created by cristiandrincu on 8/20/16.
 */
import * as actions from '../actions/types';
export default function(state = {}, action) {
    switch(action.type) {
        case actions.AUTH_USER:
            return { ...state, authenticated: true }; //return all of our existing state and append to it the authenticated flag        
        case actions.UNAUTH_USER:
            return { ...state, authenticated: false }; //return all of our existing state and append to it the authenticated flag
        case actions.AUTH_ERR:
            return { ...state, error: action.payload };       
    }

    return state;
}