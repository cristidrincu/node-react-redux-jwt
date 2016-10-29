import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import Header from './header';
import CommentBox from './testing-purposes/comment_box';
import CommentList from './testing-purposes/comment_list';
import * as actions from '../actions';
import { getUserDetailsFromLocalStorage } from '../utils/local-storage/localStorageUtils';

class App extends Component {        
  render() {                                   
    return (      
        <div className="row">
          <div className="col-lg-12">        
            <Header {...this.props} />                
            {/**<CommentBox />  This is for testing purposes only */}
            {/**<CommentList />  This is for testing purposes only  */}        
            {/**Pass the properties of this component to its children(or child)*/}        
            { React.cloneElement(this.props.children, this.props) }
            </div>
        </div>                     
    );
  }
}

function mapStateToProps(state) {      
    return {
      authStatus: state.authentication.authenticated,
      // userDetails: state.userInfo.userDetails ? state.userInfo.userDetails : getUserDetailsFromLocalStorage(), 
      // users: state.userInfo.usersCollection                                               
    }  
}

export default connect(mapStateToProps, actions)(App);