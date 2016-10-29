import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import TestComponent from './testing-purposes/test-component';
import RaisedButton from 'material-ui/RaisedButton';

const tempStyles = {
    marginTop: 60,
    coverStyle: {        
        height: '100%'
    }
}

const videoStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: 200
}

class Welcome extends Component {        
    render() {                            
        if(this.props.authStatus) {
            return (                
                <div className="jumbotron" style={tempStyles}>
                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>                                        
                </div>
                                    
            );
        } else {
            return(                
                <div className="jumbotron" style={tempStyles}>
                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                    <Link to="/signup"><RaisedButton label={ 'Welcome to Syneto. Register!' } primary={true} /></Link>
                    <section className="default">
                        <div className="cover" style={tempStyles.coverStyle}>
                            <video autoPlay="true" loop="false" muted="true" style={videoStyle}>
                                <source src="https://92f0dbb11de5784083aa-bb969871c94ac78f108e561fc9f42b57.ssl.cf5.rackcdn.com/syneto-homepage-loop-10.mp4" type="video/mp4"/>
                            </video>
                        </div>                         
                    </section>                                                            
                </div>                                                                                    
            );
        }        
    }
}

export default Welcome;