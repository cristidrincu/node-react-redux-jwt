import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserDetailsFromLocalStorage } from '../../../utils/local-storage/localStorageUtils';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import CheckingLicensesForMachineModal from '../../modal/modalCheckingLicensesForMachine';

class RegisterStorageForm extends Component {
    constructor(props) {
        super(props);
        this.state = { textFieldValue: null};
    }    

    handleTextFieldChange(event) {        
        this.setState({ textFieldValue: event.target.value });                
    }

    doesMachineBelongToUser(machineName) {        
        //since it is being read from local storage, i only get 1 machine instead of 3 - this.props.userDetails.details.machines
        //it seems local storage gets updated only at sign in and stays immune to changes regarding the state hold in the browsers memory
        //somehow, the listener for state changes in the browsers history does not write to local storage the new changes 
        console.log(this.props.userDetails.details.machines);
        var result = false;
        this.props.userDetails.details.machines.forEach(function(machine) {            
            machine.machineName === machineName ? result = true : result;
        });
        return result;
    }        

    renderErrorIfMachineAlreadyRegistered() {
        return <div><p>Machine already registered!</p></div>
    }

    openModalAndDisplayMachineProps() {
        this.props.requestMachineDetails();
        this.props.getMachineDetailsUsingMachineName(this.state.textFieldValue);
        this.refs.checkingLicensesForMachineModal.handleOpen(this.state.textFieldValue);                
        this.setState({ textFieldValue: null });
    }    

    handleModalOpen() {                 
        this.openModalAndDisplayMachineProps();                                                     
    }

    render() {                                                               
        return (                            
            <div className="container">                
                <TextField
                    fullWidth = { true }
                    hintText = "Enter machine ID"
                    floatingLabelText="Enter machine ID"
                    ref="machineIDField"
                    value = { this.state.textFieldValue }
                    onChange = { this.handleTextFieldChange.bind(this) } />                    
                    { this.state.textFieldValue && !this.doesMachineBelongToUser(this.state.textFieldValue) ?  
                        <RaisedButton type="submit" label="Check for licenses" primary={true} onClick={ this.handleModalOpen.bind(this) }/> :                                                    
                        <RaisedButton type="submit" label="Check for licenses" primary={true} disabled/>                                                                         
                    }                    
                <CheckingLicensesForMachineModal ref="checkingLicensesForMachineModal"
                    machine = { this.props.machine }
                    user = { this.props.userDetails }                                        
                    isMachineAlreadyActivated = { this.props.isMachineAlreadyActivated }                                       
                    isFetchingMachineDetails = { this.props.isFetchingMachineDetails }
                    machineDetailsMessage = { this.props.machineDetailsMessage }
                    activateMachine = { this.props.activateMachine }
                    />
            </div>                            
        );
    }
}

function mapStateToProps(state) {
    return { 
        checkingIfMachineActivated: state.userInfo.checkingIfMachineBelongsToUser,       
        isMachineAlreadyActivated: state.userInfo.doesMachineBelongToUser,
        isFetchingMachineDetails: state.machinesInfo.isFetching,        
        machine: state.machinesInfo.machineDetails,
        machineDetailsMessage: state.machinesInfo.message,                
        userDetails: getUserDetailsFromLocalStorage()                
    }
}

export default connect(mapStateToProps)(RegisterStorageForm);