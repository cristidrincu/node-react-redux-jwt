import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERR, UNAUTH_USER, FETCH_MESSAGE, FETCH_COMMENTS, ADD_COMMENT } from './types';

const ROOT_URL = "http://localhost:3090";
const config = { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } };

export function signinUser( {email, password} ) {
    //this is for redux-thunk. Usually, actions return objects
    return function(dispatch) {
        //allows us to dispatch actions at any point in time and logic - see below
        //dispatch - main pipeline of redux, gets to all reducers in our app

        //Submit email/password to server
        axios.post(`${ROOT_URL}/signin`, { email, password }).then(response => {
            //if request is good, update state to indicate that the user is authenticated
            dispatch({ type: AUTH_USER, payload: response.data.role }); //dispatch an action of type AUTH_USER
            //save jwt token so users can make authenticated requests            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', response.data.role);
            //redirect to the route /feature
            browserHistory.push('/feature');
        }).catch(() => {
            //if request is bad, display error message to user, have options to sign in again or sign up for the user
            dispatch(authError('Bad credentials provided. Try again!'));
        });
    };
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', response.data.email);                
        browserHistory.push('/feature');
      })
      .catch((error) => {
          dispatch(authError(error.response.data.error));
      });
  };
}

export function authError(error) {
    return {
        type: AUTH_ERR,
        payload: error
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER         
    };
}

export function fetchMessage() {
    return function(dispatch) {        
        axios.get(ROOT_URL, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then(response => {
            dispatch({
                type: FETCH_MESSAGE,
                payload: response.data.message
            });
        }).catch((error) => dispatch(authError(error.response.data.error)));
    };
}