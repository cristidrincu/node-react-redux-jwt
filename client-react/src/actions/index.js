import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    AUTH_ERR,
    UNAUTH_USER,
    FETCH_MESSAGE,
    FETCH_COMMENTS,
    ADD_COMMENT,
    FETCH_USER_DETAILS,
    FETCH_USER_DETAILS_IN_LIST,
    USER_DETAILS_ERR,
    CLEAR_USER_DETAILS,
    ADD_MACHINE,
    REMOVE_MACHINE,
    MACHINE_SAVE_ERR,
    GET_USERS,
    GET_ALL_MACHINES,
    GET_MACHINE_DETAILS,
    CLEAR_MACHINES,
    REQUEST_MACHINE_DETAILS,
    REQUEST_USER_DETAILS,
    REQUEST_USER_DETAILS_IN_LIST,
    REQUESTING_USERS,
    REQUESTING_MACHINES,
    GET_MACHINE_DETAILS_USING_NAME,
    MACHINE_DETAILS_ERR,
    CHECKING_IF_MACHINE_BELONGS_TO_USER,
    DOES_MACHINE_BELONG_TO_USER,
    ACTIVATE_MACHINE
} from './types';

const ROOT_URL = "http://localhost:3090";
const config = { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } };

export function signinUser({email, password}) {
    //this is for redux-thunk. Usually, actions return objects
    return function (dispatch, getState) {
        //allows us to dispatch actions at any point in time and logic - see below
        //dispatch - main pipeline of redux, gets to all reducers in our app        
        axios.post(`${ROOT_URL}/signin`, { email, password }).then(response => {
            //if request is good, update state to indicate that the user is authenticated
            dispatch({ type: AUTH_USER }); //dispatch an action of type AUTH_USER                                                                                    
            //save jwt token so users can make authenticated requests                        
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('_id', response.data.userId);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('userDetails', JSON.stringify(response.data.userDetails));
            dispatch({ type: FETCH_USER_DETAILS, payload: response.data.userDetails });
            //redirect to the route /feature
            browserHistory.push('/feature');            
        }).catch(() => {
            //if request is bad, display error message to user, have options to sign in again or sign up for the user
            dispatch(authError('Bad credentials provided. Try again!'));
        });
    };
}

export function signupUser({ email, password }) {
    return function (dispatch, getState) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                dispatch({ type: FETCH_USER_DETAILS, payload: response.data.userDetails });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('_id', response.data.userId);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('userDetails', JSON.stringify(response.data.userDetails));
                browserHistory.push('/feature');
            })
            .catch((error) => {
                //   dispatch(authError(error.response.data.error)); - must implement on backend, temp solution below
                dispatch(authError("An error occured while trying to sign you up!"));
            });
    };
}

export function authError(error) {
    return {
        type: AUTH_ERR,
        payload: error
    };
}

export function userDetailsError(error) {
    return {
        type: USER_DETAILS_ERR,
        payload: error
    };
}

export function machineDetailsError(error) {
    return {
        type: MACHINE_DETAILS_ERR,
        payload: error
    };
}

export function machineSaveError(error) {
    if (error) {
        return {
            type: MACHINE_SAVE_ERR,
            payload: error
        };
    }
}

export function machineActivateError(error) {
    if (error) {
        return {
            type: ACTIVATE_MACHINE_ERR,
            payload: error
        };
    }
}

export function signoutUser() {    
    return function (dispatch) {        
        dispatch({ type: UNAUTH_USER });
        // dispatch({ type: CLEAR_USER_DETAILS, payload: {} });
        // dispatch({ type: CLEAR_MACHINES, payload: {} });
        browserHistory.push('/');
    };
}

export function requestingUsers() {
    return {
        type: REQUESTING_USERS
    };
}

export function requestUserDetails() {
    return {
        type: REQUEST_USER_DETAILS
    };
}

export function requestingUserDetailsInList() {
    return {
        type: REQUEST_USER_DETAILS_IN_LIST
    };
}

export function requestingMachines() {
    return {
        type: REQUESTING_MACHINES
    };
}

export function requestMachineDetails() {
    return {
        type: REQUEST_MACHINE_DETAILS
    };
}

export function checkingIfMachineBelongsToUser() {
    return {
        type: CHECKING_IF_MACHINE_BELONGS_TO_USER
    };
}

export function doesMachineBelongToUser(userId, machineId) {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/machine-belongs-to-user/${userId}/${machineId}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(response => {
            dispatch({
                type: DOES_MACHINE_BELONG_TO_USER,
                payload: response.data.machineBelongsToUser
            });
        }).catch((error) => dispatch(userDetailsError(error.response.data.message.error)));
    };
}

export function fetchUserDetails(userId) {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/user-details/${userId}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(response => {
            dispatch({
                type: FETCH_USER_DETAILS,
                payload: response.data.userDetails
            });
        }).catch((error) => dispatch(userDetailsError(error.response.data.error)));
    };
}

export function fetchUserDetailsInList(userId) {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/user-details-in-list/${userId}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(response => {
            dispatch({
                type: FETCH_USER_DETAILS_IN_LIST,
                payload: response.data.userDetailsInList
            });
        }).catch((error) => dispatch(userDetailsError(error.response.data.error)));
    };
}

export function getUsers() {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/users`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(response => {
            dispatch({
                type: GET_USERS, payload: {
                    users: response.data.users,
                    message: response.data.message
                }
            });
        }).catch((error) => dispatch('Users not found or network error'));
    };
}

export function addMachineDemo({ machineID, licensesCollection, demoDuration }) {
    return function (dispatch) {
        //url, data, headers
        axios.post(`${ROOT_URL}/machines`, { machineID, licensesCollection, demoDuration },
            {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            }).then(response => {
                dispatch({ type: ADD_MACHINE, payload: response.data.message });
            }).catch((error) => {
                dispatch(machineSaveError(error.response.data.message));
            });
    };
}

export function addMachineFinal({ machineID, licensesCollection, maintenanceDuration, maintenanceType }) {
    return function (dispatch) {
        //url, data, headers
        axios.post(`${ROOT_URL}/machines`, { machineID, licensesCollection, maintenanceDuration, maintenanceType },
            {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            }).then(response => {
                dispatch({ type: ADD_MACHINE, payload: response.data.message });
            }).catch((error) => {
                dispatch(machineSaveError(error.response.data.message));
            });
    };
}

export function activateMachine(machineName, userId ) {
    return function (dispatch) {        
        axios.post(`${ROOT_URL}/machines/activate-machine/${machineName}/${userId}`,
            {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            }).then(response => {
                dispatch({ type: ACTIVATE_MACHINE, payload: response.data.message });
            }).catch((error) => {
                dispatch(machineActivateError(error.response.data.message));
            });
    };
}

export function getMachines() {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/machines`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(response => {
            dispatch({
                type: GET_ALL_MACHINES, payload: {
                    machines: response.data.machines,
                    message: response.data.message
                }
            });
        }).catch((error) => dispatch(error.response.data.message));
    };
}

export function getMachineDetails(machineId) {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/machines/manage/${machineId}`, {            
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(response => {
            dispatch({
                type: GET_MACHINE_DETAILS, payload: {
                    machine: response.data.machine,
                    message: response.data.message
                }
            });
        }).catch((error) => dispatch(machineDetailsError(error.response.data.message)));
    };
}

export function getMachineDetailsUsingMachineName(machineName) {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/machines/manage/machine-by-name/${machineName}`, {            
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(response => {
            dispatch({
                type: GET_MACHINE_DETAILS_USING_NAME, payload: {
                    machine: response.data.machine,
                    message: response.data.message
                }
            });
        }).catch((error) => { 
            dispatch(machineDetailsError(error.response.data.message));
        });
    };
}

export function deleteMachine(machineId) {
    return function(dispatch) {
        axios.delete(`${ROOT_URL}/machines/manage/${machineId}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(response => {
            dispatch({ type: REMOVE_MACHINE, payload: response.data.message });
        }).catch((error) => dispatch(error.response.data.message.error));
    };
}