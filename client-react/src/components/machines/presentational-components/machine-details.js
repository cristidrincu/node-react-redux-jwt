import React from 'react';

const MachineDetailsTemplate = (props) => {                    
    const machineDetails = props.machine.machineName ;
    const machineLicenses = props.licenses.map( license => <li className="list-group-item" key={ license }>{ license }</li> );

    return (
        <div>            
            <p>{ machineDetails }</p>
            <h4>Licenses available for this machine</h4>
            <ul className="list-group">
                { machineLicenses }                                
            </ul>
        </div>        
    );                  
};

export default MachineDetailsTemplate;