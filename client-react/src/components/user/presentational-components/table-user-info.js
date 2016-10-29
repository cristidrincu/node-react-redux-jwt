import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import {red500, blue500, orange500, green500} from 'material-ui/styles/colors';
import { Link } from 'react-router';

import DeleteMachineModal from '../../modal/modalDialogDeleteMachine'; //create DeleteUserModal instead of this 

const iconStyles = {
    marginRight: 2,
};

const htmlButton = {
    border: 'none',
    background: 'none'
}

class TableWithProps extends Component {
    handleModalOpen() {
        this.refs.modalDialog.handleOpen();
    }

    renderUserCollection(usersObjectCollection) {
        let usersArr = [];
        for (var userObject in usersObjectCollection) {
            usersArr[userObject] = usersObjectCollection[userObject];
        }
        if (usersArr.length === 0) {
            <TableRow>
                <TableRowColumn>There are no users to display!</TableRowColumn>
            </TableRow>
        } else {
            return usersArr.map(user =>
                <TableRow key={ user._id }>
                    <TableRowColumn>{ user.email }</TableRowColumn>
                    <TableRowColumn>{ user.role }</TableRowColumn>
                    <TableRowColumn>
                        <Link key={2} to={ "/user-details-in-list/" + user._id }>
                            <button style={ htmlButton }>                            
                                <FontIcon className="material-icons" style={iconStyles} color={blue500}>account_circle</FontIcon>
                            </button>
                        </Link>
                        <Link key={3} to={ "/user-details/" + user._id + "/edit" }>
                            <button style={ htmlButton }>
                                <FontIcon className="material-icons" style={iconStyles} color={orange500}>mode_edit</FontIcon>
                            </button>
                        </Link>                                                
                        <button style={ htmlButton } onClick={ this.handleModalOpen.bind(this) }>
                            <FontIcon className="material-icons" style={iconStyles} color={red500}>delete_sweep</FontIcon>
                        </button>                        
                    </TableRowColumn>
                </TableRow>
            )
        }
    };

    render() {                
        return (
            <div>
                <Table {...this.props}>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>User email/ID</TableHeaderColumn>
                            <TableHeaderColumn>User role</TableHeaderColumn>
                            <TableHeaderColumn>Actions</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { this.renderUserCollection(this.props) }
                    </TableBody>
                </Table>
                <DeleteMachineModal {...this.props} ref="modalDialog"/>
            </div>
        );
    }
};

export default TableWithProps;