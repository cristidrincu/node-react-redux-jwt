import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpinnerTemplate from '../spinner/spinnerTemplate';
import ProfileDetailsTemplate from './presentational-components/profile-details';

class ProfileMaster extends Component {
    componentDidMount() {
        this.props.requestUserDetails();
        this.props.fetchUserDetails(this.props.user._id);
    }

    render() { 
        let { user } = this.props;
        let { machines } = this.props.user;
        return (
            <div>
                { this.props.isFetchingUserDetails ?
                    <SpinnerTemplate styleProps="uil-ring-css" animation="uil-ring-anim" /> :
                    <ProfileDetailsTemplate user={ user } machines = { machines } />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetchingUserDetails: state.userInfo.isFetchingUserDetails,
        user: state.userInfo.userDetails        
    }
}

export default connect(mapStateToProps)(ProfileMaster);