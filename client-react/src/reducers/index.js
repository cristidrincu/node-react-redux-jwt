import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import authReducer from './auth_reducer';
import userDetailsReducer from './user_details_reducer';
import machineReducer from './machines_reducer';
import commentsReducer from './comments_reducer';

const rootReducer = combineReducers({
  form: reduxFormReducer, //form is a piece of our applications state
  authentication: authReducer, //authentication is a piece of our applications state
  userInfo: userDetailsReducer,
  machinesInfo: machineReducer,
  comments: commentsReducer //for testing purposes
});

export default rootReducer;
