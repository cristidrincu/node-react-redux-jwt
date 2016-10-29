import * as actions from '../actions/types';
export default function (state = {}, action) {        
    switch (action.type) {
        case actions.REQUESTING_USERS:
            return {...state, isFetchingUsers: true};
        case actions.GET_USERS:
            return {...state, usersCollection: action.payload.users, usersCollectionMessage: action.payload.message, isFetchingUsers: false}; 
        case actions.REQUEST_USER_DETAILS:
            return {...state, isFetchingUserDetails: true}; 
        case actions.REQUEST_USER_DETAILS_IN_LIST:
            return {...state, isFetchingUserDetailsInList: true};                      
        case actions.FETCH_USER_DETAILS:
            return { ...state, userDetails: action.payload, isFetchingUserDetails: false }; 
        case actions.FETCH_USER_DETAILS_IN_LIST:
            return { ...state, userDetailsInList: action.payload, isFetchingUserDetailsInList: false}; 
        case actions.CHECKING_IF_MACHINE_BELONGS_TO_USER:
            return { ...state, isCheckingMachineBelongsToUser: true};     
        case actions.DOES_MACHINE_BELONG_TO_USER:
            return { ...state, doesMachineBelongToUser: action.payload, isCheckingMachineBelongsToUser: false};                 
        case actions.USER_DETAILS_ERR:
            return { ...state, error: action.payload };
        case actions.CLEAR_USER_DETAILS:
            return { ...state, userDetails: action.payload, usersCollection: action.payload, usersCollectionMessage: action.payload };                        
    }

    return state;
}