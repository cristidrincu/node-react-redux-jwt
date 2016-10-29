import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions/index';
let _ = require('underscore');

import AlertSuccessOrErrorGetEntity from '../alerts/alert-get-entity';
import UserTypeTabsTemplate from './presentational-components/user-type-tabs';
import SpinnerTemplate from '../spinner/spinnerTemplate';

const tempStyles = {    
    marginTop: 55        
}

class ManageUsers extends Component {
    constructor() {
        super();
        this.state = { closeNotification: false };
    }

    componentDidMount() {
        this.props.requestingUsers();
        this.props.getUsers();
        this.setState({ closeNotification: false });
    }

    closeNotification() {        
        this.setState({ closeNotification: true });
    }            

    render() {               
        return (
            <div>
                { this.props.isFetchingUsers ?
                    <SpinnerTemplate styleProps="uil-ring-css" animation="uil-ring-anim" /> :                
                    <div className="row" style={tempStyles}>
                        { this.state.closeNotification ? 
                                <div></div> : 
                                <a onClick={ this.closeNotification.bind(this) }>
                                    <AlertSuccessOrErrorGetEntity { ...this.props.usersCollectionMessage }/>
                                </a>
                        }
                        <UserTypeTabsTemplate resellers = { this.props.resellers} contributors = { this.props.contributors } admins = { this.props.admins} />
                    </div>    
                }                                                                
            </div>           
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetchingUsers: state.userInfo.isFetchingUsers,
        resellers: _.filter(state.userInfo.usersCollection, function (user) {
            return user.role === 'reseller';
        }),
        contributors: _.filter(state.userInfo.usersCollection, function (user) {
            return user.role === 'contributor';
        }),
        admins: _.filter(state.userInfo.usersCollection, function (user) {
            return user.role === 'admin';
        }),
        usersCollectionMessage: state.userInfo.usersCollectionMessage
    };
}

export default connect(mapStateToProps, actions)(ManageUsers);