import React from 'react';

const AlertSuccessOrErrorGetEntity = (props) => {
        let displayMessageStyling = { border: '1px solid red' }; //keeping this around for applying to different divs in the alert       
        let alertStyling = props.error ? "alert alert-error" : "alert alert-success";          
        let message = props.error ? props.error : props.success;
                                                                                                          
        return(            
            <div className={alertStyling}>
                <div className="row">
                    <div className="col-lg-11">
                        <strong>{ message }</strong>
                    </div>
                    <div className="col-lg-1">                        
                            <span className="glyphicon glyphicon-remove"></span>                        
                    </div>
                </div>                                 
            </div>
        );                            
        
                                      
}

export default AlertSuccessOrErrorGetEntity;

