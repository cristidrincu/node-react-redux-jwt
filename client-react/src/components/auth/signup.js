import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/index';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const tempStyles = {
    marginTop: 40
}

class Signup extends Component {    
    handleFormSubmit(formProps) {
        //call action creator to signup user
        this.props.signupUser(formProps);
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return(
                <div className="alert alert-danger">
                    <strong>Error:</strong>{ this.props.errorMessage }
                </div>
            );
        }        
    }

    render() {                        
        const { handleSubmit, fields: {email: email, password: password, passwordConfirm: passwordConfirm} } = this.props;
        return(
            <div className="container" style={tempStyles}>
                <form onSubmit = { handleSubmit(this.handleFormSubmit.bind(this)) }>
                <TextField 
                    fullWidth = { true }
                    hintText = "Your email address"
                    floatingLabelText="Your email address"
                    errorText = {email.touched && email.error}
                    {...email}/>
                <TextField 
                    fullWidth = { true }
                    hintText = "Type a password"
                    floatingLabelText="Type a password"
                    errorText = {password.touched && password.error}
                    type="password"
                    {...password}/>
                <TextField 
                    fullWidth = { true }
                    hintText = "Confirm password"
                    floatingLabelText="Confirm password"
                    errorText = {passwordConfirm.touched && passwordConfirm.error}
                    type="password"
                    {...passwordConfirm}/>                                        
                    { this.renderAlert() }
                    <RaisedButton type="submit" label="Signup" primary={true}/>                                
                </form>
            </div>
        );
    }
}

//validate() - required method for validation inside reduxForm, it is part of reduxForm
//formProps will contain email, password and passwordConfirm
function validate(formProps) {
    // console.log(formProps);
    const errors = {};    
    //iterate over formProps with forEach and use a switch statement to check the properties
    if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }

    if (!formProps.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password';
    }

    if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match!';
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.authentication.error,
        userDetails: state.userInfo.userDetails
    }
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate: validate
}, mapStateToProps, actions)(Signup);