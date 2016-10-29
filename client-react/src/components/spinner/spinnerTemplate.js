import React from 'react';

const loadingSpinner = {
    transform: 'scale(0.6)'
}

const SpinnerTemplate = (props) => {                        
    return (
        <div className={ props.styleProps } style={loadingSpinner}>
            <div className={ props.animation }></div>
        </div>        
    );                  
};

export default SpinnerTemplate;