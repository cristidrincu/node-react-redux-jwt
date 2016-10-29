import React from 'react';

const TestComponent = ({ authenticated, userEmail }) => { 
    {/**When you try to use if statements in a stateless component, react complains that you forgot about render */}
    {/**Example here: https://www.reddit.com/r/reactjs/comments/3oq1rm/complete_example_of_a_stateless_component_014what/ */}
    return(
        <p>{ authenticated ?  `You have the following email address: ${userEmail}` : ''  }</p>
    );                            
};

export default TestComponent;