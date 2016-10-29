import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/index';
import { licenses } from '../../utils/licenses/licensesCollection';

import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

class AddMachineWithDemoLicenses extends Component {    

    handleFormSubmit(formProps) {                
        this.props.addMachineDemo(formProps);
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
        const { handleSubmit, fields: { machineID, licensesCollection, demoDuration }} = this.props;
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

                    <div className="form-group">
                        <TextField
                            fullWidth = { true }
                            hintText = "Enter demo duration (months)"
                            floatingLabelText="Enter demo duration (months)"
                            errorText = {demoDuration.touched && demoDuration.error}
                            {...demoDuration}/>
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
    //Validate form fields - be careful about typos in form.props, otherwise the submit event is not triggered and will lead to fucked up situations
    //when you do not understand why the hell the submit event is not triggered. In my case, i had machineId instead of machineID
    if (!formProps.machineID) {
        errors.machineID = 'Please enter a valid machine ID';
    }

    if (!formProps.demoDuration) {
        errors.demoDuration = 'Please enter a demo duration';
    }

    return errors;
}

export default reduxForm({
    form: 'addMachine',
    fields: [
        'machineID',
        'licensesCollection[]',
        'demoDuration',
    ],
    validate: validate
}, mapStateToProps, actions)(AddMachineWithDemoLicenses);