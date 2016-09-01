import React from 'react';
import { Component } from 'react';
import Header from './header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CommentBox from './testing-purposes/comment_box';
import CommentList from './testing-purposes/comment_list';

export default class App extends Component {
  render() {
    return (
      <div>      
        <Header/>
        { this.props.children } {/*all components that are children of the App - this is how you render them*/}
        <p>React Simple Starter</p>
        <CommentBox /> {/** This is for testing purposes only */}
        <CommentList /> {/** This is for testing purposes only  */}
      </div>        
    );
  }
}
