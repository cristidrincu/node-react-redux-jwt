import React from 'react';

const EmailAndRoleTemplate = (props) => {
    return (
        <ul className="list-group">
            <li className="list-group-item">Email: { props.user.email }</li>
            <li className="list-group-item">Role: { props.user.role }</li>
        </ul>
    );
};

export default EmailAndRoleTemplate;