import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getIDAndRoleFromLocalStorage } from '../utils/local-storage/localStorageUtils';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import MenuItem from 'material-ui/MenuItem';

const style = {
    margin: 12
}

const styleAppText = {
    marginLeft: 10
}

class Header extends Component {            
    renderHTMLMenu() {
            let accountLinks = [];                   
            const { _id, role} = getIDAndRoleFromLocalStorage();
            if(this.props.authStatus) {                                    
                accountLinks.push(            
                    <li key={1}><Link to="/signout">Signout</Link></li>,
                    <li key={2}><Link to="/profile">Profile</Link></li>,                                                                                                                                                        
                );
                if(role==='reseller'){
                    accountLinks.push(<li key={31}><Link to="/register-storage">Register storage</Link></li>);
                }
                if (role === 'admin' || role === 'contributor') {
                    accountLinks.push(
                        <li key={3}><Link to="/machines/add">Add machine</Link></li>,
                    );
                }
                if (role === 'admin') {
                    accountLinks.push(
                        <li key={4}><Link to="/manage-users">Manage users</Link></li>,
                        <li key={5}><Link to="/machines/manage">Manage machines</Link></li>,                                                
                    );
                }
            } else {
                accountLinks.push(                    
                    <li key={1}><Link to="/signin">Signin</Link></li>,
                    <li key={2}><Link to="/signup">Signup</Link></li>
                );                                                                        
            }

            return accountLinks;        
    };    

    render() {                                
        return (
            <div className="row">
                <div className="col-lg-12">                                                                                                                                                    
                <nav className="navbar navbar-default navbar-fixed-top">  
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand">Syneto Client Portal</Link>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">                                        
                                { this.renderHTMLMenu() }                    
                            </ul>
                        </div>
                    </div>                                                                                                                                                                                              
                </nav>                           
                </div>                
            </div>            
        );
    }
}

function mapStateToProps(state) {
    return {
        authStatus: state.authentication.authenticated                                             
    }
}

export default connect(mapStateToProps)(Header);
