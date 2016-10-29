import React from 'react';
import { Link } from 'react-router';

import EmailAndRoleTemplate from './profile-email-and-role';
import ProfileActionsTemplate from './profile-actions';

let moment = require('moment');

const tempStyles = {
    marginTop: 75,
    userMachineDetails: {
        marginTop: 70
    }
}

const ProfileDetailsTemplate = ({user, machines}) => {                            
    const machinesCollection = machines.map( machine => 
            <Link key={ `link-to-${machine._id}` } to={`machines/manage/${machine._id}`}>
                <li className="list-group-item" key={ machine._id }>
                        { machine.machineName } :::: added on: { moment(machine.addedOn).format('DD/MM/YYYY') } :::: { machine.licenses.length } licenses
                </li>
            </Link> 
    );
    
    return (
          <div>
                <div className="col-lg-3" style = {tempStyles}>
                    <EmailAndRoleTemplate user = { user }/>                
                    <ProfileActionsTemplate userRole = { user.role } />                    
                </div>
                <div className="col-lg-8" style={tempStyles.userMachineDetails}>
                    <div className="col-lg-6">
                        <h1>Existing storages: { machinesCollection.length }</h1>
                        <ul className="list-group">
                            { machinesCollection }
                        </ul>                        
                    </div>
                    <div className="col-lg-6">
                        <h1>20 licenses (harcoded value)</h1>                        
                    </div>
                </div>
            </div>      
    );                  
};

export default ProfileDetailsTemplate;