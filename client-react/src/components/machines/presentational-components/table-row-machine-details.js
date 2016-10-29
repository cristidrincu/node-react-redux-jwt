// Refactor it so it can be used inside table-machines.js

import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import {red500, blue500, orange500, green500} from 'material-ui/styles/colors';
import { Link } from 'react-router';

let moment = require('moment');

const iconStyles = {
    marginRight: 2,
};

const htmlButton = {
    border: 'none',
    background: 'none'
}

const TableRowMachineDetails = ({ machine }) => {                              
        <TableRow>
            <TableRowColumn>{ machine.machineName }</TableRowColumn>
            <TableRowColumn>{ moment(machine.addedOn).format('DD/MM/YYYY') }</TableRowColumn>
            <TableRowColumn>
                <Link key={2} to={ "/machines/manage/" + machine._id }>
                    <button style={ htmlButton }>
                        <FontIcon className="material-icons" style={iconStyles} color={blue500}>account_circle</FontIcon>
                    </button>
                </Link>
                <Link key={3} to={ "/machines/manage/" + machine._id + "/edit" }>
                    <button style={ htmlButton }>
                        <FontIcon className="material-icons" style={iconStyles} color={orange500}>mode_edit</FontIcon>
                    </button>
                </Link>
                <button style={ htmlButton } onClick={ this.handleModalOpen.bind(this, machine) } >
                    <FontIcon className="material-icons" style={iconStyles} color={red500}>delete_sweep</FontIcon>
                </button>
            </TableRowColumn>
        </TableRow>    
};

export default TableRowMachineDetails;