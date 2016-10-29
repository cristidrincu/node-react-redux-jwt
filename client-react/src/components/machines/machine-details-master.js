import React, { Component } from 'react';
import { connect } from 'react-redux';

import FontIcon from 'material-ui/FontIcon';
import {grey500} from 'material-ui/styles/colors';

import AlertSuccessOrErrorGetEntity from '../alerts/alert-get-entity.js';
import MachineDetailsTemplate from './presentational-components/machine-details';
import SpinnerTemplate from '../spinner/spinnerTemplate';

const tempStyles = {
    marginTop: 70
}

const iconStyles = {
    marginRight: 2,
};

class MachineDetailsMaster extends Component {                        
    componentDidMount() {
        this.props.requestMachineDetails();
        this.props.getMachineDetails(this.props.params.machineId);
    }    

    render() {                                                
        return (
            <div style={tempStyles}>                                
                    { this.props.isFetchingMachineDetails ? 
                        <SpinnerTemplate styleProps="uil-ring-css" animation="uil-ring-anim" /> :  
                        <MachineDetailsTemplate machine = { this.props.machineDetails } licenses = { this.props.machineDetails.licenses ? this.props.machineDetails.licenses : [] } />
                    }                 
                    <AlertSuccessOrErrorGetEntity { ...this.props.message } />                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        machineDetails: state.machinesInfo.machineDetails,
        isFetchingMachineDetails: state.machinesInfo.isFetching,
        message: state.machinesInfo.machineDetailsMessage
    }
}

export default connect(mapStateToProps)(MachineDetailsMaster);