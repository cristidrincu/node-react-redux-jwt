import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

import AddMachineWithDemoLicenses from './add-machine-demo-lic.js';
import AddMachineWithFinalLicenses from './add-machine-final-lic.js';

const tempStyles = {
    marginTop: 70
}

class AddMachine extends Component {
    constructor(props) {
        super(props);
        this.state = { isDemo: true, isMaintenance: false };        
    }    

    handleChangeForFinalLicenseType(event) {
        this.setState({ isDemo: false, isMaintenance: true });        
    }

    handleChangeForDemoLicenseType(event) {
        this.setState({ isDemo: true, isMaintenance: false });        
    }    

    renderLicensesTypeRadioGroup() {        
        return (
            <div className="form-group">
                <span>Licenses type: </span>
                <label className="form-check-inline">
                    <input className="form-check-input" type="radio" name="license-type" id="inlineRadio1" value="demo" defaultChecked onClick={ this.handleChangeForDemoLicenseType.bind(this) }/> Demo
                </label>
                <label className="form-check-inline">
                    <input className="form-check-input" type="radio" name="license-type" id="inlineRadio2" value="final" onClick={ this.handleChangeForFinalLicenseType.bind(this) }/> Final
                </label>
            </div>
        );
    }    

    renderAlert() {
        if (this.props.statusMessageAddMachine) {
            if (this.props.statusMessageAddMachine.error) {
                return (
                    <div className="alert alert-danger">
                        <strong>Error: </strong>{ this.props.statusMessageAddMachine.error }
                    </div>
                );
            }

            if (this.props.statusMessageAddMachine.success) {
                return (
                    <div className="alert alert-success">
                        <strong>Success: </strong>{ this.props.statusMessageAddMachine.success }
                    </div>
                );
            }
        }
    }

    render() {                                       
        return (
            <div className="container" style={tempStyles}>
                { this.renderLicensesTypeRadioGroup() }
                { this.state.isDemo ?  <AddMachineWithDemoLicenses /> : <AddMachineWithFinalLicenses />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        statusMessageAddMachine: state.machinesInfo.message
    }
}

export default connect(mapStateToProps)(AddMachine);