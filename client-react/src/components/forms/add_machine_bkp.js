import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/index';
import { licenses } from '../../utils/licenses/licensesCollection';

import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

import AddMachineWithDemoLicenses from './add-machine-demo-lic.js';
import AddMachineWithFinalLicenses from './add-machine-final-lic.js';

const tempStyles = {
    marginTop: 40
}

class AddMachine extends Component {
    constructor(props) {
        super(props);
        this.state = { isDemo: true, isMaintenance: false };        
    }

    handleFormSubmit(formProps) {
        console.log(formProps);        
        this.props.addMachine(formProps);
    }

    handleChangeForFinalLicenseType(event) {
        this.setState({ isDemo: false, isMaintenance: true });        
    }

    handleChangeForDemoLicenseType(event) {
        this.setState({ isDemo: true, isMaintenance: false });        
    }

    handleChangeMaintenanceType(event) {        
        this.props.fields.maintenanceType.onChange(event.target.value);                        
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
        const { handleSubmit, fields: { machineID, licensesCollection, demoDuration, maintenancePeriod, maintenanceType }} = this.props;        
        return (
            <div className="container" style={tempStyles}>
                { this.renderLicensesTypeRadioGroup() }
                <form onSubmit = { handleSubmit(this.handleFormSubmit.bind(this)) }>
                    <TextField
                        fullWidth = { true }
                        hintText = "Enter machine ID"
                        floatingLabelText="Enter machine ID"
                        errorText = {machineID.touched && machineID.error}
                        {...machineID}/>                    
                    { this.renderLicenseOptions() }
                    { this.state.isDemo ?
                        <div className="form-group">
                            <TextField
                                fullWidth = { true }
                                hintText = "Enter demo duration (months)"
                                floatingLabelText="Enter demo duration (months)"
                                errorText = {demoDuration.touched && demoDuration.error}
                                {...demoDuration}/>
                        </div> :
                        <div>
                            <div className="form-group">
                                <TextField
                                    fullWidth = { true }
                                    hintText = "Maintenance period (years)"
                                    floatingLabelText="Maintenance period (years)"
                                    errorText = {maintenancePeriod.touched && maintenancePeriod.error}
                                    {...maintenancePeriod}/>
                            </div>
                            <div className="form-group">
                                <span>Type: </span>
                                <label className="form-check-inline">
                                    <input className="form-check-input" type="radio" name="maintenanceType" id="maintenanceAdv" value="advanced" onChange={this.handleChangeMaintenanceType.bind(this)} /> Advanced
                                </label>
                                <label className="form-check-inline">
                                    <input className="form-check-input" type="radio" name="maintenanceType" id="maintenancePremium" value="premium" onChange={this.handleChangeMaintenanceType.bind(this)} /> Premium
                                </label>
                            </div>
                        </div>

                    }
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
    //Validate form fields - be careful about typos in form.props, otherwise the submit event is not triggered and will lead to fucked up situations
    //when you do not understand why the hell the submit event is not triggered. In my case, i had machineId instead of machineID
    if (!formProps.machineID) {
        errors.machineID = 'Please enter a valid machine ID';
    }

    // if(!formProps.maintenancePeriod) {
    //     errors.maintenancePeriod = 'Please enter a maintenance period';
    // }

    // if(!formProps.demoDuration) {
    //     errors.demoDuration = 'Please enter a demo duration';
    // }

    return errors;
}

export default reduxForm({
    form: 'addMachine',
    fields: [
        'machineID',
        'licensesCollection[]',
        'demoDuration',
        'maintenancePeriod',
        'maintenanceType'
    ],
    validate: validate
}, mapStateToProps, actions)(AddMachine);