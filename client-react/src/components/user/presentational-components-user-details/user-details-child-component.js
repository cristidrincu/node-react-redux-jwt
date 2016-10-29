import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpinnerTemplate from '../../spinner/spinnerTemplate';

const tempStyles = {
    marginTop: 75,
    userDetails: {
        marginTop: 70
    }
}

class UserDetailsPresentationalComponent extends Component {
    componentDidMount() {
        this.props.requestingUserDetailsInList();
        this.props.fetchUserDetailsInList(this.props.params.userId);
    }
    
    render() {                        
        return (            
            <div>
                { this.props.isFetchingUserDetailsInList ? 
                    <SpinnerTemplate styleProps="uil-ring-css" animation="uil-ring-anim" />  
                    :
                    <div>
                        <div className="col-lg-3" style = {tempStyles}>
                            <p>{ /* this.props.user.email**/ }</p>
                        </div>
                        <div className="col-lg-8" style={tempStyles.userDetails}>
                            <ul className="list-group">
                                { /* machines **/ }
                            </ul>
                            <div className="col-lg-6">
                                <h1>20 </h1>
                                <p>licenses (harcoded value) </p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        isFetchingUserDetailsInList: state.userInfo.isFetchingUserDetailsInList,
        user: state.userInfo.userDetailsInList
    }
}

export default connect(mapStateToProps)(UserDetailsPresentationalComponent);