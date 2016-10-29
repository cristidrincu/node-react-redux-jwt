import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/index';
import { licenses } from '../../utils/licenses/licensesCollection';

import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

class AddMachineWithFinalLicenses extends Component {    
    handleFormSubmit(formProps) {                
        this.props.addMachineFinal(formProps);
    }

    handleChangeMaintenanceType(event) {
        this.props.fields.maintenanceType.onChange(event.target.value);
    }    

    renderLicenseOptions() {
        return this.props.licenses.map(license =>
            <div className="form-group" key={license}>
                <div className="col-sm-offset-2 col-sm-10">
                    <div className="checkbox">
                        <Checkbox label={license} name={license} onCheck={e => e.target.checked ? this.props.fields.licensesCollection.addField(e.target.name) : this.props.fields.licensesCollection.removeField(this.props.fields.licensesCollection.indexOf(e.target.name)) }/>
                    </div>
                </div>
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
        const { handleSubmit, fields: { machineID, licensesCollection, maintenanceDuration, maintenanceType }} = this.props;
        return (
            <div className="container">
                <form onSubmit = { handleSubmit(this.handleFormSubmit.bind(this)) }>
                    <TextField
                        fullWidth = { true }
                        hintText = "Enter machine ID"
                        floatingLabelText="Enter machine ID"
                        errorText = {machineID.touched && machineID.error}
                        {...machineID}/>                    
                    { this.renderLicenseOptions() }
                    <div>
                        <div className="form-group">
                            <TextField
                                fullWidth = { true }
                                hintText = "Maintenance duration (years)"
                                floatingLabelText="Maintenance duration (years)"
                                errorText = {maintenanceDuration.touched && maintenanceDuration.error}
                                {...maintenanceDuration}/>
                        </div>
                        <div className="form-group">
                            <span>Type: </span>
                            <label className="form-check-inline">
                                <input className="form-check-input" type="radio" name="maintenanceType" id="maintenanceAdv" value="advanced" onChange={this.handleChangeMaintenanceType.bind(this) } /> Advanced
                            </label>
                            <label className="form-check-inline">
                                <input className="form-check-input" type="radio" name="maintenanceType" id="maintenancePremium" value="premium" onChange={this.handleChangeMaintenanceType.bind(this) } /> Premium
                            </label>
                        </div>
                    </div>
                    <RaisedButton type="submit" label="Add new machine" primary={true}/>
                    { this.renderAlert() }
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        statusMessageAddMachine: state.machinesInfo.message,
        licenses: licenses
    }
}

function validate(formProps) {
    const errors = {};
    if (!formProps.machineID) {
        errors.machineID = 'Please enter a valid machine ID';
    }

    if (!formProps.maintenanceDuration) {
        errors.maintenanceDuration = 'Please enter a maintenance duration';
    }

    return errors;
}

export default reduxForm({
    form: 'addMachine',
    fields: [
        'machineID',
        'licensesCollection[]',
        'maintenanceDuration',
        'maintenanceType'
    ],
    validate: validate
}, mapStateToProps, actions)(AddMachineWithFinalLicenses);