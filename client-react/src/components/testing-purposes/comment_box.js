import React, { Component } from 'react';
import { connect } from 'react-redux';

class CommentBox extends Component {
    render() {
        return(
            <div className="comment-box">
                <form>
                    <textarea/>
                    <button>Submit comment</button>
                </form>
            </div>
        );
    }
}

export default CommentBox;