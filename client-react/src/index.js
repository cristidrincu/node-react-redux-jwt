import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';

import App from './components/app';
import RequireAuth from './components/auth/require_auth';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import Feature from './components/feature';
import Welcome from './components/welcome';
import reducers from './reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const token = localStorage.getItem('token');
const store = createStoreWithMiddleware(reducers);

//if token exists, consider user to be signed in - 'Keep me signed in functionality'
if(token) {
    //update application state
    store.dispatch({ type:  AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
      <Router history={ browserHistory }>
          <Route path="/" component={ App }>
              <IndexRoute component = { Welcome } />
              <Route path = "signin" component = { Signin } />
              <Route path = "signup" component = { Signup } />
              <Route path = "signout" component = { Signout } />
              <Route path = "feature" component = { RequireAuth(Feature) } />
          </Route>
      </Router>
  </Provider>
  , document.querySelector('.container'));
