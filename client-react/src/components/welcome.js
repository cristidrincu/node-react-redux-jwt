import React, { Component } from 'react';
import { Link } from 'react-router';

class Welcome extends Component {
    render() {
        return(
            <div className="jumbotron">
                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                <p><Link to="/signup" className="btn btn-lg btn-success" role="button">Sign up today</Link></p>
            </div>
        );
    }
}

export default Welcome;