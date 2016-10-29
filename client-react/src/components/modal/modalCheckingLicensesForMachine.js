import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SpinnerTemplate from '../spinner/spinnerTemplate';

let moment = require('moment');

class CheckingLicensesForMachineModal extends Component {
    constructor(props) {
        super(props);                             
        this.state = { open: false };
    }    

    handleOpen(machineName) {
        this.setState({
            open: true });
    }

    handleClose() {
        this.setState({ open: false });        
    };

    handleActivateMachine(machineName, userId) {
        this.props.activateMachine(machineName, userId);
        this.handleClose();
    }

    renderLicensesListForMachine(licenses) {
        return licenses.length > 0 ?
            licenses.map(license =>
                <li className="list-group-item" key={license}>{license}</li>) :
            <li className="list-group-item">No licenses found for this machine!</li>;
    }

    render() {        
        let licensesLength = this.props.machine.licenses.length;

        //default collection of buttons for the modal dialog - start with cancel button only                            
        let actions = [
            <FlatButton label="Cancel" primary={true} onClick={this.handleClose.bind(this)} />
        ];
        //can we extract this in a method?
        licensesLength > 0 ?
            actions.push(<FlatButton label="Activate" secondary={true} disabled={false} onClick={this.handleActivateMachine.bind(this, this.props.machine.machineName, this.props.user.details._id)} />)
            :
            actions;

        return (
            <div>
                <Dialog
                    title={this.props.isFetchingMachineDetails ? 'Checking if machine has licenses...' : 'Licenses query result'}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose.bind(this)}>
                    <div>
                        {this.props.isFetchingMachineDetails ?
                            <SpinnerTemplate styleProps="uil-ring-css" animation="uil-ring-anim" /> :
                            <div>
                                <div>
                                    <ul className="list-inline">
                                        <li>Machine name: <strong>{this.props.machine.machineName}</strong></li>
                                        <li>Added on: <strong>{moment(this.props.machine.addedOn).format('DD/MM/YYYY')}</strong></li>
                                    </ul>
                                    <ul className="list-group">
                                        <li className="list-group-item"><strong>Available licenses</strong></li>
                                        {this.renderLicensesListForMachine(this.props.machine.licenses)}
                                    </ul>
                                </div>

                            </div>
                        }
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default CheckingLicensesForMachineModal;