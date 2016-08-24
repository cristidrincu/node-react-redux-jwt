import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/index';

class Signup extends Component {
    render() {
        const { handleSubmit, fields: {email: email, password: password, passwordConfirm: passwordConfirm} } = this.props;
        return(
            <form>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <input className="form-control" {...email}/>
                    { email.touched && email.error && <div className="error">{email.error}</div> }
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" {...password}/>
                    { password.touched && password.error && <div className="error">{password.error}</div> }
                </fieldset>
                <fieldset className="form-group">
                    <label>Password confirm:</label>
                    <input type="password" className="form-control" {...passwordConfirm}/>
                    { passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div> }
                </fieldset>
                <button action="submit" className="btn btn-primary">Sign up</button>
            </form>
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

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate: validate
})(Signup);