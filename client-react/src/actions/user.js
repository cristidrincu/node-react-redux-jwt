// investigate further how to brake all actions from index into separate actions files, based on their purpose
import axios from 'axios';
import { FETCH_USER_DETAILS, USER_DETAILS_ERR } from './types';
const ROOT_URL = "http://localhost:3090";
const config = { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } };

export function fetchUserDetails(userId) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/user-details/${userId}`, {
            headers: {
                authorization: localStorage.getItem('token')                
            }
        }).then(response => {            
            dispatch({
                type: FETCH_USER_DETAILS,
                payload: response.data.user_details
            });
        }).catch((error) => dispatch(userDetailsError(error.response.data.error)));
    };
}