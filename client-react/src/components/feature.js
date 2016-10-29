import React, { Component } from 'react';
import { connect } from 'react-redux';

const tempStyles = {
    marginTop: 70
}

class Feature extends Component {        

    render() {
        return(
            <div className="container" style={tempStyles}>
                <h1>Portal status at a glance</h1>
                <ul className="list-inline">
                    <li><h4>50 resellers ::</h4></li>
                    <li><h4>More than 150 machines registered ::</h4></li>
                    <li><h4>Over 10000 licenses generated</h4></li>
                </ul>                                                            
            </div>            
        );
    }
}

function mapStateToProps(state) {
    return {                        
        errorMessage: state.authentication.errorMessage,                
    }    
}

export default connect(mapStateToProps)(Feature);