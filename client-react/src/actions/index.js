import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER } from './types';

const ROOT_URL = "http://localhost:3090";

export function signinUser( {email, password} ) {
    //this is for redux-thunk. Usually, actions return objects
    return function(dispatch) {
        //allows us to dispatch actions at any point in time and logic - see below
        //dispatch - main pipeline of redux, gets to all reducers in our app

        //Submit email/password to server
        axios.post(`${ROOT_URL}/signin`, { email, password }).then(response => {
            //if request is good, update state to indicate that the user is authenticated
            dispatch({ type: AUTH_USER }); //dispatch an action of type AUTH_USER
            //save jwt token so users can make authenticated requests
            //redirect to the route /feature
            browserHistory.push('/feature');
        }).catch(() => {
            //if request is bad, display error message to user, have options to sign in again or sign up for the user
        });
    };
}