import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

let moment = require('moment');

const warningMessageColor = {
  color: 'red'
}

class DeleteMachineModal extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false, machine: {}, licenses: [], hasLicenses: false }
  }

  handleOpen(machine) {
    this.setState({ open: true, machine: machine, licenses: machine.licenses, hasLicenses: true });
  }

  handleClose() {
    this.setState({ open: false, machine: {}, licenses: [], hasLicenses: false });
  };

  handleDeleteMachine(machineId) {
    //delete machine based on its id
    this.props.deleteMachineAction(machineId);
    //close modal after delete
    this.handleClose();
    //trigger action to refresh machine collection after modal closes 
    this.props.getMachineCollectionAction();
  }

  render() {
    let { machine, licenses } = this.state;
    let licensesCollection = this.state.licenses.map(license => <li key={ license } className="list-group-item">{ license }</li>);

    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose.bind(this) } />,
      <FlatButton label="Delete" secondary={true} disabled={false} onClick={this.handleDeleteMachine.bind(this, machine._id) } />,
    ];

    return (
      <div>
        <Dialog
          title="Delete machine"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this) }
          >
          <p style={ warningMessageColor }>Are you sure you want to delete the machine with the following properties?</p>
          <ul className="list-inline">
            <li>Machine name: <strong>{ machine.machineName }</strong></li>
            <li>Added on: <strong>{ moment(machine.addedOn).format('DD/MM/YYYY') }</strong></li>
          </ul>
          <ul className="list-group">
            <li className="list-group-item"><strong>Available licenses: </strong></li>
            { licensesCollection }
          </ul>
        </Dialog>
      </div>
    );
  }
}

export default DeleteMachineModal;