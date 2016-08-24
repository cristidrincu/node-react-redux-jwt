import React from 'react';
import { Component } from 'react';
import Header from './header';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        { this.props.children } {/*all components that are children of the App - this is how you render them*/}
      </div>
    );
  }
}
