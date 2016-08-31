import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
    renderAccountLinksBasedOnUserAuthentication() {
        {/*Investigate why the import of utils/app-messages/auth.js does not seem to work*/}
        if(this.props.authStatus && this.props.userRole === 'reseller') {
            return( 
                <li className="nav-item">
                    <Link to="/signout" className="nav-link">Sign out</Link>
                    <Link to="/invite-friends" className="nav-link">Invite your friends</Link>
                </li>
            ); 
        } else {
            {/* render multiple elements. the key is there for react who thinks this is a list of components and wants to add a key to each component in the array. just plain integers suffice* */}
            return[
                <li className="nav-item" key={1}>
                    <Link to="/signin" className="nav-link">Sign in</Link>
                </li>,
                <li className="nav-item" key={2}>
                    <Link to="/signup" className="nav-link">Sign up</Link>
                </li>
            ];            
        }        
    }

    render() {
        return (                        
            <nav className="navbar navbar-default">                                    
                <Link to="/" className="navbar-brand">Syneto Client Portal</Link>
                <ul className="nav navbar-nav">                                        
                    { this.renderAccountLinksBasedOnUserAuthentication() }                    
                </ul>                                                                    
            </nav>            
        );
    }
}

function mapStateToProps(state) {
    return {
        authStatus: state.authentication.authenticated,
        userRole: state.authentication.userRole
    }
}

export default connect(mapStateToProps)(Header);
