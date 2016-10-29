import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/index';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const tempStyles = {
    marginTop: 40
}

class Signin extends Component {
    handleFormSubmit({email, password}) {
        this.props.signinUser({ email, password });
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Error logging in</strong> { this.props.errorMessage }
                </div>
            );
        }
    }

    render() {
        //reduxForm properties - we can write fields shorter using es6 rule - if key and value have the same name, we can just write: fields: { email, password }
        //however, i believe code is much more readable using fields: { email: email, password: password } for starters
        const {handleSubmit, fields: { email: email, password: password, userProps: userProps } } = this.props;

        return (
            <div className="container" style={tempStyles}>
                <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                    <TextField
                        fullWidth = { true }
                        hintText = "Your email"
                        floatingLabelText="Your email"
                        errorText = {email.touched && email.error}
                        {...email}/>
                    <TextField
                        fullWidth = { true }
                        hintText = "Your password"
                        floatingLabelText="Your password"
                        errorText = {password.touched && password.error}
                        type="password"
                        {...password}/>
                    { this.renderAlert() }
                    <RaisedButton type="submit" label="Signin" primary={true}/>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    //pull the error message from state and map it to the component's properties
    return {
        errorMessage: state.authentication.error
    }
}

//reduxForm has its own reducer, which must be added to our apps own root reducer - see /reducers/index.js
export default reduxForm({
    form: 'signin', //the actual name of the form
    fields: ['email', 'password', 'userProps'],
    initialValues: {
        userProps: localStorage.getItem('_id')
    }
}, mapStateToProps, actions)(Signin);