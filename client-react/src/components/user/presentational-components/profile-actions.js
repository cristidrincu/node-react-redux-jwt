import React from 'react';
import ProfileActionsListElement from './profile-actions-list-element';
const ProfileActionsTemplate = (props) => {

    return (
        <div>
            { props.userRole === 'admin' || props.userRole === 'contributor' ?
                <ul className="list-group">                                                            
                    <ProfileActionsListElement
                        linkTo="/machines/add"
                        fontIconName="add_machine"
                        materialUIIcon="add_circle"
                        actionName="Add machine" />
                    <ProfileActionsListElement
                        linkTo="/machines/manage"
                        fontIconName="manage_machines"
                        materialUIIcon="desktop_mac"
                        actionName="Machines" />
                </ul>
                :
                <ul className="list-group">
                    <ProfileActionsListElement
                        linkTo="profile/edit"
                        fontIconName="your_profile"
                        materialUIIcon="account_circle"
                        actionName="Edit your profile" />                    
                    <ProfileActionsListElement                        
                        linkTo="/register-storage"
                        fontIconName="your_profile"
                        materialUIIcon="account_circle"
                        actionName="Register Syneto Storage" />    
                    <ProfileActionsListElement                        
                        linkTo=""
                        fontIconName="app_settings"
                        materialUIIcon="settings"
                        actionName="Application settings" />
                </ul>
            }
        </div>
    );
};

export default ProfileActionsTemplate;