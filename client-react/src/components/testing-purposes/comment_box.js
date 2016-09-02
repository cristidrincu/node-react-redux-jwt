import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as comment_actions from '../../actions/comments'; //take out comment actions from types and put them in their comment types file

class CommentBox extends Component {
    constructor(props) {        
        super(props);        
        this.state = { comment: '' };
    }

    handleChange(event) {
        this.setState({ comment: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();    
        this.props.addCommentToList(this.state.comment);            
        this.setState({ comment: '' });        
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit.bind(this)} className="comment-box">                
                <textarea value= { this.state.comment } onChange = {this.handleChange.bind(this)}/>
                <button action="submit">Submit comment</button>                
            </form>
        );
    }
}

//we do not care about state, we just want the action for adding a comment. The first argument to connect() is mapStateToProps, but since
//we do not need it, it will be null

//bind all action creators to our CommentBox component
export default connect(null, comment_actions)(CommentBox);