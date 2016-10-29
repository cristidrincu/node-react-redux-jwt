import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import { AUTH_USER, FETCH_USER_DETAILS, GET_USERS, GET_ALL_MACHINES } from './actions/types';

import App from './components/app';
import RequireAuth from './components/auth/require_auth';
import RequireAdminOrContributor from './components/auth/require_contributor_auth';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import ProfileMaster from './components/user/profile-master';
import RegisterStorageMaster from './components/register-storage/register-storage-master';
import EditProfile from './components/user/edit-profile';
import Feature from './components/feature';
import AddMachine from './components/forms/add_machine';
import ManageUsers from './components/user/manage-users-master';
import ManageMachines from './components/machines/manage-machines-master';
import MachineDetailsMaster from './components/machines/machine-details-master';
import UserDetailsPresentationalComponent from './components/user/presentational-components-user-details/user-details-child-component';
import Welcome from './components/welcome';

import reducers from './reducers';
import { loadState, saveState } from './localStorage';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500} from 'material-ui/styles/colors';

const persistedState = loadState();
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const token = localStorage.getItem('token');
const store = createStoreWithMiddleware(reducers, persistedState, window.devToolsExtension && window.devToolsExtension());

const muiTheme = getMuiTheme({  
  appBar: {
    height: 90    
  }
});

store.subscribe(() => {
    saveState(store.getState());    
});

//if token exists, consider user to be signed in - 'Keep me signed in functionality'
if(token) {
    //update application state
    store.dispatch({ type: AUTH_USER});        
}

ReactDOM.render(
    <Provider store={store}>     
        <MuiThemeProvider muiTheme={muiTheme}>
            <Router history={ browserHistory }>
                <Route path="/" component={ App }>
                    <IndexRoute component = { Welcome } />
                    <Route path = "signin" component = { Signin } />
                    <Route path = "signup" component = { Signup } />
                    <Route path = "signout" component = { Signout } />
                                        
                    <Route path = "profile" component = { RequireAuth(ProfileMaster) } />
                    <Route path = "profile/edit" component = { RequireAuth(EditProfile) } />
                    <Route path = "register-storage" component = { RequireAuth(RegisterStorageMaster) } />

                    <Route path = "manage-users" component = { RequireAdminOrContributor(ManageUsers) } />
                    <Route path = "user-details-in-list/:userId" component = { RequireAdminOrContributor(UserDetailsPresentationalComponent) } />

                    <Route path = "feature" component = { RequireAuth(Feature) } />
                    
                    <Route path = "machines/manage" component = { RequireAdminOrContributor(ManageMachines) } />                    
                    <Route path = "machines/add" component = { RequireAdminOrContributor(AddMachine) } />
                    <Route path = "machines/manage/:machineId" component = { RequireAuth(MachineDetailsMaster) } />                                                                                                                        
                </Route>
            </Router>
        </MuiThemeProvider>
    </Provider> 
  , document.querySelector('.container-fluid'));
