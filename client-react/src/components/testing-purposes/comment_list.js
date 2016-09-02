//stateless component, just for displaying purposes, does not modify state
//inside the return statement, whatever you want to build, must be wrapped inside <div> tags
import React from 'react';
import { connect } from 'react-redux';

const CommentList = (props) => {
    console.log(props.comments);    
    const commentList = props.comments.map( comment => <li key={ comment }>{ comment }</li> );
              
    return (
        <div>
            <h3>This is the comment list</h3>
            <ul className="comment-list">
                { commentList }                
            </ul>
        </div>        
    );
};

function mapStateToProps(state) {
    return {
        comments: state.comments
    }
}

export default connect(mapStateToProps)(CommentList);