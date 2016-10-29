import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class AuthenticationAdminContributor extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }

      if(this.props.userDetails.role == 'reseller') {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { 
        authenticated: state.authentication.authenticated,
        userDetails: state.userInfo.userDetails
    };
  }

  return connect(mapStateToProps)(AuthenticationAdminContributor);
}