import * as actions from '../actions/types';
export default function (state = {}, action) {
    switch (action.type) {
        case actions.ADD_MACHINE:
            return { ...state, message: action.payload };
        case actions.ACTIVATE_MACHINE:
            return { ...state, messageActivateMachine: action.payload };    
        case actions.REMOVE_MACHINE:
            return { ...state, removeMessage: action.payload };
        case actions.CLEAR_REMOVE_MACHINE_MESSAGE:
            return { ...state, removeMessage: action.payload };
        case actions.MACHINE_SAVE_ERR:
            return { ...state, message: action.payload };
        case actions.MACHINE_DETAILS_ERR:
            return { ...state, message: action.payload };    
        case actions.REQUESTING_MACHINES:
            return {...state, isFetchingMachines: true};    
        case actions.GET_ALL_MACHINES:
            return { ...state, machinesCollection: action.payload.machines, machinesCollectionMessage: action.payload.message, isFetchingMachines: false };
        case actions.CLEAR_MACHINE_COLLECTION_FETCHED:
            return { ...state, machinesCollectionMessage: action.payload };
        case actions.REQUEST_MACHINE_DETAILS:
            return { ...state, isFetching: true };   
        case actions.GET_MACHINE_DETAILS:
            return { ...state, machineDetails: action.payload.machine, machineDetailsMessage: action.payload.message, isFetching: false };
        case actions.GET_MACHINE_DETAILS_USING_NAME:
            return { ...state, machineDetails: action.payload.machine, machineDetailsMessage: action.payload.message, isFetching: false};    
        case actions.CLEAR_MACHINES:
            return { ...state,
                machineDetails: action.payload,
                machinesCollection: action.payload,
                machineDetailsMessage: '',
                machinesCollectionMessage: '',
                removeMessage: '',
                message: ''
            };
    };
    return state;
}    
