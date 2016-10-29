import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import {red500, blue500, orange500, green500} from 'material-ui/styles/colors';
import { Link } from 'react-router';

import TableRowMachineDetails from './table-row-machine-details';
import DeleteMachineModal from '../../modal/modalDialogDeleteMachine';

let moment = require('moment');

const iconStyles = {
    marginRight: 2,
};

const htmlButton = {
    border: 'none',
    background: 'none'
}

class TableWithMachineProps extends Component {
    handleModalOpen(machine) {                
        this.refs.modalDialog.handleOpen(machine);
    }

    mapMachineObjectCollectionToArray(machinesObjectCollection) {
        let arrCollection = [];                
        for (var machineObject in machinesObjectCollection) {
            arrCollection[machineObject] = machinesObjectCollection[machineObject];
        }
        return arrCollection;
    }

    isMachineCollectionPopulated(machinesCollection) {
        if (machinesCollection.length > 0) {
            return true;
        }
        return false;
    }

    renderMachineCollection(machinesObjectCollection) {
        let machinesArr = this.mapMachineObjectCollectionToArray(machinesObjectCollection);        
        if (!this.isMachineCollectionPopulated(machinesArr)) {
            return(
                <TableRow>
                    <TableRowColumn>There are no machines to display!</TableRowColumn>
                </TableRow>
            );        
        } else {
            return machinesArr.map(machine =>
                <TableRow key={ machine._id }>
                    <TableRowColumn>{ machine.machineName }</TableRowColumn>
                    <TableRowColumn>{ moment(machine.addedOn).format('DD/MM/YYYY') }</TableRowColumn>
                    <TableRowColumn>
                        <Link key={2} to={ `/machines/manage/${machine._id}` } machineDetails={machine}>
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
            );
        }
    };

    render() { 
        let { machines } = this.props;                                                             
        return (
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Machine name/Machine ID</TableHeaderColumn>
                            <TableHeaderColumn>Machine added on</TableHeaderColumn>
                            <TableHeaderColumn>Actions</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { this.renderMachineCollection(machines) }
                    </TableBody>
                </Table>
                <DeleteMachineModal 
                        getMachineCollectionAction={this.props.getMachineCollectionAction}
                        deleteMachineAction = {this.props.deleteMachineAction}
                        ref="modalDialog"
               />
            </div>
        );
    }
};

export default TableWithMachineProps;