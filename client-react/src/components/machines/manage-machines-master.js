import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableWithMachineProps from './presentational-components/table-machines';
import AlertSuccessOrErrorGetEntity from '../alerts/alert-get-entity';
import { CLEAR_MACHINE_COLLECTION_FETCHED, CLEAR_REMOVE_MACHINE_MESSAGE } from '../../actions/types';
import { getMachines } from '../../actions';

import SpinnerTemplate from '../spinner/spinnerTemplate';

const tempStyles = {    
    marginTop: 55        
}

class ManageMachines extends Component {
    constructor(props) {
        super(props);
        this.state = { displayShowMessage: 'hidden', displayShowMessageDeleteMachine: 'hidden' };
    }   

    componentDidMount() {
        this.props.requestingMachines();                
        this.props.getMachines();
        this.setState({ displayShowMessage: 'visible' });        
    }

    componentWillUnmount() {
        let { dispatch } = this.props;                
        dispatch({ type: CLEAR_MACHINE_COLLECTION_FETCHED, payload: '' });
        dispatch({ type: CLEAR_REMOVE_MACHINE_MESSAGE, payload: '' });
        this.setState({ displayShowMessage: 'hidden' });
        this.setState({ displayShowMessageDeleteMachine: 'hidden' });                                
    }    

    render() {                                                                                                              
        return(
            <div className="row" style={tempStyles}>
                <div className="col-lg-12">
                    { this.props.isFetchingMachines ? 
                        <SpinnerTemplate styleProps="uil-ring-css" animation="uil-ring-anim" /> :
                        <TableWithMachineProps machines = {this.props.machines} getMachineCollectionAction={this.props.getMachines} deleteMachineAction={this.props.deleteMachine}/>
                    }
                    { this.state.displayShowMessage === 'visible'? 
                        <AlertSuccessOrErrorGetEntity { ...this.props.message } displayShowMessage={this.state.displayShowMessage} /> : <div></div>    
                    }
                    
                    <AlertSuccessOrErrorGetEntity { ...this.props.deleteMachineMessage } displayShowMessage={this.state.displayShowMessageDeleteMachine} />                                                                                                                       
                </div>                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetchingMachines: state.machinesInfo.isFetchingMachines,
        machines: state.machinesInfo.machinesCollection,
        message: state.machinesInfo.machinesCollectionMessage,
        deleteMachineMessage: state.machinesInfo.removeMessage
    }
}

export default connect(mapStateToProps)(ManageMachines);