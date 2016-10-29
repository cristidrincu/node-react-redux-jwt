import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { getUserDetailsFromLocalStorage } from '../../utils/local-storage/localStorageUtils';

const profileStyles = {
    positioning: {
        marginTop: 70
    }
}

class EditProfile extends Component {
    handleFormSubmit(formProps) {                
        this.props.editProfile(formProps);
    }

    //please implement this
    renderAlert() {
        return true;
    }

    renderUserDetailsForEdit() {
        const { handleSubmit, fields: { emailAddress }} = this.props;        
        let emailAddressLocalStorage = getUserDetailsFromLocalStorage().details.email;        
        return (
            <div>
                <div className="col-lg-12" style={ profileStyles.positioning }>
                    <h3>Modify your profile</h3>
                    <form onSubmit = { handleSubmit(this.handleFormSubmit.bind(this)) }>
                        <TextField
                            fullWidth = { true }   
                            hintText = { `${emailAddressLocalStorage} (current email address)` }                         
                            floatingLabelText="Modify email address"                            
                            errorText = {emailAddress.touched && emailAddress.error}
                            {...emailAddress} />
                        <RaisedButton type="submit" label="Update your profile" primary={true}/>
                        { this.renderAlert() }
                    </form>
                </div>
            </div>
        );
    }

    render() {        
        return (
            <div className="row">
                { this.renderUserDetailsForEdit() }
            </div>
        );
    }
}

export default reduxForm({
    form: 'addMachine',
    fields: [
        'emailAddress'
    ]    
}, null, actions)(EditProfile);