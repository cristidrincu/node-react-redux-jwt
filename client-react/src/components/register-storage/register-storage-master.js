import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegisterStorageForm from './presentational-components/register-storage-form';

const tempStyles = {
    marginTop: 70
}

class RegisterStorageMaster extends Component {    
    render() {                                
        return (
            <div style={tempStyles}>                                    
                <RegisterStorageForm 
                        checkingIfMachineBelongsToUser = { this.props.checkingIfMachineBelongsToUser }
                        doesMachineBelongToUser = { this.props.doesMachineBelongToUser }
                        getMachineDetailsUsingMachineName = { this.props.getMachineDetailsUsingMachineName }                         
                        requestMachineDetails = { this.props.requestMachineDetails }
                        activateMachine = { this.props.activateMachine } 
                />                
            </div>
        );
    }
}

export default RegisterStorageMaster;