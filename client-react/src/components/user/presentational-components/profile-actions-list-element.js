import React from 'react';
import { Link } from 'react-router';
import {grey500} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';

const iconStyles = {
    marginRight: 2,
};

const ProfileActionsListElement = (props) => {
    return (
        <li className="list-group-item">
                <Link to={props.linkTo}>
                    <FontIcon name={props.fontIconName} className="material-icons" style={iconStyles} color={grey500}>
                        {props.materialUIIcon}
                    </FontIcon>
                    {props.actionName}
                </Link>
        </li>
    );

};

export default ProfileActionsListElement;