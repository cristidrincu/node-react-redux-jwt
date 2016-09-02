import { FETCH_COMMENTS, ADD_COMMENT } from '../actions/types';

export default function(state = [], action) {    
    switch(action.type) {
        case FETCH_COMMENTS:
            return [ ...state, { comments: action.payload } ];
        case ADD_COMMENT:
            return [...state, action.payload ];
        }

        return state;    
    }    