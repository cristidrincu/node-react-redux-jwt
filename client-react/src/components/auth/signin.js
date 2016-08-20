/**
 * Created by cristiandrincu on 8/20/16.
 */
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/index';

class Signin extends Component {
    handleFormSubmit( {email, password} ) {
        console.log(email, password);
        this.props.signinUser({email, password});
    }

    render() {
        //reduxForm properties - we can write fields shorter using es6 rule - if key and value have the same name, we can just write: fields: { email, password }
        //however, i believe code is much more readable using fields: { email: email, password: password } for starters
        const {handleSubmit, fields: { email: email, password: password } } = this.props;

        return(
            <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                <fieldset className="form-group">
                    <label>Email</label>
                    <input { ...email } className="form-control"/>
                </fieldset>
                <fieldset className="form-group">
                    <label>Password</label>
                    <input { ...password } type="password" className="form-control"/>
                </fieldset>
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

//reduxForm has its own reducer, which must be added to our apps own root reducer - see /reducers/index.js
export default reduxForm({
    form: 'signin', //the actual name of the form
    fields: ['email', 'password']
}, null, actions)(Signin); //null represents mapStateToProps, which we do not need yet